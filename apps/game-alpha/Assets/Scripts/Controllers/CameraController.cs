using UnityEngine;

namespace Lifetopia.Controllers
{
    /// <summary>
    /// Smooth follow camera 2D dengan bounds clamping.
    /// Attach ke Camera GameObject.
    /// </summary>
    public class CameraController : MonoBehaviour
    {
        [Header("Target")]
        public Transform target;
        public string    targetTag = "Player";

        [Header("Follow")]
        public float smoothSpeed  = 5f;
        public Vector3 offset     = new Vector3(0f, 1f, -10f);

        [Header("Bounds (0 = no limit)")]
        public float minX = 0f, maxX = 0f;
        public float minY = 0f, maxY = 0f;
        public bool  useBounds = false;

        [Header("Shake")]
        public float shakeDuration  = 0f;
        public float shakeMagnitude = 0.1f;

        Vector3 _shakeOffset;
        float   _shakeTimer;

        void Start()
        {
            if (target == null && !string.IsNullOrEmpty(targetTag))
            {
                var go = GameObject.FindWithTag(targetTag);
                if (go != null) target = go.transform;
            }
        }

        void LateUpdate()
        {
            if (target == null) return;

            Vector3 desired = target.position + offset;

            if (useBounds)
            {
                if (maxX > minX) desired.x = Mathf.Clamp(desired.x, minX, maxX);
                if (maxY > minY) desired.y = Mathf.Clamp(desired.y, minY, maxY);
            }

            // Shake
            if (_shakeTimer > 0f)
            {
                _shakeOffset = Random.insideUnitSphere * shakeMagnitude;
                _shakeOffset.z = 0f;
                _shakeTimer -= Time.deltaTime;
            }
            else _shakeOffset = Vector3.zero;

            transform.position = Vector3.Lerp(
                transform.position, desired + _shakeOffset, smoothSpeed * Time.deltaTime);
        }

        public void Shake(float duration, float magnitude)
        {
            shakeDuration  = duration;
            shakeMagnitude = magnitude;
            _shakeTimer    = duration;
        }

        public void SetTarget(Transform t) => target = t;

        public void SetBounds(float x1, float x2, float y1, float y2)
        {
            minX = x1; maxX = x2;
            minY = y1; maxY = y2;
            useBounds = true;
        }
    }
}
