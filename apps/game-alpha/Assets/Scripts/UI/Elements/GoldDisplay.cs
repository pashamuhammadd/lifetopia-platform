using UnityEngine;
using UnityEngine.UI;
using TMPro;
using Lifetopia.Events;
using Lifetopia.Systems;

namespace Lifetopia.UI.Elements
{
    /// <summary>
    /// Gold display widget — auto-update saat gold berubah.
    /// Attach ke Canvas, auto-build UI.
    /// </summary>
    public class GoldDisplay : MonoBehaviour
    {
        [Header("Style")]
        public Color textColor  = new Color(1f, 0.85f, 0.15f);
        public float fontSize   = 22f;

        TextMeshProUGUI _label;
        RectTransform   _rt;

        void Awake()
        {
            BuildUI();
            GameEventBus.Subscribe<GoldChangedEvent>(OnGoldChanged);
        }

        void OnDestroy() =>
            GameEventBus.Unsubscribe<GoldChangedEvent>(OnGoldChanged);

        void Start() => Refresh();

        void OnGoldChanged(GoldChangedEvent e)
        {
            Refresh(e.NewValue);
            StartCoroutine(PulseRoutine());
        }

        void Refresh(int? gold = null)
        {
            int g = gold ?? EconomySystem.Instance?.Gold ?? 0;
            if (_label != null)
                _label.text = Utils.StringUtils.FormatGold(g);
        }

        System.Collections.IEnumerator PulseRoutine()
        {
            if (_rt == null) yield break;
            Vector3 orig = _rt.localScale;
            float t = 0f;
            while (t < 0.15f)
            {
                t += Time.deltaTime;
                _rt.localScale = orig * Mathf.Lerp(1f, 1.2f, t / 0.15f);
                yield return null;
            }
            t = 0f;
            while (t < 0.15f)
            {
                t += Time.deltaTime;
                _rt.localScale = orig * Mathf.Lerp(1.2f, 1f, t / 0.15f);
                yield return null;
            }
            _rt.localScale = orig;
        }

        void BuildUI()
        {
            _rt = GetComponent<RectTransform>() ?? gameObject.AddComponent<RectTransform>();

            var bg = gameObject.AddComponent<Image>();
            bg.color = new Color(0f, 0f, 0f, 0.5f);

            var lblGO = new GameObject("GoldLabel");
            lblGO.transform.SetParent(transform, false);
            _label = lblGO.AddComponent<TextMeshProUGUI>();
            _label.fontSize  = fontSize;
            _label.color     = textColor;
            _label.fontStyle = FontStyles.Bold;
            _label.alignment = TextAlignmentOptions.Center;
            var lblRT = _label.rectTransform;
            lblRT.anchorMin = Vector2.zero;
            lblRT.anchorMax = Vector2.one;
            lblRT.offsetMin = new Vector2(8f, 4f);
            lblRT.offsetMax = new Vector2(-8f, -4f);
        }
    }
}
