using UnityEngine;

namespace Lifetopia.Utils
{
    public static class ColorUtils
    {
        public static Color FromHex(string hex)
        {
            hex = hex.TrimStart('#');
            if (hex.Length == 6) hex += "FF";
            if (hex.Length != 8) return Color.white;
            float r = Convert(hex.Substring(0, 2));
            float g = Convert(hex.Substring(2, 2));
            float b = Convert(hex.Substring(4, 2));
            float a = Convert(hex.Substring(6, 2));
            return new Color(r, g, b, a);

            float Convert(string s) =>
                System.Convert.ToInt32(s, 16) / 255f;
        }

        public static string ToHex(Color c) =>
            $"#{(int)(c.r*255):X2}{(int)(c.g*255):X2}{(int)(c.b*255):X2}";

        public static Color WithAlpha(Color c, float a) =>
            new Color(c.r, c.g, c.b, a);

        public static Color Lerp(Color a, Color b, float t) =>
            Color.Lerp(a, b, Mathf.Clamp01(t));

        // Lifetopia brand colors
        public static readonly Color GoldenYellow = FromHex("#FFD924");
        public static readonly Color LifetopiaGreen= FromHex("#4CAF50");
        public static readonly Color SolanaGreen   = FromHex("#9945FF");
        public static readonly Color DangerRed     = FromHex("#E53935");
        public static readonly Color InfoBlue      = FromHex("#1E88E5");
    }
}
