using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

/// <summary>Fade transition + async load. Safe for WebGL.</summary>
public class SceneTransitionManager : MonoBehaviour
{
    public static SceneTransitionManager Instance { get; private set; }

    [SerializeField] float fadeDuration = 0.45f;
    Canvas _overlayCanvas;
    Image _fadeImage;
    bool _busy;

    void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject);
        EnsureOverlay();
    }

    void EnsureOverlay()
    {
        if (_overlayCanvas != null) return;

        GameObject go = new GameObject("SceneTransitionOverlay");
        go.transform.SetParent(transform, false);
        _overlayCanvas = go.AddComponent<Canvas>();
        _overlayCanvas.renderMode = RenderMode.ScreenSpaceOverlay;
        _overlayCanvas.sortingOrder = 9999;
        go.AddComponent<GraphicRaycaster>();

        GameObject imgGo = new GameObject("Fade");
        imgGo.transform.SetParent(go.transform, false);
        _fadeImage = imgGo.AddComponent<Image>();
        _fadeImage.color = new Color(0f, 0f, 0f, 0f);
        _fadeImage.raycastTarget = true;
        RectTransform rt = _fadeImage.rectTransform;
        rt.anchorMin = Vector2.zero;
        rt.anchorMax = Vector2.one;
        rt.offsetMin = Vector2.zero;
        rt.offsetMax = Vector2.zero;
    }

    public void LoadScene(string sceneName)
    {
        if (_busy || string.IsNullOrEmpty(sceneName)) return;
        StartCoroutine(LoadRoutine(sceneName));
    }

    IEnumerator LoadRoutine(string sceneName)
    {
        _busy = true;
        EnsureOverlay();
        _overlayCanvas.gameObject.SetActive(true);

        yield return Fade(0f, 1f, fadeDuration);

        AsyncOperation op = SceneManager.LoadSceneAsync(sceneName);
        while (!op.isDone) yield return null;

        yield return Fade(1f, 0f, fadeDuration);
        _overlayCanvas.gameObject.SetActive(false);
        _busy = false;
    }

    IEnumerator Fade(float from, float to, float dur)
    {
        float t = 0f;
        Color c = _fadeImage.color;
        while (t < dur)
        {
            t += Time.unscaledDeltaTime;
            float a = Mathf.Lerp(from, to, Mathf.Clamp01(t / dur));
            c.a = a;
            _fadeImage.color = c;
            yield return null;
        }
        c.a = to;
        _fadeImage.color = c;
    }
}
