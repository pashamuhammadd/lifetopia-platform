namespace Lifetopia.Constants
{
    public static class GameConstants
    {
        // ── Scenes ────────────────────────────────────────────────────────────
        public const string SCENE_SPLASH      = "splashscreen";
        public const string SCENE_CHOOSE_MAP  = "choose map";
        public const string SCENE_FARM        = "farm game";
        public const string SCENE_CITY        = "map_city";
        public const string SCENE_GARDEN      = "map_garden";
        public const string SCENE_SUBURBAN    = "map_suburban";
        public const string SCENE_FISHING     = "map_fishing";

        // ── Tags ──────────────────────────────────────────────────────────────
        public const string TAG_PLAYER        = "Player";
        public const string TAG_ENEMY         = "Enemy";
        public const string TAG_NPC           = "NPC";
        public const string TAG_INTERACTABLE  = "Interactable";
        public const string TAG_GROUND        = "Ground";

        // ── Layers ────────────────────────────────────────────────────────────
        public const string LAYER_GROUND      = "Ground";
        public const string LAYER_PLAYER      = "Player";
        public const string LAYER_UI          = "UI";

        // ── PlayerPrefs Keys ──────────────────────────────────────────────────
        public const string PREF_WALLET_KEY   = "lf_wallet";
        public const string PREF_GOLD         = "lf_gold";
        public const string PREF_LEVEL        = "lf_level";
        public const string PREF_XP           = "lf_xp";
        public const string PREF_SETTINGS     = "lf_settings";
        public const string PREF_FIRST_LAUNCH = "lf_first_launch";

        // ── Economy ───────────────────────────────────────────────────────────
        public const int    STARTING_GOLD     = 0;
        public const int    STARTING_LEVEL    = 1;
        public const int    XP_PER_LEVEL      = 50;
        public const float  NFT_SPEED_BOOST   = 1.12f;
        public const float  NFT_YIELD_BOOST   = 1.10f;

        // ── Gameplay ──────────────────────────────────────────────────────────
        public const float  INTERACT_RADIUS   = 1.8f;
        public const float  WALK_SPEED        = 3.2f;
        public const float  RUN_SPEED         = 5.5f;
        public const float  JUMP_FORCE        = 9f;
        public const float  GRAVITY_SCALE     = 3f;

        // ── API ───────────────────────────────────────────────────────────────
        public const string API_BASE_URL      = "https://api.lifetopia.world";
        public const string API_VERSION       = "v1";
        public const int    API_TIMEOUT_SEC   = 10;

        // ── Solana ────────────────────────────────────────────────────────────
        public const string SOLANA_DEVNET_RPC = "https://api.devnet.solana.com";
        public const string SOLANA_MAINNET_RPC= "https://api.mainnet-beta.solana.com";
    }
}
