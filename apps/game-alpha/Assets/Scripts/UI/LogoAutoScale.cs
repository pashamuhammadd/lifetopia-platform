using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Auto-scales a logo Image to fit the screen while maintaining aspect ratio.
/// Attach to the Logo GameObject (must have RectTransform + Image).
/// </summary>
[RequireComponent(typeof(RectTransform))]
public class LogoAutoScale : MonoBehaviour
{
    [Header("Scale Settings")]
    [Tooltip("Percentage of screen width the logo should occupy (0.0 - 1.0)")]
    [Range(0.05f, 1f)]
    public float targetScreenWidthRatio = 0.25f;

    [Tooltip("Maximum logo height as percentage of screen height")]
    [Range(0.05f, 1f)]
    public float maxScreenHeightRatio = 0.20f;

    [Tooltip("Animate scale on start (bounce effect)")]
    public bool animateOnStart = true;

    [Tooltip("Duration of bounce animation in seconds")]
    public float animationDuration = 0.6f;

    private RectTransform _rect;
    private Vector2 _targetSize;
    private bool _isAnimating = false;
    private float _animTimer = 0f;
    private Vector2 _startSize;

    void Awake()
    {
        _rect = GetComponent<RectTransform>();
    }

    void Start()
    {
        ApplyScale();

        if (animateOnStart)
        {
            _startSize = Vector2.zero;
            _rect.sizeDelta = _startSize;
            _isAnimating = true;
            _animTimer = 0f;
        }
    }

    void Update()
    {
        if (_isAnimating)
        {
            _animTimer += Time.deltaTime;
            float t = Mathf.Clamp01(_animTimer / animationDuration);

            // Bounce easing
            float easedT = BounceEaseOut(t);
            _rect.sizeDelta = Vector2.Lerp(_startSize, _targetSize, easedT);

            if (t >= 1f)
                _isAnimating = false;
        }
    }

    /// <summary>
    /// Recalculates and applies the logo scale based on current screen size.
    /// Call this if screen resolution changes at runtime.
    /// </summary>
    public void ApplyScale()
    {
        if (_rect == null) _rect = GetComponent<RectTransform>();

        // Try to get native sprite size from Image component
        Image img = GetComponent<Image>();
        float aspectRatio = 1f;

        if (img != null && img.sprite != null)
        {
            float spriteW = img.sprite.rect.width;
            float spriteH = img.sprite.rect.height;
            aspectRatio = spriteW / spriteH;
        }

        float screenW = Screen.width;
        float screenH = Screen.height;

        float desiredWidth = screenW * targetScreenWidthRatio;
        float desiredHeight = desiredWidth / aspectRatio;

        // Clamp height
        float maxHeight = screenH * maxScreenHeightRatio;
        if (desiredHeight > maxHeight)
        {
            desiredHeight = maxHeight;
            desiredWidth = desiredHeight * aspectRatio;
        }

        _targetSize = new Vector2(desiredWidth, desiredHeight);
        _rect.sizeDelta = _targetSize;
    }

    // Simple bounce easing function
    private float BounceEaseOut(float t)
    {
        if (t < 1f / 2.75f)
            return 7.5625f * t * t;
        else if (t < 2f / 2.75f)
        {
            t -= 1.5f / 2.75f;
            return 7.5625f * t * t + 0.75f;
        }
        else if (t < 2.5f / 2.75f)
        {
            t -= 2.25f / 2.75f;
            return 7.5625f * t * t + 0.9375f;
        }
        else
        {
            t -= 2.625f / 2.75f;
            return 7.5625f * t * t + 0.984375f;
        }
    }

#if UNITY_EDITOR
    void OnValidate()
    {
        if (Application.isPlaying) return;
        if (_rect == null) _rect = GetComponent<RectTransform>();
        ApplyScale();
    }
#endif
}
