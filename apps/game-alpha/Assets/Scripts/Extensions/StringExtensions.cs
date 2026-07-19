using System;

namespace Lifetopia.Extensions
{
    public static class StringExtensions
    {
        public static bool IsNullOrEmpty(this string s) => string.IsNullOrEmpty(s);

        public static string OrDefault(this string s, string defaultVal) =>
            string.IsNullOrEmpty(s) ? defaultVal : s;

        public static string Capitalize(this string s)
        {
            if (string.IsNullOrEmpty(s)) return s;
            return char.ToUpper(s[0]) + s.Substring(1).ToLower();
        }

        public static bool ContainsIgnoreCase(this string s, string value) =>
            s != null && s.IndexOf(value, StringComparison.OrdinalIgnoreCase) >= 0;

        public static string ToSnakeCase(this string s)
        {
            if (string.IsNullOrEmpty(s)) return s;
            return s.ToLower().Replace(" ", "_").Replace("-", "_");
        }

        public static int ToIntSafe(this string s, int defaultVal = 0) =>
            int.TryParse(s, out int v) ? v : defaultVal;

        public static float ToFloatSafe(this string s, float defaultVal = 0f) =>
            float.TryParse(s, out float v) ? v : defaultVal;
    }
}
