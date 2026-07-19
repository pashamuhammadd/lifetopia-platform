using System;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Models;
using Lifetopia.Currency;
using Lifetopia.Managers;
using Lifetopia.Events;
using Lifetopia.Items;

namespace Lifetopia.Gameplay
{
    /// <summary>
    /// Shop system — buy/sell items dengan gold.
    /// Attach ke shop NPC atau trigger zone.
    /// </summary>
    public class ShopSystem : MonoBehaviour
    {
        [Header("Shop Config")]
        public string ShopId   = "shop_main";
        public string ShopName = "General Store";

        [Header("Sell Multiplier")]
        [Tooltip("Player jual item dengan harga ini x item.GoldValue")]
        public float sellMultiplier = 0.6f;

        public List<ShopItemModel> Stock { get; private set; } = new List<ShopItemModel>();

        public event Action OnStockChanged;

        void Start() => InitDefaultStock();

        void InitDefaultStock()
        {
            AddToStock("seed_wheat",   price: 3,  stock: -1);
            AddToStock("seed_tomato",  price: 6,  stock: -1);
            AddToStock("seed_carrot",  price: 5,  stock: -1);
            AddToStock("seed_pumpkin", price: 10, stock: -1);
            AddToStock("tool_hoe",     price: 50, stock: 1);
            AddToStock("tool_watering_can", price: 40, stock: 1);
        }

        public void AddToStock(string itemId, int price, int stock = -1)
        {
            var item = ItemDatabase.Get(itemId);
            if (item == null) return;
            Stock.Add(new ShopItemModel
            {
                ShopItemId  = ShopId + "_" + itemId,
                Item        = item,
                Price       = price,
                Stock       = stock,
                IsAvailable = true,
            });
            OnStockChanged?.Invoke();
        }

        // ── Buy ───────────────────────────────────────────────────────────────

        public bool Buy(string shopItemId, int qty = 1)
        {
            var shopItem = Stock.Find(s => s.ShopItemId == shopItemId);
            if (shopItem == null || !shopItem.CanBuy(qty))
            {
                Systems.NotificationSystem.Instance?.ShowError("Item not available!");
                return false;
            }

            int total = shopItem.Price * qty;
            if (!CurrencyService.Instance?.CanAfford(total) ?? true)
            {
                Systems.NotificationSystem.Instance?.ShowError("Not enough GOLD!");
                return false;
            }

            CurrencyService.Instance?.Spend(total, $"buy {shopItem.Item.DisplayName}");
            InventoryManager.Instance?.Add(shopItem.Item.ItemId, qty);

            if (shopItem.Stock > 0)
            {
                shopItem.Stock -= qty;
                if (shopItem.Stock <= 0) shopItem.IsAvailable = false;
            }

            Systems.NotificationSystem.Instance?.Show(
                $"Bought {shopItem.Item.DisplayName} x{qty}!");
            OnStockChanged?.Invoke();
            return true;
        }

        // ── Sell ──────────────────────────────────────────────────────────────

        public bool Sell(string itemId, int qty = 1)
        {
            var inv = InventoryManager.Instance;
            if (inv == null || !inv.Has(itemId, qty))
            {
                Systems.NotificationSystem.Instance?.ShowError("Item not in inventory!");
                return false;
            }

            var item = ItemDatabase.Get(itemId);
            if (item == null) return false;

            int gold = Mathf.RoundToInt(item.GoldValue * sellMultiplier * qty);
            inv.Remove(itemId, qty);
            CurrencyService.Instance?.Earn(gold, $"sell {item.DisplayName}");
            Systems.NotificationSystem.Instance?.Show($"Sold {item.DisplayName} x{qty} for {gold} GOLD!");
            return true;
        }

        public void OpenShop()
        {
            GameEventBus.Publish(new ShopOpenedEvent { ShopId = ShopId });
            LifetopiaLevelGameplayFsm.Instance?.OpenShop();
        }

        public void CloseShop() =>
            LifetopiaLevelGameplayFsm.Instance?.CloseShop();
    }
}
