using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;

namespace Lifetopia.EditorTools
{
    /// <summary>
    /// Beberapa asset Lifetopia (mis. "farmer Spritesheet-01.png",
    /// "item khuus city-01.png") bukan grid seragam - sprite-nya tersebar
    /// tidak beraturan di atas kanvas transparan besar. Grid slicing biasa
    /// gak bisa dipakai untuk ini.
    ///
    /// Tool ini slicing otomatis dengan mendeteksi setiap "pulau" piksel
    /// non-transparan (connected component di alpha channel) dan
    /// menjadikannya satu Sprite terpisah. Reusable untuk semua asset
    /// sejenis ke depannya, gak cuma untuk batch import kali ini.
    ///
    /// Cara pakai:
    /// 1. Pilih satu/lebih Texture2D di Project window.
    /// 2. Menu: Lifetopia > Tools > Auto-Slice Selected Textures (Alpha Islands)
    /// 3. Cek hasilnya di Sprite Editor (klik 2x texture-nya). Kalau ada
    ///    sprite yang salah gabung/pecah, atur MinIslandAreaPx atau
    ///    DilatePx di bawah lalu jalankan ulang.
    ///
    /// Catatan performa: texture besar (4608x9216 dst) butuh beberapa
    /// puluh detik dan +-200-300MB RAM sementara saat diproses. Kalau
    /// laptop terasa berat, proses satu texture besar dalam satu waktu.
    /// </summary>
    public static class AutoSpriteSlicer
    {
        // Ukuran minimum sebuah "pulau" piksel (dalam pixel^2) supaya
        // dianggap sprite valid, bukan noise/anti-aliasing sisa.
        private const int MinIslandAreaPx = 80;

        // Padding tambahan di sekeliling setiap sprite hasil deteksi.
        private const int PaddingPx = 2;

        // Ambang alpha untuk dianggap "opaque" / bagian dari sprite.
        private const int AlphaThreshold = 10;

        // Perbesar kalau ada 1 pose yang bagian-bagiannya kepisah beberapa
        // piksel (mis. senjata terpisah dari tangan) tapi harusnya jadi
        // satu sprite. 0 = tidak digabung sama sekali.
        private const int DilatePx = 0;

        // Ambang luas bounding box (w*h piksel) buat misahin "pose karakter
        // beneran" dari "pulau" partikel/efek kecil yang sering nempel deket
        // pose di asset hasil AI-generate (mis. percikan air di berkebun-01
        // pas pose menyiram, serpihan kayu pas pose menebang). Ditemukan
        // dari analisis nyata: pose badan penuh selalu >100.000px^2, partikel
        // kecil selalu <3.500px^2 - jadi 50.000 aman jadi batas tengah.
        //
        // Pulau kecil ini BUKAN dibuang - digabung (union rect) ke pose
        // besar TERDEKAT di baris yang sama (lihat MergeSmallIslandsIntoPoses
        // di bawah). Alasannya: piksel efek kecil ini seringkali gak nempel
        // sama sekali ke piksel badan/tool di alpha channel (mis. tetesan
        // air yang jatuh terpisah dari watering can), padahal itu masih
        // bagian dari 1 frame visual yang sama. Kalau dibuang total, hasil
        // crop pose-nya jadi "kepotong" - bagian efeknya ilang. Digabungin
        // sekalian juga otomatis menyusutkan total jumlah sprite per texture
        // (dulu bisa >24), yang mancing bug lama Unity: legacy
        // TextureImporter.spritesheet API bisa collision pas nge-generate
        // internal identifier tiap sprite ("Identifier uniqueness violation"
        // di Console), efeknya sprite yang collision jadi rusak/blank pas
        // dipanggil di runtime.
        //
        // Kalau nanti dipakai buat asset yang butuh sprite kecil berdiri
        // sendiri (icon, item kecil, dst - bukan karakter), turunkan/nolkan
        // ambang ini dulu atau bikin override khusus per-texture, jangan
        // pakai default ini mentah-mentah.
        private const int MinPoseAreaPx = 50000;

        // Pixels Per Unit karakter di dunia Unity - di-set di sini (barengan
        // proses slicing), BUKAN lewat reimport terpisah belakangan. API lama
        // TextureImporter.spritesheet yang dipakai tool ini ternyata bisa
        // ke-reset kosong kalau di-reimport lagi tanpa nge-set ulang
        // spritesheet-nya barengan. Jadi semua perubahan importer untuk
        // texture karakter HARUS lewat satu SaveAndReimport yang sama di
        // method SliceTexture di bawah, jangan ditambah reimport terpisah
        // di script lain.
        private const float TargetPixelsPerUnit = 300f;

        [MenuItem("Lifetopia/Tools/Auto-Slice Selected Textures (Alpha Islands)")]
        private static void SliceSelected()
        {
            var textures = Selection.objects.OfType<Texture2D>().ToList();
            if (textures.Count == 0)
            {
                EditorUtility.DisplayDialog("Auto Sprite Slicer",
                    "Pilih satu atau lebih Texture2D di Project window dulu.", "OK");
                return;
            }

            var summary = new List<string>();
            foreach (var tex in textures)
            {
                summary.Add(SliceTexture(tex));
            }

            AssetDatabase.Refresh();
            EditorUtility.DisplayDialog("Auto Sprite Slicer",
                string.Join("\n", summary), "OK");
        }

