using System;

namespace Lifetopia.DTO
{
    [Serializable]
    public class WalletConnectRequestDTO
    {
        public string publicKey = "";
        public string provider  = "";
        public string signature = "";
        public string message   = "";
    }

    [Serializable]
    public class WalletConnectResponseDTO
    {
        public bool   success    = false;
        public string authToken  = "";
        public string publicKey  = "";
        public bool   hasNft     = false;
        public double solBalance = 0;
    }

    [Serializable]
    public class NonceResponseDTO
    {
        public string nonce   = "";
        public string message = "";
    }
}
