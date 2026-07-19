using Lifetopia.Models;

namespace Lifetopia.Interfaces
{
    public interface IInventory
    {
        bool AddItem(ItemModel item, int qty = 1);
        bool RemoveItem(string itemId, int qty = 1);
        bool HasItem(string itemId, int qty = 1);
        int  GetQuantity(string itemId);
    }
}
