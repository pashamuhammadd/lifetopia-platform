using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using Lifetopia.Interfaces;
using Lifetopia.Constants;
using Lifetopia.Managers;
using Lifetopia.Items;

namespace Lifetopia.UI.Screens
{
    /// <summary>Inventory screen — grid display semua item player.</summary>
    public class InventoryScreen : MonoBehaviour, IUIScreen
    {
        public string ScreenId  => UIConstants.SCREEN_INVENTORY;
        public bool   IsVisible => gameObject.activeSelf;

        Canvas     _canvas;
        Transform  _grid;
        TextMeshProUGUI _titleTxt;

        void Awake()
        {
            BuildUI();
            Hide();
            UIManager.Instance?.Register(this);
        }

        void OnDestroy() => UIManager.Instance?.Unregister(ScreenId);

        public void Show()
        {
            gameObject.SetActive(true);
            RefreshGrid();
            LifetopiaLevelGameplayFsm.Instance?.OpenUiModal();
        }

        public void Hide()
        {
            gameObject.SetActive(false);
            LifetopiaLevelGameplayFsm.Instance?.CloseUiModal();
        }

        void RefreshGrid()
        {
            if (_grid == null) return;

            // Clear existing
            for (int i = _grid.childCount - 1; i >= 0; i--)
                Destroy(_grid.GetChild(i).gameObject);

            var items = InventoryManager.Instance?.GetAll();
            if (items == null) return;

            foreach (var kv in items)
            {
                var item = ItemDatabase.Get(kv.Key);
                string displayName = item?.DisplayName ?? kv.Key;
                CreateSlot(displayName, kv.Value, item?.Rarity ?? Models.ItemRarity.Common);
            }
        }

        void CreateSlot(string name, int qty, Models.ItemRarity rarity)
        {
            var go = new GameObject("Slot_" + name);
            go.transform.SetParent(_grid, false);

            var img = go.AddComponent<Image>();
            img.color = RarityColor(rarity);

            var rt = go.GetComponent<RectTransform>();
            rt.sizeDelta = new Vector2(90f, 90f);

            var nameGO = new GameObject("Name");
            nameGO.transform.SetParent(go.transform, false);
            var nameTxt = nameGO.AddComponent<TextMeshProUGUI>();
            nameTxt.text      = name;
            nameTxt.fontSize  = 11f;
            nameTxt.color     = Color.white;
            nameTxt.alignment = TextAlignmentOptions.Center;
            var nameRT = nameTxt.rectTransform;
            nameRT.anchorMin = new Vector2(0f, 0.5f);
            nameRT.anchorMax = Vector2.one;
            nameRT.offsetMin = new Vector2(4f, 0f);
            nameRT.offsetMax = new Vector2(-4f, -4f);

            var qtyGO = new GameObject("Qty");
            qtyGO.transform.SetParent(go.transform, false);
            var qtyTxt = qtyGO.AddComponent<TextMeshProUGUI>();
            qtyTxt.text      = $"x{qty}";
            qtyTxt.fontSize  = 14f;
            qtyTxt.color     = new Color(1f, 0.85f, 0.15f);
            qtyTxt.fontStyle = FontStyles.Bold;
            qtyTxt.alignment = TextAlignmentOptions.BottomRight;
            var qtyRT = qtyTxt.rectTransform;
            qtyRT.anchorMin = Vector2.zero;
            qtyRT.anchorMax = new Vector2(1f, 0.5f);
            qtyRT.offsetMin = new Vector2(4f, 4f);
            qtyRT.offsetMax = new Vector2(-4f, 0f);
        }

        Color RarityColor(Models.ItemRarity r) => r switch
        {
            Models.ItemRarity.Uncommon  => new Color(0.1f, 0.4f, 0.1f, 0.9f),
            Models.ItemRarity.Rare      => new Color(0.1f, 0.2f, 0.6f, 0.9f),
            Models.ItemRarity.Epic      => new Color(0.4f, 0.1f, 0.6f, 0.9f),
            Models.ItemRarity.Legendary => new Color(0.7f, 0.5f, 0.0f, 0.9f),
            _                           => new Color(0.2f, 0.2f, 0.2f, 0.9f),
        };

