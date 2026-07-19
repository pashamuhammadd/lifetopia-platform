using System.Collections;
using UnityEngine;
using UnityEngine.UI;

namespace Lifetopia.Effects
{
    /// <summary>
    /// Spawn partikel UI (canvas-based) dan world-space.
    /// Tidak butuh plugin — pakai Image + coroutine.
    /// </summary>
    public static class ParticleSpawner
    {
        /// <summary>Spawn partikel golden di canvas (untuk reward effect).</summary>
        public static void SpawnGoldBurst(Transform canvasParent, Vector2 position,
            int count = 20, Color? color = null)
        {
            Color c = color ?? new Color(1f, 0.85f, 0.1f, 0.9f);
            for (int i = 0; i < count; i++)
            {
                var go = new GameObject("GoldParticle");
                go.transform.SetParent(canvasParent, false);

                var img = go.AddComponent<Image>();
                img.color = c;

                float size = Random.Range(4f, 12f);
                var rt = go.GetComponent<RectTransform>();
                rt.sizeDelta        = new Vector2(size, size);
                rt.anchorMin        = rt.anchorMax = new Vector2(0.5f, 0.5f);
                rt.anchoredPosition = position;

                var mono = canvasParent.GetComponent<MonoBehaviour>() ??
                           canvasParent.gameObject.AddComponent<EffectRunner>();
                mono.StartCoroutine(AnimateParticle(rt, img, c));
            }
        }

        static IEnumerator AnimateParticle(RectTransform rt, Image img, Color baseColor)
        {
            float life   = Random.Range(0.6f, 1.4f);
            float speedX = Random.Range(-80f, 80f);
            float speedY = Random.Range(40f, 140f);
            float t      = 0f;
            Vector2 start = rt.anchoredPosition;

            while (t < life)
            {
                t += Time.deltaTime;
                float p = t / life;
                rt.anchoredPosition = start + new Vector2(speedX * t, speedY * t - 200f * t * t);
                Color c = img.color;
                c.a = Mathf.Lerp(baseColor.a, 0f, p);
                img.color = c;
                yield return null;
            }
            if (rt != null) Object.Destroy(rt.gameObject);
        }
    }

    // Helper MonoBehaviour untuk StartCoroutine
    public class EffectRunner : MonoBehaviour { }
}
