using UnityEngine;

namespace Lifetopia.Gameplay
{
    /// <summary>
    /// Kamera top-down ngikutin target secara manual (bukan Cinemachine) -
    /// sengaja, biar ringan di device low-end dan gampang dipahami. Kalau
    /// nanti butuh fitur kamera lanjutan (zoom, screen shake, dst), baru
    /// masuk akal upgrade ke Cinemachine.
    /// </summary>
    public class CameraFollow : MonoBehaviour
    {
        [SerializeField] private Transform target;
        [SerializeField] private float smoothTime = 0.15f;
        [SerializeField] private Vector3 offset = new Vector3(0f, 0f, -10f);

        private Vector3 _velocity;

        public void SetTarget(Transform newTarget) => target = newTarget;

        private void LateUpdate()
        {
            if (target == null) return;
            Vector3 desired = target.position + offset;
            transform.position = Vector3.SmoothDamp(transform.position, desired, ref _velocity, smoothTime);
        }
    }
}
