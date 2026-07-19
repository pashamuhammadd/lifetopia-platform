using Lifetopia.Models;

namespace Lifetopia.Items
{
    /// <summary>Factory untuk buat item instance dengan preset.</summary>
    public static class ItemFactory
    {
        public static ItemModel CreateSeed(string cropType)
        {
            string id = "seed_" + cropType.ToLower();
            return ItemDatabase.Get(id) ?? new ItemModel
            {
                ItemId = id,
                DisplayName = cropType + " Seed",
                Type = ItemType.Seed,
                GoldValue = 2,
            };
        }

        public static ItemModel CreateCrop(string cropType)
        {
            string id = "crop_" + cropType.ToLower();
            return ItemDatabase.Get(id) ?? new ItemModel
            {
                ItemId = id,
                DisplayName = cropType,
                Type = ItemType.Crop,
                GoldValue = 5,
            };
        }

        public static ItemModel CreateTool(string toolName)
        {
            string id = "tool_" + toolName.ToLower().Replace(" ", "_");
            return ItemDatabase.Get(id) ?? new ItemModel
            {
                ItemId = id,
                DisplayName = toolName,
                Type = ItemType.Tool,
                GoldValue = 50,
                MaxStack = 1,
            };
        }

        public static ItemModel CreateNFT(string name, string mintAddress)
        {
            return new ItemModel
            {
                ItemId = "nft_" + mintAddress.Substring(0, 8).ToLower(),
                DisplayName = name,
                Type = ItemType.NFT,
                IsNFT = true,
                MintAddress = mintAddress,
                Rarity = ItemRarity.Legendary,
                MaxStack = 1,
            };
        }
    }
}
