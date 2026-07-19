using System;
using System.Collections;
using UnityEngine;
using Lifetopia.Network;
using Lifetopia.DTO;
using Lifetopia.Constants;

namespace Lifetopia.API
{
    /// <summary>Semua API call wallet — connect, verify, NFT check.</summary>
    public class WalletApiService : MonoBehaviour
    {
        public static WalletApiService Instance { get; private set; }

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        /// <summary>Step 1: Minta nonce dari server untuk signing.</summary>
        public IEnumerator GetNonce(string publicKey,
            Action<string> onSuccess, Action<string> onError = null)
        {
            string url = ApiEndpoints.AUTH_NONCE + "?wallet=" + publicKey;
            yield return HttpClient.Instance?.Get(url,
                json =>
                {
                    var resp = JsonUtility.FromJson<NonceResponseDTO>(json);
                    onSuccess?.Invoke(resp?.nonce ?? "");
                },
                onError);
        }

        /// <summary>Step 2: Kirim signature ke server, dapat auth token.</summary>
        public IEnumerator VerifySignature(WalletConnectRequestDTO dto,
            Action<WalletConnectResponseDTO> onSuccess, Action<string> onError = null)
        {
            string body = JsonUtility.ToJson(dto);
            yield return HttpClient.Instance?.Post(ApiEndpoints.AUTH_VERIFY, body,
                json =>
                {
                    var resp = JsonUtility.FromJson<WalletConnectResponseDTO>(json);
                    if (resp != null && resp.success) onSuccess?.Invoke(resp);
                    else onError?.Invoke("Verification failed");
                },
                onError);
        }

        /// <summary>Cek NFT ownership via backend (bukan langsung ke chain).</summary>
        public IEnumerator CheckNftOwnership(string publicKey, string authToken,
            Action<bool> onResult, Action<string> onError = null)
        {
            HttpClient.Instance?.SetAuthToken(authToken);
            string url = string.Format(ApiEndpoints.WALLET_NFTS, publicKey);
            yield return HttpClient.Instance?.Get(url,
                json =>
                {
                    // Backend returns { hasUtilityNft: true/false }
                    bool hasNft = json.Contains("\"hasUtilityNft\":true");
                    onResult?.Invoke(hasNft);
                },
                err => { onResult?.Invoke(false); onError?.Invoke(err); });
        }

        /// <summary>Get wallet token balances.</summary>
        public IEnumerator GetTokenBalances(string publicKey,
            Action<string> onSuccess, Action<string> onError = null)
        {
            string url = string.Format(ApiEndpoints.WALLET_TOKENS, publicKey);
            yield return HttpClient.Instance?.Get(url, onSuccess, onError);
        }
    }
}
