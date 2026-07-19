using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.UI;
using Lifetopia.SaveSystem;

namespace Lifetopia.Systems
{
    [Serializable]
    public class TutorialStep
    {
        public string Id          = "";
        public string Title       = "";
        public string Message     = "";
        public string HighlightId = "";   // ID GameObject yang di-highlight
        public float  AutoAdvance = 0f;   // 0 = manual, >0 = auto setelah N detik
    }

    /// <summary>
    /// Tutorial system — step-by-step guide dengan highlight dan tooltip.
    /// Skip-able, progress di-save ke PlayerPrefs.
    /// </summary>
    public class TutorialSystem : MonoBehaviour
    {
        public static TutorialSystem Instance { get; private set; }

        [Header("Settings")]
        public bool skipIfCompleted = true;
        public List<TutorialStep> steps = new List<TutorialStep>();

        public bool  IsActive    { get; private set; }
        public int   CurrentStep { get; private set; }

        public event Action OnTutorialStarted;
        public event Action OnTutorialCompleted;
        public event Action<TutorialStep> OnStepChanged;

        Canvas          _canvas;
        GameObject      _panel;
        TextMeshProUGUI _titleTxt;
        TextMeshProUGUI _bodyTxt;
        TextMeshProUGUI _stepTxt;

        const string SAVE_KEY = "lf_tutorial_done";

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        // ── Public API ────────────────────────────────────────────────────────

        public void StartTutorial(bool forceRestart = false)
        {
            if (!forceRestart && skipIfCompleted && IsCompleted()) return;
            if (steps.Count == 0) return;

            CurrentStep = 0;
            IsActive    = true;
            BuildUI();
            ShowStep(steps[0]);
            OnTutorialStarted?.Invoke();
        }

        public void NextStep()
        {
            if (!IsActive) return;
            CurrentStep++;
            if (CurrentStep >= steps.Count) { CompleteTutorial(); return; }
            ShowStep(steps[CurrentStep]);
        }

        public void SkipTutorial() => CompleteTutorial();

        public bool IsCompleted() =>
            PlayerPrefs.GetInt(SAVE_KEY, 0) == 1;

        // ── Internal ──────────────────────────────────────────────────────────

        void ShowStep(TutorialStep step)
        {
            if (_panel != null) _panel.SetActive(true);
            if (_titleTxt != null) _titleTxt.text = step.Title;
            if (_bodyTxt  != null) _bodyTxt.text  = step.Message;
            if (_stepTxt  != null) _stepTxt.text  = $"{CurrentStep + 1}/{steps.Count}";

            OnStepChanged?.Invoke(step);

            if (step.AutoAdvance > 0f)
                StartCoroutine(AutoAdvanceRoutine(step.AutoAdvance));
        }

        IEnumerator AutoAdvanceRoutine(float delay)
        {
            yield return new WaitForSeconds(delay);
            NextStep();
        }

        void CompleteTutorial()
        {
            IsActive = false;
            PlayerPrefs.SetInt(SAVE_KEY, 1);
            PlayerPrefs.Save();
            if (_panel != null) _panel.SetActive(false);
            OnTutorialCompleted?.Invoke();
        }

