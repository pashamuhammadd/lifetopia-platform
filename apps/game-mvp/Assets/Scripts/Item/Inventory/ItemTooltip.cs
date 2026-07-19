using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Item.Inventory
{
    /// <summary>
    /// Tooltip panel that displays item information on hover.
    /// 
    /// Setup:
    ///   1. Create a UI Panel as a child of the Canvas.
    ///   2. Add this component to the panel.
    ///   3. Add child Text elements for Name, Description, and Price.
    ///   4. Add a child Image for the item icon.
    ///   5. Wire them up in the Inspector.
    ///   6. On each InventorySlot, assign the Tooltip reference.
    ///   7. The panel starts hidden and shows on hover.
    /// </summary>
    public class ItemTooltip : MonoBehaviour
    {
        public static ItemTooltip Instance { get; private set; }

        [Header("UI References")]
        [SerializeField] private TextMeshProUGUI itemNameText;
        [SerializeField] private TextMeshProUGUI descriptionText;
        [SerializeField] private TextMeshProUGUI priceText;
        [SerializeField] private Image iconImage;

        [Header("Settings")]
        [SerializeField] private Vector2 offset = new Vector2(10f, -10f);
        [SerializeField] private bool followMouse = true;

        private RectTransform rectTransform;
        private Canvas canvas;

        private void Awake()
        {
            Instance = this;
            rectTransform = GetComponent<RectTransform>();
            canvas = GetComponentInParent<Canvas>();

            // Set pivot to top-left so the panel expands down-right from cursor
            rectTransform.pivot = new Vector2(0f, 1f);

            Hide();
        }

        /// <summary>
        /// Show the tooltip with the given item data.
        /// </summary>
        public void Show(ItemData data, Vector2 position)
        {
            if (data == null)
                return;

            // Item name
            if (itemNameText != null)
                itemNameText.text = data.ItemName;

            // Description
            if (descriptionText != null)
            {
                string desc = data.Description;
                descriptionText.gameObject.SetActive(!string.IsNullOrEmpty(desc));
                descriptionText.text = desc;
            }

            // Price
            if (priceText != null)
            {
                if (data.Price > 0)
                {
                    priceText.gameObject.SetActive(true);
                    priceText.text = $"{data.Price}G";
                }
                else
                {
                    priceText.gameObject.SetActive(false);
                }
            }

            // Icon
            if (iconImage != null)
            {
                if (data.Icon != null)
                {
                    iconImage.sprite = data.Icon;
                    iconImage.gameObject.SetActive(true);
                }
                else
                {
                    iconImage.gameObject.SetActive(false);
                }
            }

            gameObject.SetActive(true);

            // Force layout rebuild so sizeDelta is correct before positioning
            LayoutRebuilder.ForceRebuildLayoutImmediate(rectTransform);

            UpdatePosition(position);
        }

        /// <summary>
        /// Hide the tooltip.
        /// </summary>
        public void Hide()
        {
            gameObject.SetActive(false);
        }

        /// <summary>
        /// Positions the tooltip at the bottom-right of the cursor.
        /// </summary>
        public void UpdatePosition(Vector2 screenPosition)
        {
            if (rectTransform == null || canvas == null)
                return;

            RectTransform canvasRect = canvas.GetComponent<RectTransform>();

            // Convert screen position to local position in the canvas
            Vector2 localPoint;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(
                canvasRect, screenPosition, canvas.worldCamera, out localPoint);

            // Apply offset (bottom-right of cursor)
            localPoint += offset;

            // Get tooltip size in canvas space
            Vector2 tooltipSize = rectTransform.sizeDelta;

            // Clamp so tooltip stays within canvas bounds
            Vector2 canvasSize = canvasRect.sizeDelta;
            Vector2 canvasPivot = canvasRect.pivot;

            float minX = -canvasSize.x * canvasPivot.x;
            float maxX = canvasSize.x * (1f - canvasPivot.x);
            float minY = -canvasSize.y * canvasPivot.y;
            float maxY = canvasSize.y * (1f - canvasPivot.y);

            // If tooltip goes off right edge, flip to left side of cursor
            if (localPoint.x + tooltipSize.x > maxX)
                localPoint.x = localPoint.x - tooltipSize.x - offset.x * 2f;

            // If tooltip goes off bottom edge, flip to above cursor
            if (localPoint.y - tooltipSize.y < minY)
                localPoint.y = localPoint.y + tooltipSize.y + Mathf.Abs(offset.y) * 2f;

            rectTransform.localPosition = localPoint;
        }
    }
}
