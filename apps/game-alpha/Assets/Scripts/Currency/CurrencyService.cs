using System;
using UnityEngine;
using Lifetopia.Events;
using Lifetopia.Systems;

namespace Lifetopia.Currency
{
    /// <summary>
    /// Currency service — facade untuk semua transaksi gold.
    /// Semua UI dan gameplay pakai ini, bukan langsung EconomySystem.
    /// </summary>
    public class CurrencyService : MonoBehaviour
    {
        public static CurrencyService Instance { get; private set; }

        public int Gold => EconomySystem.Instance?.Gold ?? 0;

        public event Action<int, int> OnGoldChanged; // (old, new)

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start()
        {
            GameEventBus.Subscribe<GoldChangedEvent>(e =>
                OnGoldChanged?.Invoke(e.OldValue, e.NewValue));
        }

        void OnDestroy() =>
            GameEventBus.Unsubscribe<GoldChangedEvent>(e =>
                OnGoldChanged?.Invoke(e.OldValue, e.NewValue));

        // ── Transactions ──────────────────────────────────────────────────────

        public void Earn(int amount, string source = "")
        {
            if (amount <= 0) return;
            EconomySystem.Instance?.AddGold(amount);
            Systems.NotificationSystem.Instance?.ShowGold(amount);
            if (!string.IsNullOrEmpty(source))
                UnityEngine.Debug.Log($"[Currency] +{amount} GOLD from {source}");
        }

        public bool Spend(int amount, string reason = "")
        {
            if (amount <= 0) return true;
            if (Gold < amount)
            {
                Systems.NotificationSystem.Instance?.ShowError("Not enough GOLD!");
                return false;
            }
            bool ok = EconomySystem.Instance?.SpendGold(amount) ?? false;
            if (ok && !string.IsNullOrEmpty(reason))
                UnityEngine.Debug.Log($"[Currency] -{amount} GOLD for {reason}");
            return ok;
        }

        public bool CanAfford(int amount) => Gold >= amount;

        public string FormatGold(int amount) => $"{amount:N0} GOLD";
    }
}