        void BuildUI()
        {
            if (_canvas != null) return;

            var go = new GameObject("TutorialCanvas");
            go.transform.SetParent(transform, false);
            _canvas = go.AddComponent<Canvas>();
            _canvas.renderMode   = RenderMode.ScreenSpaceOverlay;
            _canvas.sortingOrder = 300;
            go.AddComponent<CanvasScaler>().uiScaleMode =
                CanvasScaler.ScaleMode.ScaleWithScreenSize;
            go.AddComponent<GraphicRaycaster>();

            _panel = new GameObject("TutorialPanel");
            _panel.transform.SetParent(go.transform, false);
            var img = _panel.AddComponent<Image>();
            img.color = new Color(0.05f, 0.05f, 0.15f, 0.95f);
            var rt = _panel.GetComponent<RectTransform>();
            rt.anchorMin = new Vector2(0.5f, 0f);
            rt.anchorMax = new Vector2(0.5f, 0f);
            rt.pivot     = new Vector2(0.5f, 0f);
            rt.anchoredPosition = new Vector2(0f, 160f);
            rt.sizeDelta = new Vector2(600f, 160f);

            _titleTxt = AddText(_panel.transform, "Title", 24f,
                new Vector2(0f, 55f), new Vector2(560f, 36f),
                new Color(1f, 0.85f, 0.15f), FontStyles.Bold);

            _bodyTxt = AddText(_panel.transform, "Body", 18f,
                new Vector2(0f, 5f), new Vector2(560f, 80f),
                Color.white);

            _stepTxt = AddText(_panel.transform, "Step", 14f,
                new Vector2(240f, -55f), new Vector2(100f, 24f),
                new Color(0.7f, 0.7f, 0.7f));

            // Next button
            var btnGO = new GameObject("NextBtn");
            btnGO.transform.SetParent(_panel.transform, false);
            var btnImg = btnGO.AddComponent<Image>();
            btnImg.color = new Color(0.2f, 0.6f, 0.2f);
            var btn = btnGO.AddComponent<Button>();
            btn.onClick.AddListener(NextStep);
            var btnRT = btnGO.GetComponent<RectTransform>();
            btnRT.anchorMin = btnRT.anchorMax = new Vector2(0.5f, 0.5f);
            btnRT.anchoredPosition = new Vector2(220f, -55f);
            btnRT.sizeDelta = new Vector2(100f, 32f);
            var btnLbl = new GameObject("Lbl");
            btnLbl.transform.SetParent(btnGO.transform, false);
            var btnTxt = btnLbl.AddComponent<TextMeshProUGUI>();
            btnTxt.text = "NEXT ▶";
            btnTxt.fontSize = 16f;
            btnTxt.color = Color.white;
            btnTxt.alignment = TextAlignmentOptions.Center;
            var btnLblRT = btnTxt.rectTransform;
            btnLblRT.anchorMin = Vector2.zero;
            btnLblRT.anchorMax = Vector2.one;
            btnLblRT.offsetMin = btnLblRT.offsetMax = Vector2.zero;

            // Skip button
            var skipGO = new GameObject("SkipBtn");
            skipGO.transform.SetParent(_panel.transform, false);
            var skipImg = skipGO.AddComponent<Image>();
            skipImg.color = new Color(0.3f, 0.3f, 0.3f, 0.8f);
            var skipBtn = skipGO.AddComponent<Button>();
            skipBtn.onClick.AddListener(SkipTutorial);
            var skipRT = skipGO.GetComponent<RectTransform>();
            skipRT.anchorMin = skipRT.anchorMax = new Vector2(0.5f, 0.5f);
            skipRT.anchoredPosition = new Vector2(-220f, -55f);
            skipRT.sizeDelta = new Vector2(80f, 28f);
            var skipLbl = new GameObject("Lbl");
            skipLbl.transform.SetParent(skipGO.transform, false);
            var skipTxt = skipLbl.AddComponent<TextMeshProUGUI>();
            skipTxt.text = "SKIP";
            skipTxt.fontSize = 14f;
            skipTxt.color = new Color(0.7f, 0.7f, 0.7f);
            skipTxt.alignment = TextAlignmentOptions.Center;
            var skipLblRT = skipTxt.rectTransform;
            skipLblRT.anchorMin = Vector2.zero;
            skipLblRT.anchorMax = Vector2.one;
            skipLblRT.offsetMin = skipLblRT.offsetMax = Vector2.zero;
        }

        TextMeshProUGUI AddText(Transform parent, string name, float size,
            Vector2 pos, Vector2 sizeDelta, Color color,
            FontStyles style = FontStyles.Normal)
        {
            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            var tmp = go.AddComponent<TextMeshProUGUI>();
            tmp.fontSize  = size;
            tmp.color     = color;
            tmp.fontStyle = style;
            tmp.alignment = TextAlignmentOptions.Center;
            var rt = go.GetComponent<RectTransform>();
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 0.5f);
            rt.anchoredPosition = pos;
            rt.sizeDelta = sizeDelta;
            return tmp;
        }
    }
}
