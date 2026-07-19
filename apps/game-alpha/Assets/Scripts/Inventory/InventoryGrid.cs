using System;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Models;

namespace Lifetopia.Inventory
{
    /// <summary>
    /// Grid-based inventory — N rows x M cols.
    /// Supports stacking, sorting, searching.
    /// </summary>
    public class InventoryGrid
    {
        public int Rows    { get; }
        public int Cols    { get; }
        public int Capacity => Rows * Cols;

        readonly InventorySlot[] _slots;

        public event Action OnChanged;

        public InventoryGrid(int rows = 4, int cols = 8)
        {
            Rows   = rows;
            Cols   = cols;
            _slots = new InventorySlot[Capacity];
            for (int i = 0; i < Capacity; i++)
                _slots[i] = new InventorySlot();
        }

        // ── Add ───────────────────────────────────────────────────────────────

        public bool Add(ItemModel item, int qty = 1)
        {
            if (item == null || qty <= 0) return false;

            // Try stack into existing slot first
            foreach (var slot in _slots)
            {
                if (!slot.IsEmpty && slot.Item.ItemId == item.ItemId)
                {
                    if (slot.Add(qty)) { OnChanged?.Invoke(); return true; }
                }
            }

            // Find empty slot
            foreach (var slot in _slots)
            {
                if (slot.IsEmpty) { slot.Set(item, qty); OnChanged?.Invoke(); return true; }
            }

            return false; // Inventory full
        }

        // ── Remove ────────────────────────────────────────────────────────────

        public bool Remove(string itemId, int qty = 1)
        {
            int remaining = qty;
            foreach (var slot in _slots)
            {
                if (slot.IsEmpty || slot.Item.ItemId != itemId) continue;
                int take = Math.Min(remaining, slot.Quantity);
                slot.Remove(take);
                remaining -= take;
                if (remaining <= 0) { OnChanged?.Invoke(); return true; }
            }
            return false;
        }

        // ── Query ─────────────────────────────────────────────────────────────

        public int GetTotal(string itemId)
        {
            int total = 0;
            foreach (var slot in _slots)
                if (!slot.IsEmpty && slot.Item.ItemId == itemId)
                    total += slot.Quantity;
            return total;
        }

        public bool Has(string itemId, int qty = 1) => GetTotal(itemId) >= qty;

        public InventorySlot GetSlot(int index) =>
            index >= 0 && index < Capacity ? _slots[index] : null;

        public List<InventorySlot> GetNonEmpty()
        {
            var list = new List<InventorySlot>();
            foreach (var s in _slots) if (!s.IsEmpty) list.Add(s);
            return list;
        }

        public void Sort()
        {
            var items = GetNonEmpty();
            items.Sort((a, b) => string.Compare(a.Item.ItemId, b.Item.ItemId,
                StringComparison.Ordinal));
            for (int i = 0; i < Capacity; i++) _slots[i].Clear();
            for (int i = 0; i < items.Count; i++)
                _slots[i].Set(items[i].Item, items[i].Quantity);
            OnChanged?.Invoke();
        }

        public void Clear()
        {
            foreach (var s in _slots) s.Clear();
            OnChanged?.Invoke();
        }
    }
}
