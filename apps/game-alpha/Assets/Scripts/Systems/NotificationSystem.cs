using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Lifetopia.Systems
{
    /// <summary>
    /// Toast notification system — muncul di layar, auto-dismiss.
    /// Tidak butuh plugin.
    /// </summary>
    public class NotificationSystem : MonoBehaviour
    {
        public static NotificationSystem Instance { get; private set; }

        [Header("Settings")]
        public float displayDuration = 2.5f;
        public float fadeDuration    = 0.3f;
        public int   maxVisible      = 3;

        readonly Queue<string> _queue = new Queue<string>();
        readonly List<GameObject> _active = new List<GameObject>();

        Canvas _canvas;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            BuildCanvas();
        }

        void BuildCanvas()
        {
            var go = new GameObject("NotificationCanvas");
            go.transform.SetParent(transform, false);
            _canvas = go.AddComponent<Canvas>();
            _canvas.renderMode  = RenderMode.ScreenSpaceOverlay;
            _canvas.sortingOrder = 500;
            go.AddComponent<CanvasScaler>().uiScaleMode =
                CanvasScaler.ScaleMode.ScaleWithScreenSize;
            go.AddComponent<GraphicRaycaster>();
        }

        public void Show(string message, Color? color = null)
        {
            if (_active.Count >= maxVisible) { _queue.Enqueue(message); return; }
            StartCoroutine(ShowToast(message, color ?? new Color(0.1f, 0.1f, 0.1f, 0.9f)));
        }

        public void ShowGold(int amount)   => Show($"+{amount} GOLD 🪙", new Color(1f, 0.85f, 0.1f));
        public void ShowXP(int amount)     => Show($"+{amount} XP ⭐", new Color(0.4f, 0.8f, 1f));
        public void ShowError(string msg)  => Show("❌ " + msg, new Color(0.9f, 0.2f, 0.2f));
        public void ShowSuccess(string msg)=> Show("✅ " + msg, new Color(0.2f, 0.8f, 0.3f));

        IEnumerator ShowToast(string message, Color bgColor)
        {
            // Build toast
            var go = new GameObject("Toast");
            go.transform.SetParent(_canvas.transform, false);
            _active.Add(go);

            var img = go.AddComponent<Image>();
            img.color = bgColor;

            var rt = go.GetComponent<RectTransform>();
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 0f);
            rt.pivot     = new Vector2(0.5f, 0f);
            rt.sizeDelta = new Vector2(400f, 50f);
            rt.anchoredPosition = new Vector2(0f, 80f + _active.Count * 60f);

            var txtGo = new GameObject("Text");
            txtGo.transform.SetParent(go.transform, false);
            var txt = txtGo.AddComponent<TextMeshProUGUI>();
            txt.text      = message;
            txt.fontSize  = 20f;
            txt.color     = Color.white;
            txt.alignment = TextAlignmentOptions.Center;
            var txtr = txt.rectTransform;
            txtr.anchorMin = Vector2.zero;
            txtr.anchorMax = Vector2.one;
            txtr.offsetMin = txtr.offsetMax = Vector2.zero;

            var cg = go.AddComponent<CanvasGroup>();

            // Fade in
            yield return Fade(cg, 0f, 1f, fadeDuration);
            yield return new WaitForSeconds(displayDuration);
            // Fade out
            yield return Fade(cg, 1f, 0f, fadeDuration);

            _active.Remove(go);
            Destroy(go);

            if (_queue.Count > 0)
                StartCoroutine(ShowToast(_queue.Dequeue(), bgColor));
        }

        IEnumerator Fade(CanvasGroup cg, float from, float to, float dur)
        {
            float t = 0f;
            cg.alpha = from;
            while (t < dur)
            {
                t += Time.deltaTime;
                cg.alpha = Mathf.Lerp(from, to, t / dur);
                yield return null;
            }
            cg.alpha = to;
        }
    }
}
