using System;
using System.Collections;
using UnityEngine;
using Lifetopia.API;
using Lifetopia.DTO;
using Lifetopia.Security;
using Lifetopia.Network;

namespace Lifetopia.Authentication
{
    /// <summary>
    /// Auth flow: wallet connect → nonce → sign → verify → token.
    /// Mock mode: skip server, generate local token.
    /// </summary>
    public class AuthService : MonoBehaviour
    {
        public static AuthService Instance { get; private set; }

        public string AuthToken    { get; private set; } = "";
        public bool   IsAuthed     => !string.IsNullOrEmpty(AuthToken);

        public event Action<string> OnAuthSuccess;
        public event Action<string> OnAuthFailed;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        // ── Mock Auth (dev mode) ──────────────────────────────────────────────

        public void AuthenticateMock(string publicKey, string provider)
        {
            AuthToken = TokenGenerator.GenerateMockToken(publicKey);
            HttpClient.Instance?.SetAuthToken(AuthToken);
            UnityEngine.Debug.Log($"[AuthService] Mock auth OK — provider: {provider}");
            OnAuthSuccess?.Invoke(AuthToken);
        }

        // ── Real Auth (production) ────────────────────────────────────────────

        public IEnumerator AuthenticateWithWallet(string publicKey, string provider,
            Action<string> onSuccess = null, Action<string> onError = null)
        {
            if (WalletApiService.Instance == null)
            {
                // Fallback ke mock
                AuthenticateMock(publicKey, provider);
                onSuccess?.Invoke(AuthToken);
                yield break;
            }

            // Step 1: Get nonce
            string nonce = "";
            yield return WalletApiService.Instance.GetNonce(publicKey,
                n => nonce = n,
                err => { OnAuthFailed?.Invoke(err); onError?.Invoke(err); });

            if (string.IsNullOrEmpty(nonce)) yield break;

            // Step 2: Sign nonce (mock signature di desktop)
            string signature = MockSign(nonce, publicKey);

            // Step 3: Verify
            var dto = new WalletConnectRequestDTO
            {
                publicKey = publicKey,
                provider  = provider,
                signature = signature,
                message   = nonce,
            };

            yield return WalletApiService.Instance.VerifySignature(dto,
                resp =>
                {
                    AuthToken = resp.authToken;
                    HttpClient.Instance?.SetAuthToken(AuthToken);
                    OnAuthSuccess?.Invoke(AuthToken);
                    onSuccess?.Invoke(AuthToken);
                },
                err => { OnAuthFailed?.Invoke(err); onError?.Invoke(err); });
        }

        public void Logout()
        {
            AuthToken = "";
            HttpClient.Instance?.SetAuthToken("");
        }

        static string MockSign(string nonce, string pk) =>
            $"mock_sig_{pk.Substring(0, Math.Min(8, pk.Length))}_{nonce.GetHashCode():X}";
    }
}
