using System;
using UnityEngine;

namespace Lifetopia.Gameplay
{
    /// <summary>
    /// Kumpulan array sprite untuk satu karakter (Farmer). Dipisah dari
    /// PlayerController supaya reusable - NPC lain yang pakai sprite set
    /// serupa bisa pakai class yang sama tanpa duplikasi.
    ///
    /// Field ini diisi OTOMATIS oleh Editor tool
    /// (Scripts/Editor/FarmerSetup.cs) berdasarkan hasil Auto Sprite Slicer,
    /// bukan diisi manual drag-drop - supaya gak ada risiko salah urutan
    /// frame kalau nanti ganti asset.
    /// </summary>
    [Serializable]
    public class FarmerAnimationSet
    {
        [Header("Walk (looping)")]
        public Sprite[] walkDown;   // hadap kamera / depan
        public Sprite[] walkUp;     // membelakangi kamera
        public Sprite[] walkSide;   // menyamping - dipakai untuk kiri & kanan (flipX)

        [Header("Tool Actions (one-shot)")]
        public Sprite[] till;   // cangkul / sabit
        public Sprite[] axe;    // kapak
        public Sprite[] water;  // watering can

        public Sprite IdleDown => walkDown != null && walkDown.Length > 0 ? walkDown[0] : null;
        public Sprite IdleUp => walkUp != null && walkUp.Length > 0 ? walkUp[0] : null;
        public Sprite IdleSide => walkSide != null && walkSide.Length > 0 ? walkSide[0] : null;
    }
}
