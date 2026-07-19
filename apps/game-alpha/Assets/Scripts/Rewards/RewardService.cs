using System;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Events;
using Lifetopia.Currency;
using Lifetopia.Systems;
using Lifetopia.Managers;

namespace Lifetopia.Rewards
{
    [Serializable]
    public class RewardPackage
    {
        public int    Gold       = 0;
        public int    XP         = 0;
        public string ItemId     = "";
        public int    ItemQty    = 0;
        public string Message    = "";
    }

    /// <summary>
    /// Reward service — grant gold, XP, items dengan notifikasi.
    /// Semua reward lewat sini agar konsisten.
    /// </summary>
    public class RewardService : MonoBehaviour
    {
        public static RewardService Instance { get; private set; }

        public event Action<RewardPackage> OnRewardGranted;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public void Grant(RewardPackage reward)
        {
            if (reward == null) return;

            if (reward.Gold > 0)
                CurrencyService.Instance?.Earn(reward.Gold, "reward");

            if (reward.XP > 0)
            {
                EconomySystem.Instance?.AddXP(reward.XP);
                NotificationSystem.Instance?.ShowXP(reward.XP);
            }

            if (!string.IsNullOrEmpty(reward.ItemId) && reward.ItemQty > 0)
                InventoryManager.Instance?.Add(reward.ItemId, reward.ItemQty);

            if (!string.IsNullOrEmpty(reward.Message))
                NotificationSystem.Instance?.ShowSuccess(reward.Message);

            OnRewardGranted?.Invoke(reward);
        }

        public void GrantGold(int amount, string source = "") =>
            Grant(new RewardPackage { Gold = amount, Message = $"+{amount} GOLD" });

        public void GrantXP(int amount) =>
            Grant(new RewardPackage { XP = amount });

        public void GrantItem(string itemId, int qty = 1) =>
            Grant(new RewardPackage { ItemId = itemId, ItemQty = qty });

        public void GrantHarvestReward(string cropId, float yieldMult = 1f)
        {
            var item = Items.ItemDatabase.Get(cropId);
            int gold = item != null
                ? Mathf.RoundToInt(item.GoldValue * yieldMult)
                : 5;
            Grant(new RewardPackage
            {
                Gold    = gold,
                XP      = 10,
                ItemId  = cropId,
                ItemQty = Mathf.Max(1, Mathf.RoundToInt(yieldMult)),
                Message = $"Harvested {item?.DisplayName ?? cropId}!",
            });
        }
    }
}
