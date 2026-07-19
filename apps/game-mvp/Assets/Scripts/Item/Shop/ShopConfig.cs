using UnityEngine;

namespace Item.Shop
{
    [System.Serializable]
    public class ShopEntry
    {
        public ItemData item;
        [Tooltip("Override buy price. 0 = use ItemData.Price")]
        public int buyPriceOverride;

        public int BuyPrice => buyPriceOverride > 0 ? buyPriceOverride : item.Price;
    }

    [CreateAssetMenu(menuName = "Items/Shop Config")]
    public class ShopConfig : ScriptableObject
    {
        [SerializeField] private ItemData goldItem;
        [SerializeField] private ShopEntry[] shopEntries;
        [SerializeField, Range(0f, 1f)] private float sellPriceMultiplier = 0.5f;

        public ItemData GoldItem => goldItem;
        public ShopEntry[] ShopEntries => shopEntries;
        public float SellPriceMultiplier => sellPriceMultiplier;

        /// <summary>
        /// Calculate the sell price for an item.
        /// </summary>
        public int GetSellPrice(ItemData item)
        {
            return Mathf.Max(1, Mathf.FloorToInt(item.Price * sellPriceMultiplier));
        }
    }
}
