using System;

namespace Lifetopia.Models
{
    public enum ShopCurrency { Gold, SOL, Token }

    [Serializable]
    public class ShopItemModel
    {
        public string       ShopItemId   = "";
        public ItemModel    Item         = new ItemModel();
        public int          Price        = 10;
        public ShopCurrency Currency     = ShopCurrency.Gold;
        public int          Stock        = -1;   // -1 = unlimited
        public bool         IsAvailable  = true;
        public DateTime     AvailableUntil = DateTime.MaxValue;

        public bool CanBuy(int qty = 1) =>
            IsAvailable && (Stock < 0 || Stock >= qty) && DateTime.UtcNow < AvailableUntil;
    }
}
