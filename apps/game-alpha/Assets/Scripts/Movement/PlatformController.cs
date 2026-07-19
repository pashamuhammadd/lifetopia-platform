using UnityEngine;

namespace Lifetopia.Movement
{
    /// <summary>
    /// Moving platform controller — horizontal/vertical patrol.
    /// Attach ke platform GameObject.
    /// </summary>
    public class PlatformController : MonoBehaviour
    {
        public enum PlatformAxis { Horizontal, Vertical }

        [Header("Movement")]
        public PlatformAxis axis      = PlatformAxis.Horizontal;
        public float        distance  = 4f;
        public float        speed     = 2f;
        public bool         pingPong  = true;

        Vector3 _startPos;
        float   _t;
        int     _dir = 1;

        void Start() => _startPos = transform.position;

        void Update()
        {
            _t += Time.deltaTime * speed * _dir;

            float half = distance * 0.5f;
            if (_t > half)  { _t = half;  if (pingPong) _dir = -1; }
            if (_t < -half) { _t = -half; if (pingPong) _dir =  1; }

            Vector3 offset = axis == PlatformAxis.Horizontal
                ? new Vector3(_t, 0f, 0f)
                : new Vector3(0f, _t, 0f);

            transform.position = _startPos + offset;
        }

        void OnDrawGizmosSelected()
        {
            Vector3 start = Application.isPlaying ? _startPos : transform.position;
            Gizmos.color = Color.cyan;
            Vector3 half = axis == PlatformAxis.Horizontal
                ? new Vector3(distance * 0.5f, 0f, 0f)
                : new Vector3(0f, distance * 0.5f, 0f);
            Gizmos.DrawLine(start - half, start + half);
            Gizmos.DrawWireSphere(start - half, 0.1f);
            Gizmos.DrawWireSphere(start + half, 0.1f);
        }
    }
}
