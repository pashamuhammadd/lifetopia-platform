# Setup `apps/game-beta` (Unity Project)

## Kenapa harus dibuat manual dulu lewat Unity Hub

`Packages/manifest.json` dan `ProjectSettings/` adalah file internal yang
di-generate Unity sendiri (isinya versi package + hash yang harus konsisten
dengan Unity Editor kamu). Kalau saya buat manual/tebak isinya, resikonya
project error/corrupt pas dibuka. Lebih aman dan lebih cepat: kamu buat
project kosong lewat Unity Hub (built-in, terjamin benar), baru saya isi
folder `Assets/_Project`, script, dan dokumen di dalamnya.

## Langkah (±2 menit)

1. Buka Unity Hub → tab **Projects** → **New Project**.
2. Pilih versi editor **2022.3.62f3**.
3. Pilih template **2D (Built-in Render Pipeline)** — bukan 2D (URP).
4. **Project Name**: `game-beta`
5. **Location**: `C:\Users\mochn\OneDrive\Desktop\lifetopia-platform\apps`
   (jadi hasil akhirnya persis di `apps\game-beta`)
6. Klik **Create Project** dan tunggu sampai Editor kebuka penuh (jangan
   ditutup dulu).
7. Balik ke chat, bilang "sudah" — saya lanjut isi folder `Assets/_Project`
   (art, script, docs) yang sudah saya siapkan.

## Setelah saya isi foldernya

Beberapa package tambahan perlu ditambah manual lewat **Window > Package
Manager** (search di tab "Unity Registry"):

- **2D Animation** — untuk rig karakter modular (dipakai belakangan, gak
  wajib di Fase 0-1)
- **2D Tilemap Editor** — wajib untuk Fase 2 (farm plot)
- **Input System** — wajib untuk Fase 1 (kontrol karakter). Saat instal,
  Unity akan minta restart & switch ke backend input baru — klik **Yes**.
- **TextMeshPro** — biasanya sudah otomatis ke-import pas pertama kali
  bikin UI Text; kalau belum, instal manual.

Kalau ada error "namespace not found" di Console setelah saya taruh script,
itu tandanya package terkait belum diinstal — instal dari daftar di atas,
bukan tanda ada yang salah dengan kode.

## Menjalankan Auto Sprite Slicer

Sebagian besar asset (`farmer Spritesheet-01.png`, `item khuus city-01.png`,
dll) bukan grid rapi — sprite-nya tersebar di kanvas besar. Jangan slice
manual pakai grid. Caranya:

1. Pilih file PNG-nya di Project window (bisa multi-select).
2. Menu **Lifetopia > Tools > Auto-Slice Selected Textures (Alpha Islands)**.
3. Tunggu (texture besar seperti `item khuus city-01.png` bisa makan
   waktu puluhan detik).
4. Cek hasilnya: klik 2x texture → Sprite Editor → lihat apakah tiap
   sprite kepotong dengan benar. Kalau ada yang salah gabung/pecah, bilang
   ke saya, saya sesuaikan parameter di
   `Assets/_Project/Scripts/Editor/AutoSpriteSlicer.cs`.

## (Opsional) Git LFS untuk asset binary

Karena ini digabung ke monorepo yang sama dengan platform web, asset PNG
besar bisa bikin ukuran repo Git membengkak dari waktu ke waktu. Rekomendasi
(gak wajib untuk mulai): install Git LFS sekali di komputer kamu, lalu jalan
`git lfs install` di root repo. File `.gitattributes` di folder ini sudah
disiapkan polanya (*.png, *.psd, *.fbx, dll) — tinggal aktif begitu LFS
terinstall. Kalau belum mau ribet sekarang, skip dulu, gak menghalangi kerja.
