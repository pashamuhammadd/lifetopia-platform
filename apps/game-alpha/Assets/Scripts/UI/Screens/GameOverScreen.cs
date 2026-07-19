using UnityEngine;
using UnityEngine.UI;
using TMPro;
using Lifetopia.Interfaces;
using Lifetopia.Constants;

namespace Lifetopia.UI.Screens
{
    /// <summary>Game over screen — retry, map, quit.</summary>
    public class GameOverScreen : MonoBehaviour, IUIScreen
    {
        public string ScreenId  => UIConstants.SCREEN_GAME_OVER;
        public bool   IsVisible => gameObject.activeSelf;

        TextMeshProUGUI _statsText;

        void Awake()
        {
            BuildUI();
            Hide();
            Managers.UIManager.Instance?.Register(this);
            Events.GameEventBus.Subscribe<Events.PlayerDiedEvent>(_ => Show());
        }

        void OnDestroy()
        {
            Managers.UIManager.Instance?.Unregister(ScreenId);
            Events.GameEventBus.Unsubscribe<Events.PlayerDiedEvent>(_ => Show());
        }

        public void Show()
        {
            gameObject.SetActive(true);
            UpdateStats();
        }

        public void Hide() => gameObject.SetActive(false);

        void UpdateStats()
        {
            if (_statsText == null) return;
            var session = Game.GameSession.Instance;
            if (session == null) return;
            _statsText.text =
                $"Time: {session.GetPlayTimeFormatted()}\n" +
                $"Gold Earned: {session.GoldEarnedThisSession}\n" +
                $"Crops Harvested: {session.CropsHarvestedThisSession}";
        }

        void BuildUI()
        {
            var cv = gameObject.AddComponent<Canvas>();
            cv.renderMode  = RenderMode.ScreenSpaceOverlay;
            cv.sortingOrder = UIConstants.CANVAS_SORT_MODAL + 10;
            gameObject.AddComponent<CanvasScaler>().uiScaleMode =
                CanvasScaler.ScaleMode.ScaleWithScreenSize;
            gameObject.AddComponent<GraphicRaycaster>();

            var dim = new GameObject("Dim");
            dim.transform.SetParent(transform, false);
            var dimImg = dim.AddComponent<Image>();
            dimImg.color = new Color(0f, 0f, 0f, 0.85f);
            var dimRT = dim.GetComponent<RectTransform>();
            dimRT.anchorMin = Vector2.zero;
            dimRT.anchorMax = Vector2.one;
            dimRT.offsetMin = dimRT.offsetMax = Vector2.zero;

            var panel = new GameObject("Panel");
            panel.transform.SetParent(transform, false);
            var pImg = panel.AddComponent<Image>();
            pImg.color = new Color(0.1f, 0.04f, 0.04f, 0.97f);
            var pRT = panel.GetComponent<RectTransform>();
            pRT.anchorMin = pRT.anchorMax = new Vector2(0.5f, 0.5f);
            pRT.sizeDelta = new Vector2(400f, 440f);

            // Title
            var titleGO = new GameObject("Title");
            titleGO.transform.SetParent(panel.transform, false);
            var title = titleGO.AddComponent<TextMeshProUGUI>();
            title.text      = "GAME OVER";
            title.fontSize  = 48f;
            title.color     = new Color(0.9f, 0.2f, 0.2f);
            title.fontStyle = FontStyles.Bold;
            title.alignment = TextAlignmentOptions.Center;
            var titleRT = titleGO.GetComponent<RectTransform>();
            titleRT.anchorMin = titleRT.anchorMax = new Vector2(0.5f, 0.5f);
            titleRT.anchoredPosition = new Vector2(0f, 160f);
            titleRT.sizeDelta = new Vector2(360f, 60f);

            // Stats
            var statsGO = new GameObject("Stats");
            statsGO.transform.SetParent(panel.transform, false);
            _statsText = statsGO.AddComponent<TextMeshProUGUI>();
            _statsText.fontSize  = 20f;
            _statsText.color     = new Color(0.85f, 0.85f, 0.85f);
            _statsText.alignment = TextAlignmentOptions.Center;
            var statsRT = statsGO.GetComponent<RectTransform>();
            statsRT.anchorMin = statsRT.anchorMax = new Vector2(0.5f, 0.5f);
            statsRT.anchoredPosition = new Vector2(0f, 60f);
            statsRT.sizeDelta = new Vector2(340f, 100f);

            AddButton(panel.transform, "TRY AGAIN", new Vector2(0f, -60f),
                () => UnityEngine.SceneManagement.SceneManager.LoadScene(
                    UnityEngine.SceneManagement.SceneManager.GetActiveScene().name));
            AddButton(panel.transform, "BACK TO MAP", new Vector2(0f, -130f),
                () => LifetopiaGameFlowFsm.Instance?.ReturnToMapSelect(),
                new Color(0.2f, 0.2f, 0.4f));
        }

        void AddButton(Transform parent, string label, Vector2 pos,
            UnityEngine.Events.UnityAction onClick, Color? bgColor = null)
        {
            var go = new GameObject(label + "_Btn");
            go.transform.SetParent(parent, false);
            var img = go.AddComponent<Image>();
            img.color = bgColor ?? new Color(0.5f, 0.1f, 0.1f);
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
