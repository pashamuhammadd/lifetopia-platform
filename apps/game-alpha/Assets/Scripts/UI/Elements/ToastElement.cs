using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Lifetopia.UI.Elements
{
    /// <summary>Single toast notification element.</summary>
    public class ToastElement : MonoBehaviour
    {
        public TextMeshProUGUI label;
        public Image           background;
        public CanvasGroup     group;

        public void Setup(string message, Color bgColor)
        {
            if (label)      label.text  = message;
            if (background) background.color = bgColor;
            if (group)      group.alpha = 0f;
        }

        public IEnumerator Show(float displayDuration, float fadeDuration)
        {
            yield return Fade(0f, 1f, fadeDuration);
            yield return new WaitForSeconds(displayDuration);
            yield return Fade(1f, 0f, fadeDuration);
            Destroy(gameObject);
        }

        IEnumerator Fade(float from, float to, float dur)
        {
            if (group == null) yield break;
            float t = 0f;
            group.alpha = from;
            while (t < dur)
            {
                t += Time.deltaTime;
                group.alpha = Mathf.Lerp(from, to, t / dur);
                yield return null;
            }
            group.alpha = to;
        }
    }
}
