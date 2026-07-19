using UnityEngine;
using UnityEngine.UI;
using TMPro;
using Lifetopia.Interfaces;
using Lifetopia.Constants;

namespace Lifetopia.UI.Screens
{
    /// <summary>Pause menu screen — resume, settings, quit.</summary>
    public class PauseScreen : MonoBehaviour, IUIScreen
    {
        public string ScreenId  => UIConstants.SCREEN_PAUSE;
        public bool   IsVisible => gameObject.activeSelf;

        Canvas     _canvas;
        GameObject _panel;

        void Awake()
        {
            BuildUI();
            Hide();
            Managers.UIManager.Instance?.Register(this);
        }

        void OnDestroy() =>
            Managers.UIManager.Instance?.Unregister(ScreenId);

        public void Show()
        {
            gameObject.SetActive(true);
            LifetopiaLevelGameplayFsm.Instance?.Pause();
        }

        public void Hide()
        {
            gameObject.SetActive(false);
            LifetopiaLevelGameplayFsm.Instance?.Resume();
        }

        void BuildUI()
        {
            _canvas = gameObject.AddComponent<Canvas>();
            _canvas.renderMode  = RenderMode.ScreenSpaceOverlay;
            _canvas.sortingOrder = UIConstants.CANVAS_SORT_MODAL;
            gameObject.AddComponent<CanvasScaler>().uiScaleMode =
                CanvasScaler.ScaleMode.ScaleWithScreenSize;
            gameObject.AddComponent<GraphicRaycaster>();

            // Dim overlay
            var dim = new GameObject("Dim");
            dim.transform.SetParent(transform, false);
            var dimImg = dim.AddComponent<Image>();
            dimImg.color = new Color(0f, 0f, 0f, 0.7f);
            var dimRT = dim.GetComponent<RectTransform>();
            dimRT.anchorMin = Vector2.zero;
            dimRT.anchorMax = Vector2.one;
            dimRT.offsetMin = dimRT.offsetMax = Vector2.zero;

            // Panel
            _panel = new GameObject("PausePanel");
            _panel.transform.SetParent(transform, false);
            var panelImg = _panel.AddComponent<Image>();
            panelImg.color = new Color(0.08f, 0.06f, 0.12f, 0.97f);
            var panelRT = _panel.GetComponent<RectTransform>();
            panelRT.anchorMin = panelRT.anchorMax = new Vector2(0.5f, 0.5f);
            panelRT.sizeDelta = new Vector2(360f, 400f);

            // Title
            AddText(_panel.transform, "PAUSED", 36f, new Vector2(0f, 150f),
                new Vector2(300f, 50f), new Color(1f, 0.85f, 0.15f), FontStyles.Bold);

            // Buttons
            AddButton(_panel.transform, "RESUME",   new Vector2(0f,  60f), Resume);
            AddButton(_panel.transform, "SETTINGS", new Vector2(0f, -10f), OpenSettings);
            AddButton(_panel.transform, "MAP",      new Vector2(0f, -80f), GoToMap);
            AddButton(_panel.transform, "QUIT",     new Vector2(0f,-150f), QuitGame,
                new Color(0.7f, 0.15f, 0.15f));
        }

        void Resume()       => Hide();
        void OpenSettings() => Managers.UIManager.Instance?.Show(UIConstants.SCREEN_SETTINGS);
        void GoToMap()
        {
            Hide();
            LifetopiaGameFlowFsm.Instance?.ReturnToMapSelect();
        }
        void QuitGame()
        {
#if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
#else
            Application.Quit();
#endif
        }

        void AddText(Transform parent, string text, float size, Vector2 pos,
            Vector2 sizeDelta, Color color, FontStyles style = FontStyles.Normal)
        {
            var go = new GameObject(text + "_Lbl");
            go.transform.SetParent(parent, false);
            var tmp = go.AddComponent<TextMeshProUGUI>();
            tmp.text      = text;
            tmp.fontSize  = size;
            tmp.color     = color;
            tmp.fontStyle = style;
            tmp.alignment = TextAlignmentOptions.Center;
            var rt = go.GetComponent<RectTransform>();
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 0.5f);
            rt.anchoredPosition = pos;
            rt.sizeDelta = sizeDelta;
        }

        void AddButton(Transform parent, string label, Vector2 pos,
            UnityEngine.Events.UnityAction onClick, Color? bgColor = null)
        {
            var go = new GameObject(label + "_Btn");
            go.transform.SetParent(parent, false);
            var img = go.AddComponent<Image>();
            img.color = bgColor ?? new Color(0.25f, 0.18f, 0.35f);
            var btn = go.AddComponent<Button>();
            btn.onClick.AddListener(onClick);
            var rt = go.GetComponent<RectTransform>();
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 0.5f);
            rt.anchoredPosition = pos;
            rt.sizeDelta = new Vector2(260f, 52f);

            var txtGo = new GameObject("Lbl");
            txtGo.transform.SetParent(go.transform, false);
            var txt = txtGo.AddComponent<TextMeshProUGUI>();
            txt.text      = label;
            txt.fontSize  = 22f;
            txt.color     = Color.white;
            txt.alignment = TextAlignmentOptions.Center;
            var txtr = txt.rectTransform;
            txtr.anchorMin = Vector2.zero;
            txtr.anchorMax = Vector2.one;
            txtr.offsetMin = txtr.offsetMax = Vector2.zero;
        }
    }
}
