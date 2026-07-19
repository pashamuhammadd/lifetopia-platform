using Item.Inventory;
using UnityEngine;

namespace Item.Shop
{
    /// <summary>
    /// Handles all buy/sell transactions. Singleton — accessed via ShopManager.Instance.
    /// 
    /// Setup: Place on any persistent GameObject. Assign ShopConfig and player Inventory.
    /// </summary>
    public class ShopManager : MonoBehaviour
    {
        public static ShopManager Instance { get; private set; }

        [SerializeField] private ShopConfig shopConfig;
        [SerializeField] private Inventory.Inventory inventory;

        /// <summary>
        /// True when the player is in sell mode — inventory clicks sell items.
        /// </summary>
        public bool IsSellMode { get; private set; }

        public ShopConfig Config => shopConfig;

        private void Awake()
        {
            Instance = this;
        }

        // ── Gold Helpers ─────────────────────────────────────────────

        public int GetGoldAmount()
        {
            int index;
            InventoryItem gold = inventory.GetItem(shopConfig.GoldItem, out index);
            return gold != null ? gold.Amount : 0;
        }

        private bool SubtractGold(int amount)
        {
            int index;
            InventoryItem gold = inventory.GetItem(shopConfig.GoldItem, out index);

            if (gold == null || gold.Amount < amount)
                return false;

            gold.Amount -= amount;

            // Notify UI of the gold change
            foreach (var dispatcher in inventory.eventDispatchers.Values)
            {
                dispatcher.DispatchItemLoad(-1, gold.Data, gold.Amount);
            }

            return true;
        }

        private void AddGold(int amount)
        {
            inventory.AddItem(shopConfig.GoldItem, amount);
        }

        // ── Buy / Sell ───────────────────────────────────────────────

        /// <summary>
        /// Buy an item from the shop. Returns true if successful.
        /// </summary>
        public bool Buy(ShopEntry entry)
        {
            if (entry == null || entry.item == null)
                return false;

            int price = entry.BuyPrice;

            if (GetGoldAmount() < price)
            {
                Debug.Log($"[Shop] Not enough gold. Need {price}, have {GetGoldAmount()}");
                return false;
            }

            if (!SubtractGold(price))
                return false;

            bool added = inventory.AddItem(entry.item, 1);

            if (!added)
            {
                // Inventory full — refund
                AddGold(price);
                Debug.Log("[Shop] Inventory full, purchase refunded");
                return false;
            }

            Debug.Log($"[Shop] Bought {entry.item.ItemName} for {price}G");
            return true;
        }

        /// <summary>
        /// Sell the item at the given inventory slot. Returns true if successful.
        /// </summary>
        public bool Sell(int slotIndex)
        {
            InventoryItem item = inventory.GetItem(slotIndex);

            if (item == null || item.Data == null)
                return false;

            // Don't sell tools / non-removeable items
            if (!item.Data.IsRemoveable)
            {
                Debug.Log($"[Shop] Cannot sell {item.Data.ItemName} — not removeable");
                return false;
            }

            // Don't sell items with no price
            if (item.Data.Price <= 0)
            {
                Debug.Log($"[Shop] Cannot sell {item.Data.ItemName} — no price set");
                return false;
            }

            int sellPrice = shopConfig.GetSellPrice(item.Data);
            int amount = item.Data.CanStack ? item.Amount : 1;
            int totalGold = sellPrice * Mathf.Max(1, amount);

            AddGold(totalGold);
            inventory.RemoveItem(slotIndex);

            Debug.Log($"[Shop] Sold {item.Data.ItemName} (x{amount}) for {totalGold}G");
            return true;
        }

        // ── Sell Mode ────────────────────────────────────────────────

        public void SetSellMode(bool active)
        {
            IsSellMode = active;
            Debug.Log($"[Shop] Sell mode: {(active ? "ON" : "OFF")}");
        }

        public void ToggleSellMode()
        {
            SetSellMode(!IsSellMode);
        }
    }
}
