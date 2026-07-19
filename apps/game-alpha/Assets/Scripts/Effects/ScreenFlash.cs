using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Lifetopia.Effects
{
    /// <summary>
    /// Full-screen flash effect — untuk damage, level up, dll.
    /// Auto-spawn canvas overlay.
    /// </summary>
    public class ScreenFlash : MonoBehaviour
    {
        public static ScreenFlash Instance { get; private set; }

        Image      _flashImage;
        Canvas     _canvas;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            BuildOverlay();
        }

        void BuildOverlay()
        {
            var go = new GameObject("FlashCanvas");
            go.transform.SetParent(transform, false);
            _canvas = go.AddComponent<Canvas>();
            _canvas.renderMode   = RenderMode.ScreenSpaceOverlay;
            _canvas.sortingOrder = 9997;
            go.AddComponent<CanvasScaler>();

            var imgGO = new GameObject("FlashImage");
            imgGO.transform.SetParent(go.transform, false);
            _flashImage = imgGO.AddComponent<Image>();
            _flashImage.color = new Color(1f, 1f, 1f, 0f);
            _flashImage.raycastTarget = false;
            var rt = _flashImage.rectTransform;
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = rt.offsetMax = Vector2.zero;
        }

        public void Flash(Color color, float duration = 0.2f) =>
            StartCoroutine(FlashRoutine(color, duration));

        public void FlashWhite()  => Flash(new Color(1f, 1f, 1f, 0.6f));
        public void FlashRed()    => Flash(new Color(1f, 0f, 0f, 0.4f));
        public void FlashGold()   => Flash(new Color(1f, 0.85f, 0.1f, 0.5f));
        public void FlashGreen()  => Flash(new Color(0.2f, 0.9f, 0.2f, 0.4f));

        IEnumerator FlashRoutine(Color color, float duration)
        {
            if (_flashImage == null) yield break;
            _flashImage.color = color;
            float t = 0f;
            Color start = color;
            Color end   = new Color(color.r, color.g, color.b, 0f);
            while (t < duration)
            {
                t += Time.unscaledDeltaTime;
                _flashImage.color = Color.Lerp(start, end, t / duration);
                yield return null;
            }
            _flashImage.color = end;
        }
    }
}
