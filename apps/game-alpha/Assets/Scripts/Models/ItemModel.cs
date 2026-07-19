using System;

namespace Lifetopia.Models
{
    public enum ItemType { Seed, Crop, Tool, Consumable, NFT, Currency }
    public enum ItemRarity { Common, Uncommon, Rare, Epic, Legendary }

    [Serializable]
    public class ItemModel
    {
        public string     ItemId      = "";
        public string     DisplayName = "";
        public string     Description = "";
        public ItemType   Type        = ItemType.Seed;
        public ItemRarity Rarity      = ItemRarity.Common;
        public int        GoldValue   = 1;
        public int        MaxStack    = 99;
        public string     IconPath    = "";
        public bool       IsNFT       = false;
        public string     MintAddress = "";

        public static ItemModel Seed(string id, string name, int value) => new ItemModel
        {
            ItemId = id, DisplayName = name, Type = ItemType.Seed, GoldValue = value
        };

        public static ItemModel Crop(string id, string name, int value) => new ItemModel
        {
            ItemId = id, DisplayName = name, Type = ItemType.Crop, GoldValue = value
        };
    }
}
