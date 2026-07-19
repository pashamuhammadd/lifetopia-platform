using System;
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using Lifetopia.Events;

namespace Lifetopia.LoadSystem
{
    /// <summary>
    /// Async scene loader dengan fade transition dan loading progress.
    /// </summary>
    public class SceneLoader : MonoBehaviour
    {
        public static SceneLoader Instance { get; private set; }

        [Header("Fade")]
        public float fadeDuration = 0.4f;

        public bool  IsLoading   { get; private set; }
        public float Progress    { get; private set; }

        public event Action<string> OnSceneLoadStarted;
        public event Action<string> OnSceneLoadComplete;
        public event Action<float>  OnLoadProgress;

        UnityEngine.UI.Image _fadeImage;
        bool _busy;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            BuildFadeOverlay();
        }

        void BuildFadeOverlay()
        {
            var go     = new GameObject("FadeOverlay");
            go.transform.SetParent(transform, false);
            var canvas = go.AddComponent<Canvas>();
            canvas.renderMode  = RenderMode.ScreenSpaceOverlay;
            canvas.sortingOrder = 9998;
            go.AddComponent<UnityEngine.UI.CanvasScaler>();
            go.AddComponent<UnityEngine.UI.GraphicRaycaster>();

            var imgGo  = new GameObject("FadeImage");
            imgGo.transform.SetParent(go.transform, false);
            _fadeImage = imgGo.AddComponent<UnityEngine.UI.Image>();
            _fadeImage.color = new Color(0, 0, 0, 0);
            _fadeImage.raycastTarget = true;
            var rt = _fadeImage.rectTransform;
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = rt.offsetMax = Vector2.zero;
        }

        public void LoadScene(string sceneName)
        {
            if (_busy) return;
            StartCoroutine(LoadRoutine(sceneName));
        }

        IEnumerator LoadRoutine(string sceneName)
        {
            _busy     = true;
            IsLoading = true;
            OnSceneLoadStarted?.Invoke(sceneName);

            yield return Fade(0f, 1f);

            var op = SceneManager.LoadSceneAsync(sceneName);
            op.allowSceneActivation = false;

            while (op.progress < 0.9f)
            {
                Progress = op.progress;
                OnLoadProgress?.Invoke(Progress);
                yield return null;
            }

            Progress = 1f;
            OnLoadProgress?.Invoke(1f);
            op.allowSceneActivation = true;
            while (!op.isDone) yield return null;

            yield return Fade(1f, 0f);

            IsLoading = false;
            _busy     = false;
            OnSceneLoadComplete?.Invoke(sceneName);
        }

        IEnumerator Fade(float from, float to)
        {
            float t = 0f;
            Color c = _fadeImage.color;
            while (t < fadeDuration)
            {
                t += Time.unscaledDeltaTime;
                c.a = Mathf.Lerp(from, to, Mathf.Clamp01(t / fadeDuration));
                _fadeImage.color = c;
                yield return null;
            }
            c.a = to;
            _fadeImage.color = c;
        }
    }
}
