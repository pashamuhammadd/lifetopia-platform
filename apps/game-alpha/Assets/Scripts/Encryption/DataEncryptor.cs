using System;
using System.Text;
using UnityEngine;

namespace Lifetopia.Encryption
{
    /// <summary>
    /// Simple XOR + Base64 encryption untuk save data lokal.
    /// Bukan untuk data sensitif production — gunakan proper AES di server.
    /// </summary>
    public static class DataEncryptor
    {
        static readonly string DefaultKey = "L1f3t0p14_S3cr3t_K3y_2024";

        public static string Encrypt(string plainText, string key = null)
        {
            if (string.IsNullOrEmpty(plainText)) return "";
            key = key ?? DefaultKey;
            byte[] data    = Encoding.UTF8.GetBytes(plainText);
            byte[] keyBytes= Encoding.UTF8.GetBytes(key);
            byte[] result  = new byte[data.Length];
            for (int i = 0; i < data.Length; i++)
                result[i] = (byte)(data[i] ^ keyBytes[i % keyBytes.Length]);
            return Convert.ToBase64String(result);
        }

        public static string Decrypt(string cipherText, string key = null)
        {
            if (string.IsNullOrEmpty(cipherText)) return "";
            try
            {
                key = key ?? DefaultKey;
                byte[] data    = Convert.FromBase64String(cipherText);
                byte[] keyBytes= Encoding.UTF8.GetBytes(key);
                byte[] result  = new byte[data.Length];
                for (int i = 0; i < data.Length; i++)
                    result[i] = (byte)(data[i] ^ keyBytes[i % keyBytes.Length]);
                return Encoding.UTF8.GetString(result);
            }
            catch { return ""; }
        }

        public static string HashString(string input)
        {
            // Simple djb2 hash — bukan cryptographic
            uint hash = 5381;
            foreach (char c in input)
                hash = ((hash << 5) + hash) + c;
            return hash.ToString("X8");
        }
    }
}
