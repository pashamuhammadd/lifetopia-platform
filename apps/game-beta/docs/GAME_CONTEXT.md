# Lifetopia World (Game) — Context

> Dokumen ini adalah source of truth untuk sesi AI berikutnya yang kerja di
> `apps/game-beta`. Selaras dengan pola `docs/PROJECT_CONTEXT.md` di root
> monorepo (platform web). Baca ini dulu sebelum mengubah apapun di folder ini.

## Ringkasan Game

Lifetopia World (game) adalah 2D top-down farming / life-sim sekaligus avatar
world sosial, terinspirasi Avatar World (TeaMobi) dan Harvest Moon. Bahasa
UI: Inggris. Bukan proyek terpisah dari platform — akun, auth, dan data
pemain berbagi Supabase yang sama dengan `lifetopia-platform` (satu akun
untuk web, forum, game, marketplace ke depan).

## Status

- Fase saat ini: **Fase 1 — Character Controller** (sedang berjalan)
- Fase 0 (project scaffold, asset setup) sudah selesai.
- Lihat riwayat keputusan di bawah untuk konteks kenapa sesuatu dipilih.

## Keputusan Teknis (jangan diubah tanpa alasan kuat)

- **Engine**: Unity 2022.3.62f3 (versi yang terinstall di dev machine).
- **Render Pipeline**: Built-in (2D), BUKAN URP. Alasan: dev machine spek
  rendah (Intel Core i3-N305, iGPU Intel UHD terintegrasi, RAM 8GB). Built-in
  lebih ringan untuk Editor jalan di iGPU lemah; game 2D sprite-based gak
  butuh fitur URP secara signifikan di MVP. Bisa upgrade ke URP nanti kalau
  butuh 2D Lighting (day-night cycle) di fase lanjut — bukan blocker sekarang.
- **Coding paradigm**: C# MonoBehaviour standar (bukan DOTS/ECS).
- **Kamera**: top-down, kemungkinan besar script follow manual (bukan
  Cinemachine) untuk hemat overhead di device lemah — evaluasi ulang kalau
  ternyata dibutuhkan fitur kamera lanjutan.
- **Struktur repo**: digabung dalam Turborepo yang sama dengan platform web,
  di `apps/game-beta`.
- **Target platform**: WebGL (embed/link ke `beta.lifetopiaworld.io`) dan
  Android (APK dulu untuk tester, Play Store menyusul). PC build belum
  prioritas.
- **Device target minimum**: PC spek rendah + WebGL ringan, dan HP Android
  kelas menengah.

## Integrasi Platform

- **Auth**: Supabase Auth yang sama dengan web. Satu akun Lifetopia dipakai
  di semua produk (web, forum, game, marketplace nanti).
- **Data pemain**: disimpan di Supabase yang sama (bukan database terpisah).
- **Dashboard web**: wajib bisa menampilkan data game secara real-time sejak
  MVP (level, progress, dll).
- **Community/chat**: TIDAK terhubung ke Community Hub dulu untuk MVP —
  sengaja dipisah supaya scope MVP tetap kecil.

## Web3 / Solana (Devnet dulu)

- Fitur wajib MVP: wallet connect + kepemilikan $GOLD (SPL token devnet).
  Mint address: `ByrXMnACFFyvsL6d4yKFguCK8CNRJDMSWWshLejaApVu`
- NFT untuk item/skin/tanah: BELUM di MVP, menyusul kemudian (item biasa
  dulu).
- Auth 17 (Wallet Linking) di platform web SUDAH selesai (sampai Auth 20),
  datanya belum diupdate di dashboard/docs platform. Fitur Web3 di game bisa
  jalan paralel, tidak perlu menunggu apapun.
- Belum ada smart contract Solana lain selain mint $GOLD di atas.

## Gameplay MVP

- Fokus utama: **farming** (cangkul tanah → tanam → siram → panen).
- Progression: Level & XP klasik.
- Struktur dunia: area/scene terpisah dengan loading antar map (bukan open
  world menyatu).
- Monetisasi (rencana, belum diimplementasi di MVP): cosmetic shop,
  marketplace NFT, transaksi pakai $GOLD, kemungkinan slot iklan gambar di
  area map tertentu.

## Asset

