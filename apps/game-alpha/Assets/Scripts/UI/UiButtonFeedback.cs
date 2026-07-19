using System.Collections;
using UnityEngine;
using UnityEngine.EventSystems;

/// <summary>Subtle web-style press + release scale on UI buttons.</summary>
[RequireComponent(typeof(RectTransform))]
public class UiButtonFeedback : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerExitHandler
{
    public float pressedScale = 0.94f;
    public float animSpeed = 18f;

    RectTransform _rt;
    Vector3 _base;

    void Awake()
    {
        _rt = GetComponent<RectTransform>();
        _base = _rt.localScale;
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        StopAllCoroutines();
        StartCoroutine(ScaleTo(_base * pressedScale));
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        StopAllCoroutines();
        StartCoroutine(ScaleTo(_base));
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        StopAllCoroutines();
        StartCoroutine(ScaleTo(_base));
    }

    IEnumerator ScaleTo(Vector3 target)
    {
        while (Vector3.Distance(_rt.localScale, target) > 0.001f)
        {
            _rt.localScale = Vector3.Lerp(_rt.localScale, target, Time.unscaledDeltaTime * animSpeed);
            yield return null;
        }
        _rt.localScale = target;
    }
}
