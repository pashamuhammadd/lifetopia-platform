using System;
using UnityEngine;

/// <summary>
/// Devnet: desktop uses deterministic mock pubkey. WebGL: hook Phantom adapter when available.
/// </summary>
public static class SolanaWalletBridge
{
    public static void ConnectPhantom(Action<string, string> onResult, Action<string> onError)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        try {
            string pk = PhantomWebGlue.TryConnectPublicKey();
            if (!string.IsNullOrEmpty(pk)) onResult?.Invoke("Phantom", pk);
            else onError?.Invoke("Phantom unavailable — use Guest or fallback mock.");
        } catch (Exception e) { onError?.Invoke(e.Message); }
#else
        Mock(provider: "Phantom", onResult);
#endif
    }

    public static void ConnectSolflare(Action<string, string> onResult, Action<string> onError) =>
        Mock("Solflare", onResult);

    public static void ConnectBackpack(Action<string, string> onResult, Action<string> onError) =>
        Mock("Backpack", onResult);

    static void Mock(string provider, Action<string, string> onResult)
    {
        string pk = "DevPK" + UnityEngine.Random.Range(100000000, int.MaxValue) + Guid.NewGuid().ToString("N").Substring(0, 14);
        onResult?.Invoke(provider, pk);
    }
}

#if UNITY_WEBGL && !UNITY_EDITOR
internal static class PhantomWebGlue {
    public static string TryConnectPublicKey() =>
        System.Runtime.InteropServices.Marshal.PtrToStringAuto(WebGLPhantomConnect());
    [System.Runtime.InteropServices.DllImport("__Internal")]
    internal static extern System.IntPtr WebGLPhantomConnect();
}
#else
internal static class PhantomWebGlue {}
#endif
