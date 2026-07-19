using System;
using UnityEngine;
using Lifetopia.Events;
using Lifetopia.SaveSystem;

namespace Lifetopia.Systems
{
    /// <summary>
    /// Economy system — gold, XP, level up.
    /// Single source of truth untuk semua transaksi ekonomi.
    /// </summary>
    public class EconomySystem : MonoBehaviour
    {
        public static EconomySystem Instance { get; private set; }

        public int Gold  { get; private set; }
        public int XP    { get; private set; }
        public int Level { get; private set; } = 1;

        const string KEY_GOLD  = "lf_eco_gold";
        const string KEY_XP    = "lf_eco_xp";
        const string KEY_LEVEL = "lf_eco_level";

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start() => Load();

        // ── Gold ──────────────────────────────────────────────────────────────

        public void AddGold(int amount)
        {
            if (amount <= 0) return;
            int old = Gold;
            Gold = Mathf.Max(0, Gold + amount);
            Save();
            GameEventBus.Publish(new GoldChangedEvent
                { OldValue = old, NewValue = Gold, Delta = amount });
        }

        public bool SpendGold(int amount)
        {
            if (Gold < amount) return false;
            int old = Gold;
            Gold -= amount;
            Save();
            GameEventBus.Publish(new GoldChangedEvent
                { OldValue = old, NewValue = Gold, Delta = -amount });
            return true;
        }

        // ── XP / Level ────────────────────────────────────────────────────────

        public void AddXP(int amount)
        {
            if (amount <= 0) return;
            XP += amount;
            GameEventBus.Publish(new XpGainedEvent { Amount = amount, NewTotal = XP });
            CheckLevelUp();
            Save();
        }

        void CheckLevelUp()
        {
            int needed = Level * 50;
            while (XP >= needed)
            {
                XP -= needed;
                int old = Level;
                Level++;
                needed = Level * 50;
                GameEventBus.Publish(new LevelUpEvent { OldLevel = old, NewLevel = Level });
                UnityEngine.Debug.Log($"[EconomySystem] Level up! {old} → {Level}");
            }
        }

        public int XpToNextLevel() => Mathf.Max(0, Level * 50 - XP);
        public float LevelProgress() => (float)XP / (Level * 50);

        // ── Persistence ───────────────────────────────────────────────────────

        void Save()
        {
            SaveManager.Instance?.SaveInt(KEY_GOLD,  Gold);
            SaveManager.Instance?.SaveInt(KEY_XP,    XP);
            SaveManager.Instance?.SaveInt(KEY_LEVEL, Level);
        }

        void Load()
        {
            Gold  = SaveManager.Instance?.LoadInt(KEY_GOLD,  0) ?? 0;
            XP    = SaveManager.Instance?.LoadInt(KEY_XP,    0) ?? 0;
            Level = SaveManager.Instance?.LoadInt(KEY_LEVEL, 1) ?? 1;
            Level = Mathf.Max(1, Level);
        }
    }
}
