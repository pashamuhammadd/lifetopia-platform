using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using System.Text;

namespace Lifetopia.Blockchain
{
    /// <summary>
    /// Direct Solana JSON-RPC calls (tanpa plugin).
    /// Semua via UnityWebRequest ke RPC endpoint.
    /// </summary>
    public static class BlockchainService
    {
        // ── Token Account Check ───────────────────────────────────────────────

        public static IEnumerator GetTokenAccountsByOwner(
            string walletPubkey,
            string mintAddress,
            string rpcUrl,
            Action<bool, string> onDone)
        {
            if (string.IsNullOrEmpty(walletPubkey) ||
                string.IsNullOrEmpty(mintAddress)  ||
                string.IsNullOrEmpty(rpcUrl))
            {
                onDone?.Invoke(false, "missing_params");
                yield break;
            }

            string body = "{\"jsonrpc\":\"2.0\",\"id\":1," +
                "\"method\":\"getTokenAccountsByOwner\"," +
                "\"params\":[\"" + Escape(walletPubkey) + "\"," +
                "{\"mint\":\"" + Escape(mintAddress) + "\"}," +
                "{\"encoding\":\"jsonParsed\"}]}";

            using var req = new UnityWebRequest(rpcUrl, "POST");
            req.uploadHandler   = new UploadHandlerRaw(Encoding.UTF8.GetBytes(body));
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");
            req.timeout = 10;
            yield return req.SendWebRequest();

#if UNITY_2020_1_OR_NEWER
            if (req.result != UnityWebRequest.Result.Success)
#else
            if (req.isNetworkError || req.isHttpError)
#endif
            {
                onDone?.Invoke(false, req.error);
                yield break;
            }

            string txt  = req.downloadHandler.text;
            bool   owns = HasTokenAccounts(txt);
            onDone?.Invoke(owns, owns ? "has_accounts" : "no_accounts");
        }

        // ── SOL Balance ───────────────────────────────────────────────────────

        public static IEnumerator GetSolBalance(
            string walletPubkey, string rpcUrl,
            Action<double, string> onDone)
        {
            string body = "{\"jsonrpc\":\"2.0\",\"id\":1," +
                "\"method\":\"getBalance\"," +
                "\"params\":[\"" + Escape(walletPubkey) + "\"]}";

            using var req = new UnityWebRequest(rpcUrl, "POST");
            req.uploadHandler   = new UploadHandlerRaw(Encoding.UTF8.GetBytes(body));
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");
            req.timeout = 10;
            yield return req.SendWebRequest();

#if UNITY_2020_1_OR_NEWER
            if (req.result != UnityWebRequest.Result.Success)
#else
            if (req.isNetworkError || req.isHttpError)
#endif
            {
                onDone?.Invoke(0, req.error);
                yield break;
            }

            // Parse "result":{"value":LAMPORTS}
            string txt = req.downloadHandler.text;
            double sol  = ParseLamports(txt) / 1_000_000_000.0;
            onDone?.Invoke(sol, "ok");
        }

        // ── Helpers ───────────────────────────────────────────────────────────

        static bool HasTokenAccounts(string json)
        {
            int v  = json.IndexOf("\"value\"", StringComparison.Ordinal);
            if (v < 0) return false;
            int lb = json.IndexOf('[', v);
            if (lb < 0) return false;
            int p  = lb + 1;
            while (p < json.Length && char.IsWhiteSpace(json[p])) p++;
            return p < json.Length && json[p] != ']';
        }

        static long ParseLamports(string json)
        {
            int idx = json.IndexOf("\"value\":", StringComparison.Ordinal);
            if (idx < 0) return 0;
            int start = idx + 8;
            while (start < json.Length && !char.IsDigit(json[start])) start++;
            int end = start;
            while (end < json.Length && char.IsDigit(json[end])) end++;
            if (long.TryParse(json.Substring(start, end - start), out long v)) return v;
            return 0;
        }

        static string Escape(string s) =>
            s.Replace("\\", "\\\\").Replace("\"", "\\\"");
    }
}
