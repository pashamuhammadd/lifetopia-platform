using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.EventSystems;

/// <summary>
/// Data satu lokasi di peta.
/// Attach ke setiap titik lokasi, atau dikelola oleh MapLabelManager.
/// </summary>
public class MapLocationLabel : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [Header("Data Lokasi")]
    public string locationName = "CITY";
    public string sceneName    = "";          // scene yang di-load saat diklik
    public bool   isUnlocked   = true;

    [Header("Label UI (auto-assigned oleh MapLabelManager)")]
    public RectTransform labelRect;
    public TextMeshProUGUI labelText;
    public Image           labelBackground;
    public Image           lockIcon;

    [Header("Hover Effect")]
    public float hoverScaleMultiplier = 1.15f;
    public float hoverAnimSpeed       = 8f;

    // Events
    public System.Action<MapLocationLabel> OnLocationClicked;

    private Vector3 _baseScale;
    private Vector3 _targetScale;
    private bool    _isHovered = false;

    void Awake()
    {
        _baseScale   = transform.localScale;
        _targetScale = _baseScale;
    }

    void Update()
    {
        // Smooth hover scale
        transform.localScale = Vector3.Lerp(
            transform.localScale,
            _targetScale,
            Time.deltaTime * hoverAnimSpeed
        );
    }

    public void OnPointerEnter(PointerEventData e)
    {
        _isHovered   = true;
        _targetScale = _baseScale * hoverScaleMultiplier;
        if (labelText) labelText.color = Color.white;
    }

    public void OnPointerExit(PointerEventData e)
    {
        _isHovered   = false;
        _targetScale = _baseScale;
        RefreshLabelColor();
    }

    public void OnPointerClick(PointerEventData e)
    {
        if (!isUnlocked) return;
        OnLocationClicked?.Invoke(this);
    }

    public void RefreshLabelColor()
    {
        if (labelText == null) return;
        labelText.color = isUnlocked
            ? new Color(1f, 0.92f, 0.2f)   // golden
            : new Color(0.5f, 0.5f, 0.5f); // abu-abu = locked
    }

    public void SetUnlocked(bool unlocked)
    {
        isUnlocked = unlocked;
        if (lockIcon)    lockIcon.gameObject.SetActive(!unlocked);
        RefreshLabelColor();
    }
}