        void BuildUI()
        {
            _canvas = gameObject.AddComponent<Canvas>();
            _canvas.renderMode   = RenderMode.ScreenSpaceOverlay;
            _canvas.sortingOrder = UIConstants.CANVAS_SORT_MODAL;
            gameObject.AddComponent<CanvasScaler>().uiScaleMode =
                CanvasScaler.ScaleMode.ScaleWithScreenSize;
            gameObject.AddComponent<GraphicRaycaster>();

            var dim = new GameObject("Dim");
            dim.transform.SetParent(transform, false);
            var dimImg = dim.AddComponent<Image>();
            dimImg.color = new Color(0f, 0f, 0f, 0.75f);
            var dimRT = dim.GetComponent<RectTransform>();
            dimRT.anchorMin = Vector2.zero;
            dimRT.anchorMax = Vector2.one;
            dimRT.offsetMin = dimRT.offsetMax = Vector2.zero;

            var panel = new GameObject("Panel");
            panel.transform.SetParent(transform, false);
            var pImg = panel.AddComponent<Image>();
            pImg.color = new Color(0.08f, 0.06f, 0.12f, 0.97f);
            var pRT = panel.GetComponent<RectTransform>();
            pRT.anchorMin = pRT.anchorMax = new Vector2(0.5f, 0.5f);
            pRT.sizeDelta = new Vector2(600f, 500f);

            var titleGO = new GameObject("Title");
            titleGO.transform.SetParent(panel.transform, false);
            _titleTxt = titleGO.AddComponent<TextMeshProUGUI>();
            _titleTxt.text      = "INVENTORY";
            _titleTxt.fontSize  = 28f;
            _titleTxt.color     = new Color(1f, 0.85f, 0.15f);
            _titleTxt.fontStyle = FontStyles.Bold;
            _titleTxt.alignment = TextAlignmentOptions.Center;
            var titleRT = titleGO.GetComponent<RectTransform>();
            titleRT.anchorMin = titleRT.anchorMax = new Vector2(0.5f, 0.5f);
            titleRT.anchoredPosition = new Vector2(0f, 210f);
            titleRT.sizeDelta = new Vector2(560f, 40f);

            var gridGO = new GameObject("Grid");
            gridGO.transform.SetParent(panel.transform, false);
            var gridLayout = gridGO.AddComponent<GridLayoutGroup>();
            gridLayout.cellSize    = new Vector2(90f, 90f);
            gridLayout.spacing     = new Vector2(8f, 8f);
            gridLayout.padding     = new RectOffset(10, 10, 10, 10);
            gridLayout.constraint  = GridLayoutGroup.Constraint.FixedColumnCount;
            gridLayout.constraintCount = 5;
            var gridRT = gridGO.GetComponent<RectTransform>();
            gridRT.anchorMin = gridRT.anchorMax = new Vector2(0.5f, 0.5f);
            gridRT.anchoredPosition = new Vector2(0f, -20f);
            gridRT.sizeDelta = new Vector2(560f, 380f);
            _grid = gridGO.transform;

            var closeGO = new GameObject("CloseBtn");
            closeGO.transform.SetParent(panel.transform, false);
            var closeImg = closeGO.AddComponent<Image>();
            closeImg.color = new Color(0.5f, 0.1f, 0.1f);
            var closeBtn = closeGO.AddComponent<Button>();
            closeBtn.onClick.AddListener(Hide);
            var closeRT = closeGO.GetComponent<RectTransform>();
            closeRT.anchorMin = closeRT.anchorMax = new Vector2(0.5f, 0.5f);
            closeRT.anchoredPosition = new Vector2(260f, 210f);
            closeRT.sizeDelta = new Vector2(40f, 40f);
            var closeLbl = new GameObject("X");
            closeLbl.transform.SetParent(closeGO.transform, false);
            var closeTxt = closeLbl.AddComponent<TextMeshProUGUI>();
            closeTxt.text = "X";
            closeTxt.fontSize = 20f;
            closeTxt.color = Color.white;
            closeTxt.alignment = TextAlignmentOptions.Center;
            var closeLblRT = closeTxt.rectTransform;
            closeLblRT.anchorMin = Vector2.zero;
            closeLblRT.anchorMax = Vector2.one;
            closeLblRT.offsetMin = closeLblRT.offsetMax = Vector2.zero;
        }
    }
}
