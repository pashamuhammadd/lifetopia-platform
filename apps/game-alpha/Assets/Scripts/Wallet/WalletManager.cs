using System;
using UnityEngine;
using Lifetopia.Models;
using Lifetopia.Web3;

namespace Lifetopia.Wallet
{
    /// <summary>
    /// High-level wallet manager — UI dan game logic pakai ini.
    /// Wraps Web3Service dengan state management.
    /// </summary>
    public class WalletManager : MonoBehaviour
    {
        public static WalletManager Instance { get; private set; }

        public WalletModel Wallet => Web3Service.Instance?.CurrentWallet ?? _fallback;
        public bool IsConnected   => Wallet.IsConnected;
        public bool IsGuest       => Wallet.IsGuest;
        public string PublicKey   => Wallet.PublicKey;
        public bool HasNft        => Wallet.IsChainVerified;

        public event Action<WalletModel> OnConnected;
        public event Action             OnDisconnected;

        readonly WalletModel _fallback = new WalletModel();

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start()
        {
            if (Web3Service.Instance != null)
            {
                Web3Service.Instance.OnWalletConnected    += w => OnConnected?.Invoke(w);
                Web3Service.Instance.OnWalletDisconnected += () => OnDisconnected?.Invoke();
            }
        }

        public void ConnectPhantom()  => Web3Service.Instance?.ConnectWallet("Phantom",
            w => OnConnected?.Invoke(w));
        public void ConnectSolflare() => Web3Service.Instance?.ConnectWallet("Solflare",
            w => OnConnected?.Invoke(w));
        public void ConnectBackpack() => Web3Service.Instance?.ConnectWallet("Backpack",
            w => OnConnected?.Invoke(w));
        public void ConnectAsGuest()  => Web3Service.Instance?.ConnectAsGuest();
        public void Disconnect()      => Web3Service.Instance?.Disconnect();

        public string ShortAddress()
        {
            string pk = PublicKey;
            if (string.IsNullOrEmpty(pk)) return "";
            if (pk.Length <= 10) return pk;
            return pk.Substring(0, 4) + "…" + pk.Substring(pk.Length - 4);
        }
    }
}