Asset karakter & environment ada di `Assets/_Project/Art/`, sumber asli dari
folder lokal user (`OneDrive/Gambar/Lifetopia Assets`), belum lengkap —
kekurangan (UI/HUD, SFX/musik, NPC tambahan, prop tambahan) diisi dari Unity
Asset Store (yang open source/gratis) sesuai kebutuhan tiap fase, bukan bikin
dari nol semua.

Sebagian besar file art BUKAN grid sprite sheet seragam — layout-nya
tersebar tidak beraturan di kanvas transparan besar (hasil generate AI).
Karena itu dipakai `Assets/_Project/Scripts/Editor/AutoSpriteSlicer.cs` untuk
slicing otomatis berdasarkan deteksi pulau piksel alpha, BUKAN grid slicing
manual. Lihat komentar di file itu untuk cara pakai.

Karakter petani (farmer) datang dalam dua bentuk (dikoreksi setelah cek
langsung isi tiap file, jangan diasumsikan lagi):

1. **`walk-01 part1.png`, `walk-01 part2.png`, `berkebun-01.png`** — sprite
   pose siap pakai per-frame, INI yang dipakai untuk frame animation.
2. **`farmer Spritesheet-01.png`, `farmer front/back/side Spritesheet-01.png`**
   — BUKAN pose siap pakai, isinya part karakter lepas (topi, kepala varian
   kedip, badan, lengan, kaki) alias rig/paper-doll parts. TIDAK dipakai di
   Fase 1. Cadangan untuk fitur avatar customization di masa depan (belum
   diputuskan, bukan scope MVP).

### Mapping index sprite hasil Auto Sprite Slicer (Fase 1)

Dikonfirmasi visual lewat Sprite Editor + analisis ulang hasil deteksi
`AutoSpriteSlicer` (bukan tebakan), dipakai oleh
`Assets/_Project/Scripts/Editor/FarmerSetup.cs`:

- `walk-01 part1_00` s/d `_04` (5 frame) → **Walk Up** (jalan membelakangi kamera)
- `walk-01 part1_05` s/d `_10` (6 frame) → **Walk Side** (menyamping, dipakai kiri & kanan via flipX)
- `walk-01 part2_00` s/d `_05` (6 frame) → **Walk Down** (jalan menghadap kamera)
- `berkebun-01_00` s/d `_04` (5 frame) → **Till** (cangkul/sabit)
- `berkebun-01_05` s/d `_09` (5 frame) → **Axe** (kapak)
- `berkebun-01_10` s/d `_14` (5 frame) → **Water** (watering can)
- Idle per arah = frame index `_00` dari masing-masing array Walk yang
  sesuai (ditampilkan statis), bukan array terpisah.

**Riwayat bug (penting buat konteks ke depan):** sempat ada versi
`AutoSpriteSlicer` yang mendeteksi `berkebun-01.png` jadi 30 sprite, bukan
15 - soalnya "pulau" piksel kecil di sekitar tiap pose (percikan air pas
nyiram, serpihan kayu pas nebang) ikut ke-deteksi jadi sprite sendiri dan
nyelip di antara index pose asli (index jadi gak rapi berurutan). Selain
bikin mapping-nya berantakan, jumlah sprite yang kegedean (>24) di satu
texture juga mancing bug lama Unity (legacy `TextureImporter.spritesheet`
API collision pas generate internal identifier - muncul sebagai warning
"Identifier uniqueness violation" di Console) yang bikin salah satu sprite
jadi blank/rusak pas dipanggil di runtime (gejalanya: animasi ada frame
"kosong"/gambar gak muncul).

**Fix awal** (versi pertama) nambah ambang `MinPoseAreaPx` (bounding box
50.000px²) yang BUANG total semua pulau kecil non-pose sebelum jadi sprite.
Ini balikin count ke 15 & ngilangin bug ID collision, TAPI ternyata bikin
bug baru: sebagian pulau kecil itu bukan sekadar "belum kepake", tapi
memang bagian visual dari pose-nya (mis. tetesan air yang piksel-nya gak
nempel ke watering can di alpha channel, padahal itu 1 frame yang sama) -
jadi kalau dibuang, hasil crop pose besarnya jadi "kepotong" (bagian
airnya ilang), kejadian di frame Water ke-3 & ke-4.

