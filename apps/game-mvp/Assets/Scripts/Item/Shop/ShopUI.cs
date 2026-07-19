using Action.Actions;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Item.Shop
{
    /// <summary>
    /// Manages the shop panel. Dynamically generates shop entries from ShopConfig.
    /// 
    /// Setup:
    ///   1. Attach to your ShopBar panel GameObject.
    ///   2. Assign the ShopConfig asset.
    ///   3. Create an ActionShopOpen asset and assign it to the NPC's InteractionField.
    /// </summary>
    public class ShopUI : MonoBehaviour
    {
        [SerializeField] private ShopConfig shopConfig;

        [Header("Layout")]
        [SerializeField] private float slotSpacing = 4f;
        [SerializeField] private int sellButtonFontSize = 14;

        private Transform contentParent;
        private Button sellButton;
        private TextMeshProUGUI sellButtonText;
        private bool initialized;

        private void Start()
        {
            ActionShopOpen.OnShopOpen += OnShopOpenTriggered;
            // Start hidden — NPC click will show it
            gameObject.SetActive(false);
        }

        private void OnDestroy()
        {
            ActionShopOpen.OnShopOpen -= OnShopOpenTriggered;
        }

        private void OnShopOpenTriggered()
        {
            gameObject.SetActive(!gameObject.activeSelf);
        }

        private void OnEnable()
        {
            if (!initialized)
                BuildShopUI();

            // Reset sell mode when panel opens
            if (ShopManager.Instance != null)
                ShopManager.Instance.SetSellMode(false);

            UpdateSellButtonText();
        }

        private void OnDisable()
        {
            // Turn off sell mode when shop closes
            if (ShopManager.Instance != null)
                ShopManager.Instance.SetSellMode(false);
        }

        private void BuildShopUI()
        {
            if (shopConfig == null)
            {
                Debug.LogWarning("[ShopUI] No ShopConfig assigned!");
                return;
            }

            // Use a VerticalLayoutGroup on this panel for auto-arrangement
            var layout = GetComponent<VerticalLayoutGroup>();
            if (layout == null)
            {
                layout = gameObject.AddComponent<VerticalLayoutGroup>();
                layout.spacing = slotSpacing;
                layout.padding = new RectOffset(4, 4, 4, 4);
                layout.childAlignment = TextAnchor.UpperCenter;
                layout.childForceExpandWidth = true;
                layout.childForceExpandHeight = false;
            }

            // Add ContentSizeFitter if not present
            var fitter = GetComponent<ContentSizeFitter>();
            if (fitter == null)
            {
                fitter = gameObject.AddComponent<ContentSizeFitter>();
                fitter.verticalFit = ContentSizeFitter.FitMode.PreferredSize;
            }

            contentParent = this.transform;

            // Clear existing children (in case of rebuild)
            for (int i = contentParent.childCount - 1; i >= 0; i--)
            {
                Destroy(contentParent.GetChild(i).gameObject);
            }

            // ── Create shop slots ──
            foreach (ShopEntry entry in shopConfig.ShopEntries)
            {
                if (entry.item == null) continue;

                var slotGO = new GameObject($"ShopSlot_{entry.item.ItemName}");
                var slot = slotGO.AddComponent<ShopSlot>();
                slot.Setup(entry, contentParent);
            }

            // ── Create Sell button ──
            var sellGO = new GameObject("SellButton", typeof(RectTransform), typeof(Image), typeof(Button));
            sellGO.transform.SetParent(contentParent, false);
            sellButton = sellGO.GetComponent<Button>();
            var sellImage = sellGO.GetComponent<Image>();
            sellImage.color = new Color(0.7f, 0.2f, 0.2f, 1f);
            var sellLE = sellGO.AddComponent<LayoutElement>();
            sellLE.preferredHeight = 28;

            var sellTextGO = new GameObject("Text", typeof(RectTransform));
            sellTextGO.transform.SetParent(sellGO.transform, false);
            sellButtonText = sellTextGO.AddComponent<TextMeshProUGUI>();
            sellButtonText.text = "Sell";
            sellButtonText.fontSize = sellButtonFontSize;
            sellButtonText.alignment = TextAlignmentOptions.Center;
            sellButtonText.color = Color.white;
            var sellTextRT = sellTextGO.GetComponent<RectTransform>();
            sellTextRT.anchorMin = Vector2.zero;
            sellTextRT.anchorMax = Vector2.one;
            sellTextRT.offsetMin = Vector2.zero;
            sellTextRT.offsetMax = Vector2.zero;

            sellButton.onClick.AddListener(OnSellButtonClicked);

            initialized = true;
        }

        private void OnSellButtonClicked()
        {
            ShopManager.Instance?.ToggleSellMode();
            UpdateSellButtonText();
        }

        private void UpdateSellButtonText()
        {
            if (sellButtonText == null) return;

            bool isSelling = ShopManager.Instance != null && ShopManager.Instance.IsSellMode;
            sellButtonText.text = isSelling ? "Cancel Sell" : "Sell";

            if (sellButton != null)
            {
                var img = sellButton.GetComponent<Image>();
                if (img != null)
                    img.color = isSelling ? new Color(0.5f, 0.5f, 0.2f, 1f) : new Color(0.7f, 0.2f, 0.2f, 1f);
            }
        }
    }
}
