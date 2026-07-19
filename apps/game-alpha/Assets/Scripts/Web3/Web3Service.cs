using System;
using System.Collections;
using UnityEngine;
using Lifetopia.Models;
using Lifetopia.DTO;
using Lifetopia.API;
using Lifetopia.Wallet;

namespace Lifetopia.Web3
{
    /// <summary>
    /// Facade utama Web3 — semua interaksi blockchain lewat sini.
    /// Tidak ada plugin. Semua via REST API ke backend.
    /// </summary>
    public class Web3Service : MonoBehaviour
    {
        public static Web3Service Instance { get; private set; }

        public WalletModel CurrentWallet { get; private set; } = new WalletModel();

        public event Action<WalletModel> OnWalletConnected;
        public event Action             OnWalletDisconnected;
        public event Action<bool>       OnNftStatusChanged;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        // ── Connect ───────────────────────────────────────────────────────────

        public void ConnectWallet(string provider,
            Action<WalletModel> onSuccess, Action<string> onError = null)
        {
            WalletConnector.Connect(provider,
                pk => StartCoroutine(OnWalletKeyReceived(pk, provider, onSuccess, onError)),
                onError);
        }

        IEnumerator OnWalletKeyReceived(string publicKey, string provider,
            Action<WalletModel> onSuccess, Action<string> onError)
        {
            CurrentWallet = new WalletModel
            {
                PublicKey   = publicKey,
                Provider    = provider,
                IsConnected = true,
                IsGuest     = false,
            };

            OnWalletConnected?.Invoke(CurrentWallet);
            onSuccess?.Invoke(CurrentWallet);

            // Background: cek NFT ownership
            if (WalletApiService.Instance != null)
            {
                yield return WalletApiService.Instance.CheckNftOwnership(
                    publicKey, CurrentWallet.AuthToken,
                    hasNft =>
                    {
                        CurrentWallet.IsChainVerified = hasNft;
                        OnNftStatusChanged?.Invoke(hasNft);
                    });
            }
            else yield break;
        }

        // ── Guest ─────────────────────────────────────────────────────────────

        public void ConnectAsGuest()
        {
            CurrentWallet = new WalletModel
            {
                PublicKey   = "GUEST_" + UnityEngine.Random.Range(1000, 9999),
                Provider    = "Guest",
                IsConnected = true,
                IsGuest     = true,
            };
            OnWalletConnected?.Invoke(CurrentWallet);
        }

        // ── Disconnect ────────────────────────────────────────────────────────

        public void Disconnect()
        {
            CurrentWallet = new WalletModel();
            OnWalletDisconnected?.Invoke();
        }

        // ── Mock Mint ─────────────────────────────────────────────────────────

        public void MockMintNft(Action<string> onSuccess, Action<string> onError = null)
        {
            if (!CurrentWallet.IsConnected || CurrentWallet.IsGuest)
            {
                onError?.Invoke("Wallet not connected");
                return;
            }
            string sig = $"devnet_mock_{UnityEngine.Random.Range(100000, 999999)}";
            CurrentWallet.IsChainVerified = true;
            OnNftStatusChanged?.Invoke(true);
            onSuccess?.Invoke(sig);
        }
    }
}
