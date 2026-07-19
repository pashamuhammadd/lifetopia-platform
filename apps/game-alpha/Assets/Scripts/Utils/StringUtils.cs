using System;
using System.Text;

namespace Lifetopia.Utils
{
    public static class StringUtils
    {
        public static string Truncate(string s, int maxLen, string suffix = "…")
        {
            if (string.IsNullOrEmpty(s) || s.Length <= maxLen) return s;
            return s.Substring(0, maxLen) + suffix;
        }

        public static string ToPascalCase(string s)
        {
            if (string.IsNullOrEmpty(s)) return s;
            var words = s.Split(new[] { '_', ' ', '-' }, StringSplitOptions.RemoveEmptyEntries);
            var sb = new StringBuilder();
            foreach (var w in words)
                sb.Append(char.ToUpper(w[0]) + w.Substring(1).ToLower());
            return sb.ToString();
        }

        public static string FormatGold(int amount) =>
            amount >= 1000 ? $"{amount / 1000f:0.#}K GOLD" : $"{amount} GOLD";

        public static string FormatTime(float seconds)
        {
            int m = (int)(seconds / 60);
            int s = (int)(seconds % 60);
            return $"{m:00}:{s:00}";
        }

        public static string FormatTimeAgo(DateTime dt)
        {
            var diff = DateTime.UtcNow - dt;
            if (diff.TotalSeconds < 60)  return "just now";
            if (diff.TotalMinutes < 60)  return $"{(int)diff.TotalMinutes}m ago";
            if (diff.TotalHours < 24)    return $"{(int)diff.TotalHours}h ago";
            return $"{(int)diff.TotalDays}d ago";
        }

        public static string ShortenWallet(string pk, int chars = 4)
        {
            if (string.IsNullOrEmpty(pk)) return "";
            if (pk.Length <= chars * 2 + 1) return pk;
            return pk.Substring(0, chars) + "…" + pk.Substring(pk.Length - chars);
        }

        public static bool IsValidWalletAddress(string pk) =>
            !string.IsNullOrEmpty(pk) && pk.Length >= 32 && pk.Length <= 44;
    }
}
