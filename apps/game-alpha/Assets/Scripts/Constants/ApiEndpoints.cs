namespace Lifetopia.Constants
{
    public static class ApiEndpoints
    {
        private const string Base = GameConstants.API_BASE_URL + "/" + GameConstants.API_VERSION;

        // ── Auth ──────────────────────────────────────────────────────────────
        public const string AUTH_NONCE         = Base + "/auth/nonce";
        public const string AUTH_VERIFY        = Base + "/auth/verify";
        public const string AUTH_REFRESH       = Base + "/auth/refresh";

        // ── Player ────────────────────────────────────────────────────────────
        public const string PLAYER_PROFILE     = Base + "/player/profile";
        public const string PLAYER_INVENTORY   = Base + "/player/inventory";
        public const string PLAYER_QUESTS      = Base + "/player/quests";
        public const string PLAYER_LEADERBOARD = Base + "/player/leaderboard";

        // ── Wallet ────────────────────────────────────────────────────────────
        public const string WALLET_INFO        = Base + "/wallet/{0}";
        public const string WALLET_TOKENS      = Base + "/wallet/{0}/tokens";
        public const string WALLET_NFTS        = Base + "/wallet/{0}/nfts";

        // ── Economy ───────────────────────────────────────────────────────────
        public const string ECONOMY_PRICES     = Base + "/economy/prices";
        public const string ECONOMY_SHOP       = Base + "/economy/shop";
        public const string ECONOMY_TRADE      = Base + "/economy/trade";

        // ── Blockchain ────────────────────────────────────────────────────────
        public const string CHAIN_MINT         = Base + "/chain/mint";
        public const string CHAIN_TRANSFER     = Base + "/chain/transfer";
        public const string CHAIN_VERIFY       = Base + "/chain/verify";
    }
}
