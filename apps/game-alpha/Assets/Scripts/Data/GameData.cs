using System;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Models;

namespace Lifetopia.Data
{
    /// <summary>
    /// Central game data store — semua data runtime di sini.
    /// Bukan persistent (gunakan SaveManager untuk persist).
    /// </summary>
    public class GameData : MonoBehaviour
    {
        public static GameData Instance { get; private set; }

        // ── Player ────────────────────────────────────────────────────────────
        public PlayerModel Player { get; private set; } = new PlayerModel();

        // ── Wallet ────────────────────────────────────────────────────────────
        public WalletModel Wallet { get; private set; } = new WalletModel();

        // ── Quests ────────────────────────────────────────────────────────────
        public List<QuestModel> ActiveQuests { get; private set; } = new List<QuestModel>();

        // ── Shop ──────────────────────────────────────────────────────────────
        public List<ShopItemModel> ShopStock { get; private set; } = new List<ShopItemModel>();

        // ── Session ───────────────────────────────────────────────────────────
        public DateTime SessionStart { get; private set; }
        public string   CurrentBiome { get; set; } = "FARM";

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            SessionStart = DateTime.UtcNow;
        }

        public void SetPlayer(PlayerModel p) { if (p != null) Player = p; }
        public void SetWallet(WalletModel w) { if (w != null) Wallet = w; }

        public void SyncFromGameState()
        {
            var gs = LifetopiaGameState.Instance;
            if (gs == null) return;
            Player.Gold          = gs.Gold;
            Player.Level         = gs.Level;
            Player.XP            = gs.XP;
            Player.WalletAddress = gs.WalletPublicKey;
            Player.IsGuest       = gs.IsGuest;
            Player.ActiveBiome   = gs.PendingTravelBiome;
        }
    }
}
