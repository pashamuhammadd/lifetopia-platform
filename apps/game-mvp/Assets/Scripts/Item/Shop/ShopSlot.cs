using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Item.Shop
{
    /// <summary>
    /// Individual shop entry in the ShopUI panel.
    /// Created dynamically by ShopUI — do not place manually.
    /// </summary>
    public class ShopSlot : MonoBehaviour
    {
        private Image iconImage;
        private TextMeshProUGUI priceText;
        private Button buyButton;
        private ShopEntry entry;

        public void Setup(ShopEntry shopEntry, Transform parent)
        {
            entry = shopEntry;
            transform.SetParent(parent, false);

            // Build UI hierarchy programmatically
            var rt = gameObject.AddComponent<RectTransform>();
            var layout = gameObject.AddComponent<HorizontalLayoutGroup>();
            layout.spacing = 4f;
            layout.padding = new RectOffset(4, 4, 2, 2);
            layout.childAlignment = TextAnchor.MiddleLeft;
            layout.childForceExpandWidth = false;
            layout.childForceExpandHeight = false;

            var fitter = gameObject.AddComponent<ContentSizeFitter>();
            fitter.horizontalFit = ContentSizeFitter.FitMode.PreferredSize;
            fitter.verticalFit = ContentSizeFitter.FitMode.PreferredSize;

            // ── Icon ──
            var iconGO = new GameObject("Icon", typeof(RectTransform), typeof(Image));
            iconGO.transform.SetParent(transform, false);
            iconImage = iconGO.GetComponent<Image>();
            var iconLE = iconGO.AddComponent<LayoutElement>();
            iconLE.preferredWidth = 32;
            iconLE.preferredHeight = 32;

            if (entry.item.Icon != null)
            {
                iconImage.sprite = entry.item.Icon;
            }

            // ── Price text ──
            var priceGO = new GameObject("Price", typeof(RectTransform));
            priceGO.transform.SetParent(transform, false);
            priceText = priceGO.AddComponent<TextMeshProUGUI>();
            priceText.text = $"{entry.BuyPrice}G";
            priceText.fontSize = 14;
            priceText.alignment = TextAlignmentOptions.MidlineLeft;
            priceText.color = Color.white;
            var priceLE = priceGO.AddComponent<LayoutElement>();
            priceLE.preferredWidth = 40;
            priceLE.preferredHeight = 32;

            // ── Buy button ──
            var btnGO = new GameObject("BuyBtn", typeof(RectTransform), typeof(Image), typeof(Button));
            btnGO.transform.SetParent(transform, false);
            buyButton = btnGO.GetComponent<Button>();
            var btnImage = btnGO.GetComponent<Image>();
            btnImage.color = new Color(0.2f, 0.6f, 0.3f, 1f);
            var btnLE = btnGO.AddComponent<LayoutElement>();
            btnLE.preferredWidth = 50;
            btnLE.preferredHeight = 28;

            var btnTextGO = new GameObject("Text", typeof(RectTransform));
            btnTextGO.transform.SetParent(btnGO.transform, false);
            var btnText = btnTextGO.AddComponent<TextMeshProUGUI>();
            btnText.text = "Buy";
            btnText.fontSize = 12;
            btnText.alignment = TextAlignmentOptions.Center;
            btnText.color = Color.white;
            var btnTextRT = btnTextGO.GetComponent<RectTransform>();
            btnTextRT.anchorMin = Vector2.zero;
            btnTextRT.anchorMax = Vector2.one;
            btnTextRT.offsetMin = Vector2.zero;
            btnTextRT.offsetMax = Vector2.zero;

            buyButton.onClick.AddListener(OnBuyClicked);
        }

        private void OnBuyClicked()
        {
            ShopManager.Instance?.Buy(entry);
        }
    }
}
