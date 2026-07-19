using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Models;

namespace Lifetopia.Items
{
    /// <summary>
    /// Static database semua item game.
    /// Tidak butuh ScriptableObject — data di-define di code.
    /// Extend dengan JSON loader untuk data-driven approach.
    /// </summary>
    public static class ItemDatabase
    {
        static readonly Dictionary<string, ItemModel> _items =
            new Dictionary<string, ItemModel>();

        static bool _initialized = false;

        public static void Initialize()
        {
            if (_initialized) return;
            _initialized = true;

            // ── Seeds ─────────────────────────────────────────────────────────
            Register(new ItemModel
            {
                ItemId = "seed_wheat",   DisplayName = "Wheat Seed",
                Description = "Plant to grow wheat. Harvest in 2 minutes.",
                Type = ItemType.Seed, GoldValue = 2, MaxStack = 99,
            });
            Register(new ItemModel
            {
                ItemId = "seed_tomato",  DisplayName = "Tomato Seed",
                Description = "Plant to grow tomatoes. Harvest in 3 minutes.",
                Type = ItemType.Seed, GoldValue = 4, MaxStack = 99,
            });
            Register(new ItemModel
            {
                ItemId = "seed_carrot",  DisplayName = "Carrot Seed",
                Description = "Plant to grow carrots. Harvest in 2.5 minutes.",
                Type = ItemType.Seed, GoldValue = 3, MaxStack = 99,
            });
            Register(new ItemModel
            {
                ItemId = "seed_pumpkin", DisplayName = "Pumpkin Seed",
                Description = "Plant to grow pumpkins. Harvest in 4 minutes.",
                Type = ItemType.Seed, GoldValue = 6, MaxStack = 99,
            });

            // ── Crops ─────────────────────────────────────────────────────────
            Register(new ItemModel
            {
                ItemId = "crop_wheat",   DisplayName = "Wheat",
                Description = "Freshly harvested wheat.",
                Type = ItemType.Crop, GoldValue = 5, MaxStack = 99,
            });
            Register(new ItemModel
            {
                ItemId = "crop_tomato",  DisplayName = "Tomato",
                Description = "Ripe red tomato.",
                Type = ItemType.Crop, GoldValue = 8, MaxStack = 99,
            });
            Register(new ItemModel
            {
                ItemId = "crop_carrot",  DisplayName = "Carrot",
                Description = "Crunchy orange carrot.",
                Type = ItemType.Crop, GoldValue = 6, MaxStack = 99,
            });
            Register(new ItemModel
            {
                ItemId = "crop_pumpkin", DisplayName = "Pumpkin",
                Description = "Large orange pumpkin.",
                Type = ItemType.Crop, GoldValue = 12, MaxStack = 99,
            });

            // ── Tools ─────────────────────────────────────────────────────────
            Register(new ItemModel
            {
                ItemId = "tool_hoe",     DisplayName = "Hoe",
                Description = "Till the soil for planting.",
                Type = ItemType.Tool, GoldValue = 50, MaxStack = 1,
            });
            Register(new ItemModel
            {
                ItemId = "tool_watering_can", DisplayName = "Watering Can",
                Description = "Water your crops.",
                Type = ItemType.Tool, GoldValue = 40, MaxStack = 1,
            });
            Register(new ItemModel
            {
                ItemId = "tool_fishing_rod", DisplayName = "Fishing Rod",
                Description = "Cast your line at the fishing cove.",
                Type = ItemType.Tool, GoldValue = 80, MaxStack = 1,
            });

            // ── NFT Items ─────────────────────────────────────────────────────
            Register(new ItemModel
            {
                ItemId = "nft_alpha_pass", DisplayName = "Alpha Utility Pass",
                Description = "Grants farming speed and yield boosts.",
                Type = ItemType.NFT, GoldValue = 0, MaxStack = 1,
                IsNFT = true, Rarity = ItemRarity.Legendary,
            });

            UnityEngine.Debug.Log($"[ItemDatabase] Initialized with {_items.Count} items.");
        }

        public static void Register(ItemModel item)
        {
            if (item != null && !string.IsNullOrEmpty(item.ItemId))
                _items[item.ItemId] = item;
        }

        public static ItemModel Get(string itemId)
        {
            if (!_initialized) Initialize();
            _items.TryGetValue(itemId, out var item);
            return item;
        }

        public static bool Exists(string itemId)
        {
            if (!_initialized) Initialize();
            return _items.ContainsKey(itemId);
        }

        public static List<ItemModel> GetAll()
        {
            if (!_initialized) Initialize();
            return new List<ItemModel>(_items.Values);
        }

        public static List<ItemModel> GetByType(ItemType type)
        {
            if (!_initialized) Initialize();
            var result = new List<ItemModel>();
            foreach (var item in _items.Values)
                if (item.Type == type) result.Add(item);
            return result;
        }
    }
}
