using System;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Models;
using Lifetopia.Events;
using Lifetopia.SaveSystem;

namespace Lifetopia.Managers
{
    /// <summary>Manages player inventory — add, remove, query items.</summary>
    public class InventoryManager : MonoBehaviour
    {
        public static InventoryManager Instance { get; private set; }

        readonly Dictionary<string, int> _items = new Dictionary<string, int>();

        const string SAVE_KEY = "lf_inventory_v2";

        public event Action OnInventoryChanged;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start() => Load();

        // ── CRUD ──────────────────────────────────────────────────────────────

        public bool Add(string itemId, int qty = 1)
        {
            if (string.IsNullOrEmpty(itemId) || qty <= 0) return false;
            _items.TryGetValue(itemId, out int current);
            _items[itemId] = current + qty;
            Save();
            OnInventoryChanged?.Invoke();
            GameEventBus.Publish(new ItemPickedUpEvent { ItemId = itemId, Qty = qty });
            return true;
        }

        public bool Remove(string itemId, int qty = 1)
        {
            if (!Has(itemId, qty)) return false;
            _items[itemId] -= qty;
            if (_items[itemId] <= 0) _items.Remove(itemId);
            Save();
            OnInventoryChanged?.Invoke();
            return true;
        }

        public bool Has(string itemId, int qty = 1)
        {
            _items.TryGetValue(itemId, out int have);
            return have >= qty;
        }

        public int GetQty(string itemId)
        {
            _items.TryGetValue(itemId, out int qty);
            return qty;
        }

        public Dictionary<string, int> GetAll() =>
            new Dictionary<string, int>(_items);

        public void Clear() { _items.Clear(); Save(); OnInventoryChanged?.Invoke(); }

        // ── Persistence ───────────────────────────────────────────────────────

        void Save()
        {
            var dto = new InventorySaveDTO { items = new List<InventoryEntry>() };
            foreach (var kv in _items)
                dto.items.Add(new InventoryEntry { id = kv.Key, qty = kv.Value });
            SaveManager.Instance?.SaveJson(SAVE_KEY, dto);
        }

        void Load()
        {
            var dto = SaveManager.Instance?.LoadJson<InventorySaveDTO>(SAVE_KEY);
            if (dto?.items == null) { SetDefaults(); return; }
            foreach (var e in dto.items)
                if (!string.IsNullOrEmpty(e.id) && e.qty > 0)
                    _items[e.id] = e.qty;
        }

        void SetDefaults()
        {
            _items["seed_wheat"]   = 8;
            _items["seed_tomato"]  = 3;
            _items["seed_carrot"]  = 2;
            _items["seed_pumpkin"] = 1;
        }

        [Serializable] class InventorySaveDTO { public List<InventoryEntry> items; }
        [Serializable] class InventoryEntry   { public string id; public int qty; }
    }
}
