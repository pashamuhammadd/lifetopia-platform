using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEngine;
using Lifetopia.Gameplay;

namespace Lifetopia.EditorTools
{
    /// <summary>
    /// One-click setup untuk Fase 1: bikin GameObject "Farmer_Player" dengan
    /// semua komponen & sprite ter-assign otomatis dari hasil Auto Sprite
    /// Slicer, simpan sebagai prefab, dan taruh ke scene yang lagi kebuka.
    ///
    /// Mapping index sprite di bawah ini didapat dari analisis manual +
    /// konfirmasi visual langsung di Sprite Editor (bukan tebakan) - lihat
    /// riwayat percakapan/GAME_CONTEXT.md untuk detail. Kalau assetnya
    /// diganti/di-generate ulang, mapping ini perlu dicek ulang.
    /// </summary>
    public static class FarmerSetup
    {
        private const string WalkPart1Path = "Assets/_Project/Art/Characters/Farmer/walk-01 part1.png";
        private const string WalkPart2Path = "Assets/_Project/Art/Characters/Farmer/walk-01 part2.png";
        private const string BerkebunPath = "Assets/_Project/Art/Environment/Farm/berkebun-01.png";
        private const string PrefabFolder = "Assets/_Project/Prefabs";
        private const string PrefabPath = PrefabFolder + "/Farmer_Player.prefab";

        // Catatan: Pixels Per Unit karakter di-set di dalam
        // AutoSpriteSlicer.cs (barengan proses slicing), BUKAN di sini.
        // Jangan tambah reimport terpisah untuk texture ini - lihat komentar
        // di AutoSpriteSlicer.cs kenapa itu bisa bikin data slice ke-reset.

        [MenuItem("Lifetopia/Setup/Create Farmer Player")]
        private static void CreateFarmerPlayer()
        {
            var walk1 = LoadSprites(WalkPart1Path);
            var walk2 = LoadSprites(WalkPart2Path);
            var berkebun = LoadSprites(BerkebunPath);

            if (walk1 == null || walk2 == null || berkebun == null)
            {
                EditorUtility.DisplayDialog("Farmer Setup",
                    "Gagal load sprite. Pastikan sudah jalanin Auto-Slice Textures " +
                    "untuk walk-01 part1.png, walk-01 part2.png, dan berkebun-01.png dulu.", "OK");
                return;
            }

            // berkebun-01.png sekarang hasil Auto-Slice-nya bersih 15 sprite
            // (5 till + 5 axe + 5 water, berurutan rapi) - AutoSpriteSlicer.cs
            // sudah dibenerin buat buang otomatis pulau kecil (percikan
            // air/serpihan kayu) yang dulu bikin totalnya 30 dan bikin
            // beberapa index nabrak bug lama Unity ("Identifier uniqueness
            // violation" -> sprite jadi blank). Kalau ini di-generate ulang
            // dan hasilnya BUKAN 15, cek dulu diagnostic log di Console
            // sebelum asumsi range di bawah masih benar.
            var animation = new FarmerAnimationSet
            {
                walkUp = TakeRange(walk1, "walk-01 part1", 0, 4),
                walkSide = TakeRange(walk1, "walk-01 part1", 5, 10),
                walkDown = TakeRange(walk2, "walk-01 part2", 0, 5),
                till = TakeRange(berkebun, "berkebun-01", 0, 4),
                axe = TakeRange(berkebun, "berkebun-01", 5, 9),
                water = TakeRange(berkebun, "berkebun-01", 10, 14),
            };

            if (!HasAllFrames(animation))
            {
                EditorUtility.DisplayDialog("Farmer Setup",
                    "Ada sprite yang gak ketemu (lihat Console). Setup dibatalkan " +
                    "supaya gak ada animasi yang setengah jalan.", "OK");
                return;
            }

            var go = BuildPlayerGameObject(animation);
            SetupCameraFollow(go.transform);

            if (!AssetDatabase.IsValidFolder(PrefabFolder))
            {
                Debug.LogError($"[FarmerSetup] Folder {PrefabFolder} gak ada.");
                return;
            }

            var prefab = PrefabUtility.SaveAsPrefabAssetAndConnect(go, PrefabPath, InteractionMode.UserAction);
            Selection.activeObject = prefab;

            EditorUtility.DisplayDialog("Farmer Setup",
                "Farmer_Player berhasil dibuat & ditaruh di scene.\n\n" +
                "Tekan Play, coba WASD/arrow buat gerak, tombol 1/2/3 buat coba " +
                "animasi cangkul/kapak/watering can.", "OK");
        }

