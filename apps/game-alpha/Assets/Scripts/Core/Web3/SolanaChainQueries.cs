using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

/// <summary>
/// Minimal Solana JSON-RPC via HTTP POST (Alchemy Devnet).
/// Static utility — tidak di-attach ke GameObject.
/// Coroutine dijalankan via Web3Runner.
/// </summary>
public static class SolanaChainQueries
{
    /// <summary>
    /// Verifikasi apakah wallet punya token account untuk mint tertentu.
    /// Gunakan Web3Runner.Instance.VerifyMint(...) dari MonoBehaviour.
    /// </summary>
    public static void VerifyWalletOwnsMint(
        string walletBase58,
        string mintBase58,
        string rpcUrlFull,
        Action<bool, string> onDone)
    {
        if (string.IsNullOrEmpty(walletBase58) ||
            string.IsNullOrEmpty(mintBase58)   ||
            string.IsNullOrEmpty(rpcUrlFull))
        {
            onDone?.Invoke(false, "missing params");
            return;
        }

        Web3Runner.Instance.RunVerify(walletBase58, mintBase58, rpcUrlFull, onDone);
    }

    // ── JSON helpers (internal) ───────────────────────────────────────────────

    internal static string BuildRpcBody(string wallet, string mint)
    {
        return "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"getTokenAccountsByOwner\",\"params\":[\""
            + EscapeJson(wallet)
            + "\",{\"mint\":\""
            + EscapeJson(mint)
            + "\"},{\"encoding\":\"jsonParsed\"}]}";
    }

    internal static string EscapeJson(string s) =>
        s.Replace("\\", "\\\\").Replace("\"", "\\\"");

    internal static bool TokenAccountsArrayHasEntries(string json)
    {
        int v = json.IndexOf("\"value\"", StringComparison.Ordinal);
        if (v < 0) return false;
        int lb = json.IndexOf('[', v);
        if (lb < 0) return false;
        int p = lb + 1;
        while (p < json.Length && char.IsWhiteSpace(json[p])) p++;
        return p < json.Length && json[p] != ']';
    }
}
