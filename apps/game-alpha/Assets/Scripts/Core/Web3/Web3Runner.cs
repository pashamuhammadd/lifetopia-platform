using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

/// <summary>
/// MonoBehaviour singleton yang menjalankan coroutine Web3.
/// Auto-spawn via Instance — tidak perlu di-attach manual ke scene.
/// </summary>
public class Web3Runner : MonoBehaviour
{
    static Web3Runner _instance;

    public static Web3Runner Instance
    {
        get
        {
            if (_instance != null) return _instance;

            GameObject go = new GameObject("__Web3Runner__");
            DontDestroyOnLoad(go);
            _instance = go.AddComponent<Web3Runner>();
            return _instance;
        }
    }

    void Awake()
    {
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }
        _instance = this;
        DontDestroyOnLoad(gameObject);
    }

    /// <summary>Jalankan verifikasi mint ownership via Solana RPC.</summary>
    public void RunVerify(string wallet, string mint, string rpcUrl, Action<bool, string> onDone)
    {
        StartCoroutine(CoVerify(wallet, mint, rpcUrl, onDone));
    }

    IEnumerator CoVerify(string wallet, string mint, string rpcUrl, Action<bool, string> onDone)
    {
        string body = SolanaChainQueries.BuildRpcBody(wallet, mint);

        using UnityWebRequest req = new UnityWebRequest(rpcUrl, "POST");
        byte[] raw = Encoding.UTF8.GetBytes(body);
        req.uploadHandler   = new UploadHandlerRaw(raw);
        req.downloadHandler = new DownloadHandlerBuffer();
        req.SetRequestHeader("Content-Type", "application/json");

        yield return req.SendWebRequest();

#if UNITY_2020_1_OR_NEWER
        if (req.result != UnityWebRequest.Result.Success)
#else
        if (req.isNetworkError || req.isHttpError)
#endif
        {
            onDone?.Invoke(false, req.error ?? req.downloadHandler.text);
            yield break;
        }

        string txt = req.downloadHandler.text;

        if (txt.IndexOf("\"error\"", StringComparison.Ordinal) >= 0)
        {
            onDone?.Invoke(false, txt);
            yield break;
        }

        bool owns = SolanaChainQueries.TokenAccountsArrayHasEntries(txt);
        onDone?.Invoke(owns, owns ? "mint_accounts_nonempty" : "no_accounts");
    }
}
