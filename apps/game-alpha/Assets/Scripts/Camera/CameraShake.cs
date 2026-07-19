using System.Collections;
using UnityEngine;

namespace Lifetopia.Camera
{
    /// <summary>Camera shake component — attach ke Camera.</summary>
    public class CameraShake : MonoBehaviour
    {
        public static CameraShake Instance { get; private set; }

        void Awake()
        {
            if (Instance != null && Instance != this) return;
            Instance = this;
        }

        public void Shake(float duration = 0.3f, float magnitude = 0.15f)
            => StartCoroutine(ShakeRoutine(duration, magnitude));

        public void ShakeLight()  => Shake(0.2f, 0.08f);
        public void ShakeMedium() => Shake(0.3f, 0.15f);
        public void ShakeHeavy()  => Shake(0.5f, 0.3f);

        IEnumerator ShakeRoutine(float duration, float magnitude)
        {
            Vector3 origin = transform.localPosition;
            float   elapsed = 0f;

            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float progress = elapsed / duration;
                float dampened = magnitude * (1f - progress); // fade out

                transform.localPosition = origin + (Vector3)Random.insideUnitCircle * dampened;
                yield return null;
            }

            transform.localPosition = origin;
        }
    }
}