**Fix final**: pulau kecil TIDAK dibuang, tapi digabung (union rect) ke
pose besar TERDEKAT di baris (Y) yang sama - lihat
`MergeSmallIslandsIntoPoses` di `AutoSpriteSlicer.cs`. Hasilnya tetap
bersih 15 sprite berurutan (ID collision tetap kehindar), tapi sekarang
bounding box tiap pose Water otomatis melebar buat nyakup tetesan air
terdekatnya. Kalau ke depan butuh partikel kecil ini berdiri sendiri (mis.
VFX percikan air terpisah dari karakter), harus bikin jalur/asset terpisah
yang gak lewat merge ini, jangan asumsi ubah `MinPoseAreaPx` aja cukup.

Kalau asset di-generate ulang/diganti, index di atas WAJIB diverifikasi ulang
lewat Sprite Editor / diagnostic log `AutoSpriteSlicer` sebelum ubah
`FarmerSetup.cs` — jangan asumsi urutan tetap sama.

### Keputusan animasi karakter

TIDAK pakai Animator Controller/Mecanim. Pakai sistem sprite-swap manual
custom (`SpriteFrameAnimator.cs`) berbasis array `Sprite[]`. Alasan: bikin
AnimatorController lewat script dari luar Unity itu riskan (gampang salah
serialize), dan Mecanim nambah overhead yang gak perlu untuk game 2D
sederhana di device low-end. `FarmerSetup.cs` (menu **Lifetopia > Setup >
Create Farmer Player**) otomatis assign semua sprite ke `PlayerController`
berdasarkan mapping di atas dan simpan sebagai prefab
`Assets/_Project/Prefabs/Farmer_Player.prefab`.

Input pakai Input Manager lama (`Input.GetAxisRaw`/`GetKeyDown`), BUKAN
package Input System baru — supaya Fase 1 bisa langsung dites tanpa install
package tambahan dulu. Pindah ke Input System baru relevan pas beneran
butuh virtual joystick Android (Fase 5).

Sprite pivot di-set bottom-center (lihat `AutoSpriteSlicer.cs`) dan Pixels
Per Unit karakter di-set ke 300 (bukan default 100) oleh `FarmerSetup.cs`,
supaya ukuran karakter di dunia Unity masuk akal (bukan raksasa beberapa
unit tinggi).

## Aturan untuk AI (mengikuti pola root `docs/AI_INSTRUCTIONS.md`)

- Jangan menebak isi asset atau ukuran sprite — verifikasi via
  AutoSpriteSlicer / Sprite Editor, bukan asumsi grid.
- Ikuti keputusan render pipeline (Built-in) kecuali user secara eksplisit
  minta ganti.
- Jangan menambahkan package Unity yang tidak dibutuhkan fase berjalan —
  device dev-nya terbatas, tiap package nambah beban compile time.
- Semua sistem gameplay baru (tanaman, tools, dll) sebaiknya pakai
  ScriptableObject supaya reusable & gampang ditambah tanpa ubah kode inti.

## Rencana Fase (ringkas — detail ada di riwayat percakapan)

0. ✅ Project scaffold & asset setup — selesai
1. 🔄 Character controller top-down 4 arah + tool-use state — sedang berjalan
   (script sudah ditulis: `SpriteFrameAnimator`, `FarmerAnimationSet`,
   `PlayerController`, `CameraFollow`, `FarmerSetup`; tinggal ditest di
   Unity)
2. Farm tile system (cangkul → tanam → siram → panen)
3. Auth integration (Supabase, akun sama dengan web)
4. Wallet connect Solana devnet + saldo $GOLD
5. Build pipeline WebGL + Android APK

## Cara kirim file dari AI ke device user

Pola yang dipakai: AI zip semua file baru/ubahan → kirim lewat chat →
user extract dengan PowerShell:

```powershell
Expand-Archive -Path "$HOME\Downloads\<nama-zip>.zip" -DestinationPath "C:\Users\mochn\OneDrive\Desktop\lifetopia-platform\apps\game-beta" -Force
```

`-Force` menimpa file yang bentrok nama tapi TIDAK menghapus file lain yang
sudah ada (aman untuk `Library/`, `ProjectSettings/`, scene yang sudah
diedit manual). Lebih cepat daripada commit file satu-satu, terutama untuk
gambar besar yang kena limit dimensi upload.