        private static string SliceTexture(Texture2D tex)
        {
            var path = AssetDatabase.GetAssetPath(tex);
            var importer = AssetImporter.GetAtPath(path) as TextureImporter;
            if (importer == null)
            {
                Debug.LogWarning($"[AutoSpriteSlicer] Bukan texture yang valid: {path}");
                return $"{Path.GetFileName(path)}: dilewati (bukan texture valid)";
            }

            var wasReadable = importer.isReadable;
            var wasMaxSize = importer.maxTextureSize;

            // PENTING: harus TextureImporterType.Sprite, BUKAN Default.
            // Sprite Editor tetap bisa nampilin/edit rect biarpun tipenya
            // Default, tapi Unity cuma benar-benar generate objek Sprite
            // yang bisa dibaca lewat AssetDatabase.LoadAllAssetsAtPath kalau
            // texture type-nya "Sprite (2D and UI)". Ini akar penyebab bug
            // "sprite gak ketemu" yang sempat kejadian di Fase 1.
            //
            // PENTING JUGA: Unity nyimpen rect sprite relatif ke ukuran ASLI
            // file source, tapi GetPixels32() di bawah baca dari texture
            // versi ter-import (yang bisa ke-downscale kalau Max Size lebih
            // kecil dari resolusi asli, mis. asset kita ada yang 4608px
            // sementara Max Size default cuma 2048). Kalau itu kejadian,
            // rect yang kita hitung jadi salah skala - sprite kepotong kecil
            // di pojok. Makanya sementara di-set 8192 (lebih besar dari
            // semua asset kita) SELAMA proses baca piksel, baru dibalikin ke
            // ukuran semula di akhir method biar hemat memori pas runtime.
            importer.textureType = TextureImporterType.Sprite;
            importer.isReadable = true;
            importer.spriteImportMode = SpriteImportMode.Multiple;
            importer.maxTextureSize = 8192;
            EditorUtility.SetDirty(importer);
            importer.SaveAndReimport();

            var readableTex = AssetDatabase.LoadAssetAtPath<Texture2D>(path);

            // DIAGNOSTIC: nge-print dimensi texture yang beneran dibaca dan
            // setting importer saat ini, biar kelihatan jelas di Console
            // kalau ada downscale yang gak sengaja kejadian.
            Debug.Log($"[AutoSpriteSlicer] DIAGNOSTIC {Path.GetFileName(path)}: " +
                      $"readableTex={readableTex.width}x{readableTex.height}, " +
                      $"importer.maxTextureSize={importer.maxTextureSize}, " +
                      $"importer.textureType={importer.textureType}");

            var rects = FindIslandRects(readableTex);

            var baseName = Path.GetFileNameWithoutExtension(path);
            var metas = new List<SpriteMetaData>(rects.Count);
            var diagLines = new List<string>();
            for (int i = 0; i < rects.Count; i++)
            {
                metas.Add(new SpriteMetaData
                {
                    name = $"{baseName}_{i:00}",
                    rect = rects[i],
                    alignment = (int)SpriteAlignment.BottomCenter,
                    pivot = new Vector2(0.5f, 0f)
                });

                // DIAGNOSTIC: tandain BESAR (kemungkinan pose badan penuh)
                // vs kecil (kemungkinan partikel/efek) berdasarkan area,
                // biar gampang dipisahin pas baca log-nya.
                float area = rects[i].width * rects[i].height;
                string sizeTag = area > 50000 ? "BESAR" : "kecil";
                diagLines.Add($"_{i:00}: x={rects[i].x:0} y={rects[i].y:0} w={rects[i].width:0} h={rects[i].height:0} [{sizeTag}]");
            }
            Debug.Log($"[AutoSpriteSlicer] DIAGNOSTIC {baseName} - semua {rects.Count} sprite:\n" +
                      string.Join("\n", diagLines));

            importer.spritesheet = metas.ToArray();
            importer.spritePixelsPerUnit = TargetPixelsPerUnit;
            importer.isReadable = wasReadable;
            // Rect udah kehitung bener (di resolusi asli), sekarang aman
            // balikin Max Size ke nilai semula buat hemat memori runtime.
            importer.maxTextureSize = wasMaxSize;
            EditorUtility.SetDirty(importer);
            importer.SaveAndReimport();

            var msg = $"{baseName}: {metas.Count} sprite terdeteksi";
            Debug.Log($"[AutoSpriteSlicer] {msg}");
            return msg;
        }

