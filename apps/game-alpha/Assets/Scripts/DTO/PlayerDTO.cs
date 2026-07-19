using System;
using System.Collections.Generic;

namespace Lifetopia.DTO
{
    [Serializable]
    public class PlayerProfileDTO
    {
        public string playerId    = "";
        public string playerName  = "";
        public int    level       = 1;
        public int    xp          = 0;
        public int    gold        = 0;
        public bool   hasNft      = false;
        public string activeBiome = "FARM";
        public List<string> unlockedBiomes = new List<string>();
    }

    [Serializable]
    public class PlayerUpdateDTO
    {
        public int    goldDelta   = 0;
        public int    xpDelta     = 0;
        public string biome       = "";
        public string authToken   = "";
    }

    [Serializable]
    public class LeaderboardEntryDTO
    {
        public int    rank        = 0;
        public string playerName  = "";
        public string walletShort = "";
        public int    gold        = 0;
        public int    level       = 0;
    }
}
