using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Lifetopia.UI.Elements
{
    /// <summary>Reusable progress bar — HP, XP, grow timer, dll.</summary>
    public class ProgressBar : MonoBehaviour
    {
        [Header("References")]
        public Image           fillImage;
        public TextMeshProUGUI labelText;
        public TextMeshProUGUI valueText;

        [Header("Colors")]
        public Color colorFull    = new Color(0.2f, 0.8f, 0.2f);
        public Color colorMid     = new Color(0.9f, 0.7f, 0.1f);
        public Color colorLow     = new Color(0.9f, 0.2f, 0.2f);

        [Header("Smooth")]
        public bool  smoothFill   = true;
        public float smoothSpeed  = 5f;

        float _targetFill;

        void Update()
        {
            if (!smoothFill || fillImage == null) return;
            fillImage.fillAmount = Mathf.Lerp(
                fillImage.fillAmount, _targetFill, smoothSpeed * Time.deltaTime);
        }

        public void SetValue(float current, float max, string label = "")
        {
            float ratio = max > 0 ? Mathf.Clamp01(current / max) : 0f;
            _targetFill = ratio;

            if (!smoothFill && fillImage != null)
                fillImage.fillAmount = ratio;

            if (fillImage != null)
                fillImage.color = ratio > 0.5f ? colorFull :
                                  ratio > 0.25f ? colorMid : colorLow;

            if (labelText != null && !string.IsNullOrEmpty(label))
                labelText.text = label;

            if (valueText != null)
                valueText.text = $"{(int)current}/{(int)max}";
        }

        public void SetRatio(float ratio, string label = "") =>
            SetValue(ratio, 1f, label);

        public void SetLabel(string text)
        {
            if (labelText != null) labelText.text = text;
        }
    }
}
