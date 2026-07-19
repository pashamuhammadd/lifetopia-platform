using System;
using UnityEngine;

namespace Lifetopia.Security
{
    /// <summary>Generate dan validasi token lokal (mock JWT-style).</summary>
    public static class TokenGenerator
    {
        public static string GenerateMockToken(string publicKey)
        {
            string header  = Convert.ToBase64String(
                System.Text.Encoding.UTF8.GetBytes("{\"alg\":\"mock\",\"typ\":\"JWT\"}"));
            string payload = Convert.ToBase64String(
                System.Text.Encoding.UTF8.GetBytes(
                    $"{{\"sub\":\"{publicKey}\"," +
                    $"\"iat\":{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}," +
                    $"\"exp\":{DateTimeOffset.UtcNow.AddHours(24).ToUnixTimeSeconds()}}}"));
            string sig = Guid.NewGuid().ToString("N").Substring(0, 16);
            return $"{header}.{payload}.{sig}";
        }

        public static bool IsTokenExpired(string token)
        {
            try
            {
                string[] parts = token.Split('.');
                if (parts.Length < 2) return true;
                string json = System.Text.Encoding.UTF8.GetString(
                    Convert.FromBase64String(PadBase64(parts[1])));
                int expIdx = json.IndexOf("\"exp\":", StringComparison.Ordinal);
                if (expIdx < 0) return false;
                int start = expIdx + 6;
                int end   = start;
                while (end < json.Length && char.IsDigit(json[end])) end++;
                if (long.TryParse(json.Substring(start, end - start), out long exp))
                    return DateTimeOffset.UtcNow.ToUnixTimeSeconds() > exp;
            }
            catch { }
            return true;
        }

        static string PadBase64(string s)
        {
            int pad = s.Length % 4;
            if (pad == 2) s += "==";
            else if (pad == 3) s += "=";
            return s;
        }
    }
}
