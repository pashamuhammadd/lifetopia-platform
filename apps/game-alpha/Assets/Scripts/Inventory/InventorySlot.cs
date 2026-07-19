using System;
using Lifetopia.Models;

namespace Lifetopia.Inventory
{
    /// <summary>Satu slot inventory — item + quantity.</summary>
    [Serializable]
    public class InventorySlot
    {
        public ItemModel Item     { get; private set; }
        public int       Quantity { get; private set; }
        public bool      IsEmpty  => Item == null || Quantity <= 0;

        public InventorySlot() { }
        public InventorySlot(ItemModel item, int qty) { Item = item; Quantity = qty; }

        public bool Add(int qty)
        {
            if (Item == null) return false;
            if (Quantity + qty > Item.MaxStack) return false;
            Quantity += qty;
            return true;
        }

        public bool Remove(int qty)
        {
            if (Quantity < qty) return false;
            Quantity -= qty;
            if (Quantity <= 0) { Item = null; Quantity = 0; }
            return true;
        }

        public void Set(ItemModel item, int qty)
        {
            Item     = item;
            Quantity = Math.Max(0, qty);
        }

        public void Clear() { Item = null; Quantity = 0; }

        public override string ToString() =>
            IsEmpty ? "[Empty]" : $"[{Item.DisplayName} x{Quantity}]";
    }
}
