using System.Collections;
using UnityEngine;

namespace Lifetopia.Camera
{
    /// <summary>
    /// Smooth camera zoom untuk orthographic camera.
    /// Attach ke Camera.
    /// </summary>
    [RequireComponent(typeof(UnityEngine.Camera))]
    public class CameraZoom : MonoBehaviour
    {
        public static CameraZoom Instance { get; private set; }

        [Header("Settings")]
        public float defaultSize  = 5f;
        public float minSize      = 2f;
        public float maxSize      = 12f;
        public float zoomSpeed    = 3f;

        UnityEngine.Camera _cam;
        float              _targetSize;
        Coroutine          _zoomCoroutine;

        void Awake()
        {
            if (Instance != null && Instance != this) return;
            Instance = this;
            _cam = GetComponent<UnityEngine.Camera>();
            _targetSize = defaultSize;
        }

        void Update()
        {
            if (!Mathf.Approximately(_cam.orthographicSize, _targetSize))
                _cam.orthographicSize = Mathf.Lerp(
                    _cam.orthographicSize, _targetSize, zoomSpeed * Time.deltaTime);
        }

        public void ZoomTo(float size, float duration = 0f)
        {
            _targetSize = Mathf.Clamp(size, minSize, maxSize);
            if (duration > 0f)
            {
                if (_zoomCoroutine != null) StopCoroutine(_zoomCoroutine);
                _zoomCoroutine = StartCoroutine(ZoomRoutine(size, duration));
            }
        }

        public void ZoomIn(float amount = 1f)  => ZoomTo(_targetSize - amount);
        public void ZoomOut(float amount = 1f) => ZoomTo(_targetSize + amount);
        public void ResetZoom(float duration = 0.5f) => ZoomTo(defaultSize, duration);

        IEnumerator ZoomRoutine(float target, float duration)
        {
            float start   = _cam.orthographicSize;
            float elapsed = 0f;
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                _cam.orthographicSize = Mathf.Lerp(start, target,
                    Mathf.Clamp01(elapsed / duration));
                yield return null;
            }
            _cam.orthographicSize = target;
            _targetSize = target;
        }
    }
}
