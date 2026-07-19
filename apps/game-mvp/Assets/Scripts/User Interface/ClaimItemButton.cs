using Item;
using Item.Inventory;
using Referencing.Scriptable_Reference;
using UnityEngine;
using UnityEngine.UI;

namespace User_Interface
{
    /// <summary>
    /// Attach this to a UI Button to claim an item (like the starter pack).
    /// </summary>
    public class ClaimItemButton : MonoBehaviour
    {
        [SerializeField]
        private ScriptableReference playerReference;

        [SerializeField]
        private ItemData itemToClaim;

        [SerializeField]
        private int amountToClaim = 1;

        private Button button;

        private void Awake()
        {
            button = GetComponent<Button>();
            if (button != null)
            {
                button.onClick.AddListener(ClaimItem);
            }
        }

        public void ClaimItem()
        {
            if (playerReference == null || playerReference.Reference == null)
            {
                Debug.LogWarning("[ClaimItemButton] Player reference is missing or null!");
                return;
            }

            Inventory inventory = playerReference.Reference.GetComponent<Inventory>();
            if (inventory != null)
            {
                bool success = inventory.AddItem(itemToClaim, amountToClaim);
                if (success)
                {
                    Debug.Log($"[ClaimItemButton] Successfully claimed {amountToClaim}x {itemToClaim.ItemName}");
                    this.gameObject.SetActive(false);
                }
                else
                {
                    Debug.LogWarning("[ClaimItemButton] Failed to claim item (Inventory might be full)");
                }
            }
        }
    }
}
