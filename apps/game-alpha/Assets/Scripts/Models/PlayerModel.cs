using System;
using System.Collections.Generic;

namespace Lifetopia.Models
{
    [Serializable]
    public class PlayerModel
    {
        public string   PlayerId        = "";
        public string   PlayerName      = "Player";
        public string   WalletAddress   = "";
        public int      Level           = 1;
        public int      XP              = 0;
        public int      Gold            = 0;
        public bool     IsGuest         = true;
        public bool     HasNft          = false;
        public float    FarmSpeedMult   = 1f;
        public float    YieldMult       = 1f;
        public string   ActiveBiome     = "FARM";
        public DateTime LastLogin       = DateTime.UtcNow;
        public List<string> UnlockedBiomes = new List<string> { "FARM" };

        public bool IsLevelUp(int xpGained)
        {
            int needed = Level * 50;
            return (XP + xpGained) >= needed;
        }

        public string ShortWallet()
        {
            if (string.IsNullOrEmpty(WalletAddress)) return "";
            if (WalletAddress.Length <= 10) return WalletAddress;
            return WalletAddress.Substring(0, 4) + "…" + WalletAddress.Substring(WalletAddress.Length - 4);
        }
    }
}
