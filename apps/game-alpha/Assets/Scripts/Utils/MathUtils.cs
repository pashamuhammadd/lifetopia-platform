using UnityEngine;

namespace Lifetopia.Utils
{
    public static class MathUtils
    {
        public static float Remap(float value, float inMin, float inMax,
            float outMin, float outMax)
        {
            if (Mathf.Approximately(inMax - inMin, 0f)) return outMin;
            return outMin + (value - inMin) / (inMax - inMin) * (outMax - outMin);
        }

        public static float EaseInOut(float t) =>
            t < 0.5f ? 2f * t * t : -1f + (4f - 2f * t) * t;

        public static float EaseOut(float t) => 1f - Mathf.Pow(1f - t, 3f);

        public static float EaseIn(float t) => t * t * t;

        public static float BounceOut(float t)
        {
            if (t < 1f / 2.75f) return 7.5625f * t * t;
            if (t < 2f / 2.75f) { t -= 1.5f / 2.75f;  return 7.5625f * t * t + 0.75f; }
            if (t < 2.5f / 2.75f){ t -= 2.25f / 2.75f; return 7.5625f * t * t + 0.9375f; }
            t -= 2.625f / 2.75f;
            return 7.5625f * t * t + 0.984375f;
        }

        public static bool Approximately(float a, float b, float tolerance = 0.001f) =>
            Mathf.Abs(a - b) < tolerance;

        public static int Clamp(int value, int min, int max) =>
            value < min ? min : value > max ? max : value;

        public static float SnapToGrid(float value, float gridSize) =>
            Mathf.Round(value / gridSize) * gridSize;

        public static Vector2 SnapToGrid(Vector2 v, float gridSize) =>
            new Vector2(SnapToGrid(v.x, gridSize), SnapToGrid(v.y, gridSize));
    }
}
