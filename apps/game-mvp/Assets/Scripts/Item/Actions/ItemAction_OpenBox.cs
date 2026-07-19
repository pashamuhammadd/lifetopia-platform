using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Item;
using Item.Inventory;

namespace Item.Actions
{
    [CreateAssetMenu(fileName = "Item Action Open Box", menuName = "Items/Item Actions/Open Box")]
    public class ItemAction_OpenBox : ItemAction
    {
        [System.Serializable]
        public struct ItemReward
        {
            public ItemData item;
            public int amount;
        }

        [SerializeField, Tooltip("Amount of gold to give")]
        private int goldReward;

        [SerializeField, Tooltip("Reference to the gold item asset")]
        private ItemData goldItem;

        [SerializeField, Tooltip("List of items and their amounts to give")]
        private List<ItemReward> itemRewards;

        public override IEnumerator ItemUseAction(Inventory.Inventory userInventory, int itemIndex)
        {
            // Small delay to allow UI to process if needed, following existing patterns
            yield return null;

            InventoryItem boxItem = userInventory.GetItem(itemIndex);
            if (boxItem == null) yield break;

            // 1. Give Gold
            if (goldItem != null && goldReward > 0)
            {
                userInventory.AddItem(goldItem, goldReward);
                Debug.Log($"[ItemAction_OpenBox] Added {goldReward} gold.");
            }

            // 2. Give Item Rewards
            if (itemRewards != null)
            {
                foreach (var reward in itemRewards)
                {
                    if (reward.item != null && reward.amount > 0)
                    {
                        userInventory.AddItem(reward.item, reward.amount);
                        Debug.Log($"[ItemAction_OpenBox] Added {reward.amount} of {reward.item.ItemName}.");
                    }
                }
            }

            // 3. Consume the Box
            if (boxItem.Data.CanStack)
            {
                boxItem.Amount -= 1;
                if (boxItem.Amount <= 0)
                {
                    userInventory.RemoveItem(itemIndex);
                }
                else
                {
                    userInventory.ReloadItemSlot(itemIndex);
                }
            }
            else
            {
                userInventory.RemoveItem(itemIndex);
            }

            Debug.Log($"[ItemAction_OpenBox] Box at index {itemIndex} opened. Rewards given.");
        }

        public override bool ItemUseCondition(Inventory.Inventory userInventory, int itemIndex)
        {
            // Allow opening as long as the item exists in the inventory.
            return userInventory.GetItem(itemIndex) != null;
        }
    }
}
