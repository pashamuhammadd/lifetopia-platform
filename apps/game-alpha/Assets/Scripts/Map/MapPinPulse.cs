using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Efek pulse/glow pada pin lokasi di peta.
/// Attach ke GameObject dot/pin tiap lokasi.
/// Membuat lingkaran ripple yang mengembang dan fade out — seperti sinyal.
/// </summary>
public class MapPinPulse : MonoBehaviour
{
    [Header("Pulse Settings")]
    public float pulseInterval  = 1.8f;   // jeda antar pulse
    public float pulseDuration  = 0.8f;   // durasi satu pulse mengembang
    public float pulseMaxScale  = 2.5f;   // seberapa besar pulse mengembang
    public Color pulseColor     = new Color(1f, 0.9f, 0.2f, 0.6f);

    [Header("Pin Bounce")]
    public bool  doBounce       = true;
    public float bounceHeight   = 6f;
    public float bounceSpeed    = 2f;

    private Image      _pulseRing;
    private RectTransform _pulseRect;
    private float      _pulseTimer = 0f;
    private bool       _isPulsing  = false;
    private float      _pulseProgress = 0f;
    private Vector2    _basePos;

    void Start()
    {
        _basePos = GetComponent<RectTransform>().anchoredPosition;
        CreatePulseRing();
    }

    void Update()
    {
        HandlePulseTimer();
        if (doBounce) HandleBounce();
    }

    private void CreatePulseRing()
    {
        GameObject ringGO = new GameObject("PulseRing");
        ringGO.transform.SetParent(transform, false);
        ringGO.transform.SetAsFirstSibling(); // di belakang dot

        _pulseRing = ringGO.AddComponent<Image>();
        _pulseRing.color = pulseColor;
        _pulseRing.raycastTarget = false;

        _pulseRect = ringGO.GetComponent<RectTransform>();
        _pulseRect.anchorMin        = new Vector2(0.5f, 0.5f);
        _pulseRect.anchorMax        = new Vector2(0.5f, 0.5f);
        _pulseRect.anchoredPosition = Vector2.zero;
        _pulseRect.sizeDelta        = new Vector2(20f, 20f); // sama dengan dot

        _pulseRect.localScale = Vector3.one;
        SetPulseAlpha(0f);
    }

    private void HandlePulseTimer()
    {
        _pulseTimer += Time.deltaTime;

        if (!_isPulsing && _pulseTimer >= pulseInterval)
        {
            _isPulsing    = true;
            _pulseTimer   = 0f;
            _pulseProgress = 0f;
        }

        if (_isPulsing)
        {
            _pulseProgress += Time.deltaTime / pulseDuration;

            if (_pulseProgress >= 1f)
            {
                _isPulsing = false;
                _pulseRect.localScale = Vector3.one;
                SetPulseAlpha(0f);
                return;
            }

            // Scale mengembang
            float scale = Mathf.Lerp(1f, pulseMaxScale, _pulseProgress);
            _pulseRect.localScale = Vector3.one * scale;

            // Alpha fade out
            float alpha = Mathf.Lerp(pulseColor.a, 0f, _pulseProgress);
            SetPulseAlpha(alpha);
        }
    }

    private void HandleBounce()
    {
        RectTransform rt = GetComponent<RectTransform>();
        float offsetY = Mathf.Sin(Time.time * bounceSpeed) * bounceHeight;
        rt.anchoredPosition = _basePos + new Vector2(0f, offsetY);
    }

    private void SetPulseAlpha(float alpha)
    {
        if (_pulseRing == null) return;
        Color c = _pulseRing.color;
        c.a = alpha;
        _pulseRing.color = c;
    }
}