        private static Sprite[] LoadSprites(string path)
        {
            var assets = AssetDatabase.LoadAllAssetsAtPath(path);
            if (assets == null || assets.Length == 0)
            {
                Debug.LogError($"[FarmerSetup] Gak ada asset di path: {path}");
                return null;
            }

            var sprites = assets.OfType<Sprite>().ToArray();
            if (sprites.Length == 0)
            {
                Debug.LogError($"[FarmerSetup] {path} belum di-slice jadi Sprite. " +
                                "Jalanin Lifetopia > Tools > Auto-Slice Selected Textures dulu.");
                return null;
            }

            return sprites;
        }

        private static Sprite[] TakeRange(Sprite[] sprites, string baseName, int fromIndex, int toIndex)
        {
            var result = new List<Sprite>();
            for (int i = fromIndex; i <= toIndex; i++)
            {
                string name = $"{baseName}_{i:00}";
                var found = sprites.FirstOrDefault(s => s.name == name);
                if (found == null)
                {
                    Debug.LogError($"[FarmerSetup] Sprite '{name}' gak ketemu di hasil slicing {baseName}.png. " +
                                    "Kemungkinan jumlah sprite hasil slice beda dari yang diharapkan - " +
                                    "cek Sprite Editor manual.");
                    continue;
                }
                result.Add(found);
            }
            return result.ToArray();
        }

        private static bool HasAllFrames(FarmerAnimationSet set)
        {
            return set.walkUp.Length == 5 && set.walkSide.Length == 6 && set.walkDown.Length == 6
                   && set.till.Length == 5 && set.axe.Length == 5 && set.water.Length == 5;
        }

        private static GameObject BuildPlayerGameObject(FarmerAnimationSet animation)
        {
            var existing = GameObject.Find("Farmer_Player");
            if (existing != null) Object.DestroyImmediate(existing);

            var go = new GameObject("Farmer_Player");
            go.transform.position = Vector3.zero;

            var renderer = go.AddComponent<SpriteRenderer>();
            renderer.sprite = animation.IdleDown;

            var rb = go.AddComponent<Rigidbody2D>();
            rb.gravityScale = 0f;
            rb.freezeRotation = true;

            // Pivot sprite ada di bawah (kaki), lihat AutoSpriteSlicer.cs
            // (pivot BottomCenter) - jadi collider di-offset ke ATAS dari
            // titik (0,0) lokal, bukan ke bawah.
            var collider = go.AddComponent<BoxCollider2D>();
            collider.size = new Vector2(0.6f, 0.4f);
            collider.offset = new Vector2(0f, 0.2f);

            go.AddComponent<SpriteFrameAnimator>();

            var controller = go.AddComponent<PlayerController>();
            var so = new SerializedObject(controller);
            so.FindProperty("animation").FindPropertyRelative("walkDown").SetArray(animation.walkDown);
            so.FindProperty("animation").FindPropertyRelative("walkUp").SetArray(animation.walkUp);
            so.FindProperty("animation").FindPropertyRelative("walkSide").SetArray(animation.walkSide);
            so.FindProperty("animation").FindPropertyRelative("till").SetArray(animation.till);
            so.FindProperty("animation").FindPropertyRelative("axe").SetArray(animation.axe);
            so.FindProperty("animation").FindPropertyRelative("water").SetArray(animation.water);
            so.ApplyModifiedPropertiesWithoutUndo();

            return go;
        }

        private static void SetupCameraFollow(Transform target)
        {
            var cam = Camera.main;
            if (cam == null) return;

            cam.orthographic = true;
            // Orthographic size default Unity (5) kegedean buat karakter
            // setinggi ~1.6 unit - hasilnya karakter keliatan kecil banget
            // di Game view. 3 bikin karakter keliatan proporsional tanpa
            // perlu zoom manual.
            cam.orthographicSize = 3f;

            var follow = cam.GetComponent<CameraFollow>();
            if (follow == null) follow = cam.gameObject.AddComponent<CameraFollow>();

            var so = new SerializedObject(follow);
            so.FindProperty("target").objectReferenceValue = target;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        private static void SetArray(this SerializedProperty property, Sprite[] values)
        {
            property.arraySize = values.Length;
            for (int i = 0; i < values.Length; i++)
            {
                property.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
            }
        }
    }
}
