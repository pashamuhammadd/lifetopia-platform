using UnityEngine;

namespace Lifetopia.Extensions
{
    public static class TransformExtensions
    {
        public static void DestroyAllChildren(this Transform t)
        {
            for (int i = t.childCount - 1; i >= 0; i--)
                Object.Destroy(t.GetChild(i).gameObject);
        }

        public static T GetOrAdd<T>(this GameObject go) where T : Component
        {
            var c = go.GetComponent<T>();
            return c != null ? c : go.AddComponent<T>();
        }

        public static void SetX(this Transform t, float x) =>
            t.position = new Vector3(x, t.position.y, t.position.z);

        public static void SetY(this Transform t, float y) =>
            t.position = new Vector3(t.position.x, y, t.position.z);

        public static float DistanceTo(this Transform t, Transform other) =>
            Vector3.Distance(t.position, other.position);

        public static float DistanceTo2D(this Transform t, Transform other) =>
            Vector2.Distance(t.position, other.position);

        public static bool IsWithin(this Transform t, Transform other, float radius) =>
            t.DistanceTo2D(other) <= radius;

        public static void LookAt2D(this Transform t, Vector2 target)
        {
            Vector2 dir = target - (Vector2)t.position;
            float angle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;
            t.rotation = Quaternion.Euler(0f, 0f, angle);
        }
    }
}
