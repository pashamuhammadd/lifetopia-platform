using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Lifetopia.UI.Animations
{
    /// <summary>
    /// Reusable UI animations — fade, slide, bounce, scale.
    /// Semua coroutine-based, tidak butuh DOTween.
    /// </summary>
    public static class UIAnimator
    {
        // ── Fade ──────────────────────────────────────────────────────────────

        public static IEnumerator FadeIn(CanvasGroup cg, float duration = 0.3f)
            => Fade(cg, 0f, 1f, duration);

        public static IEnumerator FadeOut(CanvasGroup cg, float duration = 0.3f)
            => Fade(cg, 1f, 0f, duration);

        public static IEnumerator Fade(CanvasGroup cg, float from, float to, float dur)
        {
            if (cg == null) yield break;
            float t = 0f;
            cg.alpha = from;
            while (t < dur)
            {
                t += Time.unscaledDeltaTime;
                cg.alpha = Mathf.Lerp(from, to, Mathf.Clamp01(t / dur));
                yield return null;
            }
            cg.alpha = to;
        }

        // ── Scale ─────────────────────────────────────────────────────────────

        public static IEnumerator ScaleBounceIn(RectTransform rt, float duration = 0.4f)
        {
            if (rt == null) yield break;
            float t = 0f;
            rt.localScale = Vector3.zero;
            while (t < duration)
            {
                t += Time.unscaledDeltaTime;
                float p = Mathf.Clamp01(t / duration);
                float s = BounceEaseOut(p);
                rt.localScale = Vector3.one * s;
                yield return null;
            }
            rt.localScale = Vector3.one;
        }

        public static IEnumerator ScaleOut(RectTransform rt, float duration = 0.2f)
        {
            if (rt == null) yield break;
            float t = 0f;
            Vector3 start = rt.localScale;
            while (t < duration)
            {
                t += Time.unscaledDeltaTime;
                rt.localScale = Vector3.Lerp(start, Vector3.zero,
                    Mathf.Clamp01(t / duration));
                yield return null;
            }
            rt.localScale = Vector3.zero;
        }

        // ── Slide ─────────────────────────────────────────────────────────────

        public static IEnumerator SlideIn(RectTransform rt,
            Vector2 from, Vector2 to, float duration = 0.35f)
        {
            if (rt == null) yield break;
            float t = 0f;
            rt.anchoredPosition = from;
            while (t < duration)
            {
                t += Time.unscaledDeltaTime;
                float p = CubicEaseOut(Mathf.Clamp01(t / duration));
                rt.anchoredPosition = Vector2.Lerp(from, to, p);
                yield return null;
            }
            rt.anchoredPosition = to;
        }

        // ── Shake ─────────────────────────────────────────────────────────────

        public static IEnumerator Shake(RectTransform rt,
            float duration = 0.3f, float magnitude = 8f)
        {
            if (rt == null) yield break;
            Vector2 origin = rt.anchoredPosition;
            float t = 0f;
            while (t < duration)
            {
                t += Time.unscaledDeltaTime;
                float damp = 1f - (t / duration);
                rt.anchoredPosition = origin +
                    Random.insideUnitCircle * magnitude * damp;
                yield return null;
            }
            rt.anchoredPosition = origin;
        }

        // ── Pulse ─────────────────────────────────────────────────────────────

        public static IEnumerator Pulse(RectTransform rt,
            float scale = 1.15f, float duration = 0.25f)
        {
            if (rt == null) yield break;
            Vector3 original = rt.localScale;
            float half = duration * 0.5f;

            float t = 0f;
            while (t < half)
            {
                t += Time.unscaledDeltaTime;
                rt.localScale = Vector3.Lerp(original, original * scale,
                    Mathf.Clamp01(t / half));
                yield return null;
            }
            t = 0f;
            while (t < half)
            {
                t += Time.unscaledDeltaTime;
                rt.localScale = Vector3.Lerp(original * scale, original,
                    Mathf.Clamp01(t / half));
                yield return null;
            }
            rt.localScale = original;
        }

        // ── Color Flash ───────────────────────────────────────────────────────

        public static IEnumerator FlashColor(Image img, Color flashColor,
            float duration = 0.2f)
        {
            if (img == null) yield break;
            Color original = img.color;
            img.color = flashColor;
            yield return new WaitForSecondsRealtime(duration);
            img.color = original;
        }

        // ── Easing ────────────────────────────────────────────────────────────

        static float BounceEaseOut(float t)
        {
            if (t < 1f / 2.75f) return 7.5625f * t * t;
            if (t < 2f / 2.75f) { t -= 1.5f / 2.75f;  return 7.5625f * t * t + 0.75f; }
            if (t < 2.5f / 2.75f){ t -= 2.25f / 2.75f; return 7.5625f * t * t + 0.9375f; }
            t -= 2.625f / 2.75f;
            return 7.5625f * t * t + 0.984375f;
        }

        static float CubicEaseOut(float t) => 1f - Mathf.Pow(1f - t, 3f);
    }
}
