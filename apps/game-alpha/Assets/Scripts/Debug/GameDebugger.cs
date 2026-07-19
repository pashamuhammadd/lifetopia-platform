using UnityEngine;
using TMPro;

// Alias untuk hindari conflict dengan namespace Lifetopia.Debug
using UDebug = UnityEngine.Debug;

namespace Lifetopia.Debug
{
    /// <summary>
    /// In-game debug overlay — FPS, state, gold, biome.
    /// Toggle dengan F1. Hanya aktif di Editor dan Development Build.
    /// </summary>
    public class GameDebugger : MonoBehaviour
    {
        public static GameDebugger Instance { get; private set; }

        [Header("Settings")]
        public KeyCode toggleKey  = KeyCode.F1;
        public bool    showOnStart = false;

        TextMeshProUGUI _label;
        Canvas          _canvas;
        bool            _visible;
        float           _fpsTimer;
        float           _fps;
        int             _frameCount;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            BuildUI();
            SetVisible(showOnStart);
        }

        void BuildUI()
        {
            var go = new GameObject("DebugCanvas");
            go.transform.SetParent(transform, false);
            _canvas = go.AddComponent<Canvas>();
            _canvas.renderMode   = RenderMode.ScreenSpaceOverlay;
            _canvas.sortingOrder = 9999;
            go.AddComponent<UnityEngine.UI.CanvasScaler>().uiScaleMode =
                UnityEngine.UI.CanvasScaler.ScaleMode.ScaleWithScreenSize;

            var bg    = new GameObject("BG");
            bg.transform.SetParent(go.transform, false);
            var bgImg = bg.AddComponent<UnityEngine.UI.Image>();
            bgImg.color = new Color(0f, 0f, 0f, 0.65f);
            var bgRT  = bg.GetComponent<RectTransform>();
            bgRT.anchorMin        = new Vector2(0f, 1f);
            bgRT.anchorMax        = new Vector2(0f, 1f);
            bgRT.pivot            = new Vector2(0f, 1f);
            bgRT.anchoredPosition = new Vector2(8f, -8f);
            bgRT.sizeDelta        = new Vector2(280f, 200f);

            var lblGO = new GameObject("Label");
            lblGO.transform.SetParent(bg.transform, false);
            _label = lblGO.AddComponent<TextMeshProUGUI>();
            _label.fontSize = 14f;
            _label.color    = new Color(0.2f, 1f, 0.4f);
            var lblRT = _label.rectTransform;
            lblRT.anchorMin = Vector2.zero;
            lblRT.anchorMax = Vector2.one;
            lblRT.offsetMin = new Vector2(8f, 8f);
            lblRT.offsetMax = new Vector2(-8f, -8f);
        }

        void Update()
        {
            if (UnityEngine.Input.GetKeyDown(toggleKey))
                SetVisible(!_visible);

            if (!_visible) return;

            _frameCount++;
            _fpsTimer += Time.unscaledDeltaTime;
            if (_fpsTimer >= 0.5f)
            {
                _fps        = _frameCount / _fpsTimer;
                _frameCount = 0;
                _fpsTimer   = 0f;
            }

            UpdateLabel();
        }

        void UpdateLabel()
        {
            if (_label == null) return;

            var gs  = LifetopiaGameState.Instance;
            var fsm = LifetopiaLevelGameplayFsm.Instance;
            var gf  = LifetopiaGameFlowFsm.Instance;
            var eco = Systems.EconomySystem.Instance;

            _label.text =
                $"<b>LIFETOPIA DEBUG</b> [F1]\n" +
                $"FPS: {_fps:F0}\n" +
                $"Flow: {gf?.Current}\n" +
                $"Level FSM: {fsm?.State}\n" +
                $"Biome: {gf?.ActiveBiome}\n" +
                $"Gold: {eco?.Gold ?? gs?.Gold ?? 0}\n" +
                $"Level: {eco?.Level ?? gs?.Level ?? 1}\n" +
                $"Wallet: {gs?.ShortWalletDisplay() ?? "none"}\n" +
                $"Scene: {UnityEngine.SceneManagement.SceneManager.GetActiveScene().name}\n" +
                $"Time: {Time.realtimeSinceStartup:F0}s";
        }

        public void SetVisible(bool v)
        {
            _visible = v;
            if (_canvas != null) _canvas.gameObject.SetActive(v);
        }

        public void Log(string msg) => UnityEngine.Debug.Log($"[GameDebugger] {msg}");
    }
}