        private static List<Rect> FindIslandRects(Texture2D tex)
        {
            int w = tex.width, h = tex.height;
            var pixels = tex.GetPixels32();
            var visited = new bool[w * h];
            var raw = new List<Rect>();
            var queue = new Queue<int>();

            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    int idx = y * w + x;
                    if (visited[idx] || pixels[idx].a <= AlphaThreshold) continue;

                    int minX = x, maxX = x, minY = y, maxY = y;
                    int area = 0;
                    queue.Clear();
                    queue.Enqueue(idx);
                    visited[idx] = true;

                    while (queue.Count > 0)
                    {
                        int cur = queue.Dequeue();
                        int cx = cur % w;
                        int cy = cur / w;
                        area++;
                        if (cx < minX) minX = cx;
                        if (cx > maxX) maxX = cx;
                        if (cy < minY) minY = cy;
                        if (cy > maxY) maxY = cy;

                        TryEnqueue(cx + 1, cy, w, h, pixels, visited, queue);
                        TryEnqueue(cx - 1, cy, w, h, pixels, visited, queue);
                        TryEnqueue(cx, cy + 1, w, h, pixels, visited, queue);
                        TryEnqueue(cx, cy - 1, w, h, pixels, visited, queue);
                        if (DilatePx > 0)
                        {
                            for (int dx = -DilatePx; dx <= DilatePx; dx++)
                            for (int dy = -DilatePx; dy <= DilatePx; dy++)
                                TryEnqueue(cx + dx, cy + dy, w, h, pixels, visited, queue);
                        }
                    }

                    if (area < MinIslandAreaPx) continue;

                    int rx = Mathf.Max(0, minX - PaddingPx);
                    int ry = Mathf.Max(0, minY - PaddingPx);
                    int rw = Mathf.Min(w, maxX + PaddingPx + 1) - rx;
                    int rh = Mathf.Min(h, maxY + PaddingPx + 1) - ry;
                    raw.Add(new Rect(rx, ry, rw, rh));
                }
            }

            var result = MergeSmallIslandsIntoPoses(raw);

            // Urutkan visual dari atas ke bawah, lalu kiri ke kanan, biar
            // penomoran nama sprite konsisten dan gampang ditebak.
            result.Sort((a, b) =>
            {
                bool sameRow = Mathf.Abs(a.y - b.y) < Mathf.Max(a.height, b.height) * 0.5f;
                if (!sameRow) return b.y.CompareTo(a.y);
                return a.x.CompareTo(b.x);
            });

            return result;
        }

        /// <summary>
        /// Pisahkan pulau "pose besar" (badan karakter) dari pulau "kecil"
        /// (efek/partikel yang keputus di alpha channel, mis. tetesan air),
        /// lalu gabungkan tiap pulau kecil ke pose besar TERDEKAT di baris
        /// (Y) yang sama - bukan dibuang. Lihat komentar MinPoseAreaPx buat
        /// alasan lengkapnya.
        /// </summary>
        private static List<Rect> MergeSmallIslandsIntoPoses(List<Rect> raw)
        {
            var poses = raw.Where(r => r.width * r.height >= MinPoseAreaPx).ToList();
            var small = raw.Where(r => r.width * r.height < MinPoseAreaPx).ToList();

            foreach (var s in small)
            {
                int bestIndex = -1;
                float bestGap = float.MaxValue;

                for (int i = 0; i < poses.Count; i++)
                {
                    var p = poses[i];
                    bool sameRow = Mathf.Abs(s.y - p.y) < Mathf.Max(s.height, p.height) * 0.5f;
                    if (!sameRow) continue;

                    float gap = HorizontalGap(s, p);
                    if (gap < bestGap)
                    {
                        bestGap = gap;
                        bestIndex = i;
                    }
                }

                if (bestIndex >= 0)
                {
                    poses[bestIndex] = Union(poses[bestIndex], s);
                }
                else
                {
                    // Gak ada pose sebaris buat digabung (belum pernah
                    // kejadian di asset yang udah diproses, tapi dijaga
                    // biar gak diam-diam ilang datanya) - jadiin sprite
                    // sendiri.
                    Debug.LogWarning($"[AutoSpriteSlicer] Pulau kecil di " +
                                      $"x={s.x} y={s.y} w={s.width} h={s.height} gak ketemu pose " +
                                      "sebaris buat digabung - dijadiin sprite sendiri.");
                    poses.Add(s);
                }
            }

            return poses;
        }

        private static float HorizontalGap(Rect a, Rect b)
        {
            if (a.xMax < b.x) return b.x - a.xMax;
            if (b.xMax < a.x) return a.x - b.xMax;
            return 0f;
        }

        private static Rect Union(Rect a, Rect b)
        {
            float minX = Mathf.Min(a.x, b.x);
            float minY = Mathf.Min(a.y, b.y);
            float maxX = Mathf.Max(a.xMax, b.xMax);
            float maxY = Mathf.Max(a.yMax, b.yMax);
            return new Rect(minX, minY, maxX - minX, maxY - minY);
        }

        private static void TryEnqueue(int x, int y, int w, int h, Color32[] pixels, bool[] visited, Queue<int> queue)
        {
            if (x < 0 || x >= w || y < 0 || y >= h) return;
            int idx = y * w + x;
            if (visited[idx] || pixels[idx].a <= AlphaThreshold) return;
            visited[idx] = true;
            queue.Enqueue(idx);
        }
    }
}
