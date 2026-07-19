using System;
using UnityEngine;

namespace Lifetopia.Wallet
{
    /// <summary>
    /// Low-level wallet connector.
    /// Desktop = mock pubkey. WebGL = JS bridge ke Phantom/Solflare.
    /// </summary>
    public static class WalletConnector
    {
        public static void Connect(string provider,
            Action<string> onPublicKey, Action<string> onError = null)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            ConnectWebGL(provider, onPublicKey, onError);
#else
            ConnectMock(provider, onPublicKey);
#endif
        }

        static void ConnectMock(string provider, Action<string> onPublicKey)
        {
            string pk = $"DevPK_{provider}_{Guid.NewGuid().ToString("N").Substring(0, 16)}";
            UnityEngine.Debug.Log($"[WalletConnector] Mock connect ({provider}): {pk}");
            onPublicKey?.Invoke(pk);
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        static void ConnectWebGL(string provider,
            Action<string> onPublicKey, Action<string> onError)
        {
            try
            {
                string pk = WalletJsBridge.RequestConnect(provider);
                if (!string.IsNullOrEmpty(pk)) onPublicKey?.Invoke(pk);
                else onError?.Invoke($"{provider} unavailable in browser.");
            }
            catch (Exception e) { onError?.Invoke(e.Message); }
        }
#endif
    }
}

// ── WebGL JS Bridge (stub — replace dengan actual jslib) ──────────────────────
#if UNITY_WEBGL && !UNITY_EDITOR
internal static class WalletJsBridge
{
    [System.Runtime.InteropServices.DllImport("__Internal")]
    internal static extern string RequestConnect(string provider);
}
#else
internal static class WalletJsBridge
{
    internal static string RequestConnect(string provider) => "";
}
#endif
