using System;
using System.Collections.Generic;

namespace Lifetopia.Models
{
    [Serializable]
    public class WalletModel
    {
        public string       PublicKey       = "";
        public string       Provider        = "";   // Phantom, Solflare, Backpack, Guest
        public bool         IsConnected     = false;
        public bool         IsGuest         = true;
        public double       SolBalance      = 0;
        public List<TokenModel> Tokens      = new List<TokenModel>();
        public List<NftModel>   NFTs        = new List<NftModel>();
        public DateTime     ConnectedAt     = DateTime.UtcNow;
        public string       AuthToken       = "";
        public bool         IsChainVerified = false;
    }

    [Serializable]
    public class TokenModel
    {
        public string MintAddress = "";
        public string Symbol      = "";
        public double Amount      = 0;
        public int    Decimals    = 9;
    }

    [Serializable]
    public class NftModel
    {
        public string MintAddress = "";
        public string Name        = "";
        public string ImageUrl    = "";
        public string Collection  = "";
        public bool   IsUtility   = false;
    }
}
