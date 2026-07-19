using UnityEngine;

/// <summary>
/// Satu tempat untuk semua tuning visual + Solana config.
/// AUTO-LOAD dari Resources/LifetopiaBootstrapConfig.
/// Kalau asset tidak ada, runtime defaults dipakai otomatis via GameAutoSetup.
///
/// Buat asset: Tools > Lifetopia > Create Bootstrap Config Asset
/// </summary>
[CreateAssetMenu(menuName = "Lifetopia/Bootstrap Config", fileName = "LifetopiaBootstrapConfig")]
public class LifetopiaBootstrapConfig : ScriptableObject
{
    const string ResourcesName = "LifetopiaBootstrapConfig";

    static LifetopiaBootstrapConfig _cached;

    // ── Singleton ─────────────────────────────────────────────────────────────

    public static LifetopiaBootstrapConfig Instance
    {
        get
        {
            if (_cached != null) return _cached;

            _cached = Resources.Load<LifetopiaBootstrapConfig>(ResourcesName);

            if (_cached == null)
            {
                // Auto-create runtime instance dengan defaults
                _cached = CreateInstance<LifetopiaBootstrapConfig>();
                _cached.name = ResourcesName + "_RuntimeDefaults";
                // GameAutoSetup.ApplyDefaults sudah dipanggil sebelum ini via
                // RuntimeInitializeOnLoadMethod(BeforeSceneLoad)
            }

            return _cached;
        }
    }

    public static void OverrideCache(LifetopiaBootstrapConfig cfg)
    {
        if (cfg != null) _cached = cfg;
    }

    public static void ClearCache() => _cached = null;

    // ── Camera ────────────────────────────────────────────────────────────────

    [Header("Camera")]
    public float orthographicSize = 5f;
    public Color cameraClearColor = new Color(0.08f, 0.12f, 0.18f, 1f);

    // ── Background ────────────────────────────────────────────────────────────

    [Header("Background Fit")]
    [Tooltip("Target tinggi BG dalam world units.")]
    public float backgroundFitWorldHeight  = 11f;
    [Tooltip("Multiplier scale BG. 1 = default.")]
    public float backgroundScaleMultiplier = 1f;
    public Vector3 backgroundPositionOffset = Vector3.zero;

    [Header("Biome Sprites (assign di Inspector untuk override path)")]
    public Sprite biomeFarmSprite;
    public Sprite biomeCitySprite;
    public Sprite biomeSuburbanSprite;
    public Sprite biomeGardenSprite;
    public Sprite biomeFishingSprite;

    [Header("Fallback Paths (Assets/...) jika sprite kosong")]
    public string pathFarm     = "Assets/image/new map/farm.png";
    public string pathCity     = "Assets/image/new map/city.png";
    public string pathSuburban = "Assets/image/new map/suburban.png";
    public string pathGarden   = "Assets/image/new map/garden.png";
    public string pathFishing  = "Assets/image/new map/fishing.png";

    // ── Character ─────────────────────────────────────────────────────────────

    [Header("Character")]
    public Vector3 characterScale         = new Vector3(0.34f, 0.34f, 1f);
    public Vector3 characterSpawnPosition = new Vector3(-3.25f, -3.65f, 0f);

    // ── Farm Plots ────────────────────────────────────────────────────────────

    [Header("Farm Plots")]
    public Vector3 plotOriginWorld = new Vector3(-3.95f, -3.08f, 0f);
    public float   plotStep        = 1.9f;
    public Vector3 plotVisualScale = new Vector3(2.1f, 1.2f, 1f);

    // ── UI Sprites ────────────────────────────────────────────────────────────

    [Header("UI Sprites (kosong = warna solid)")]
    public Sprite hudRibbonButtonSprite;
    public Sprite hudPurpleButtonSprite;
    public Sprite hotbarButtonSprite;

    [Header("Splash / Choose Map")]
    public Sprite splashLogoOverride;
    public Sprite splashMapCinematicOverride;
    public Sprite chooseMapBackgroundOverride;

    // ── Solana / Web3 ─────────────────────────────────────────────────────────

    [Header("Solana Devnet")]
    [Tooltip("RPC URL Alchemy Devnet. Tidak perlu diisi untuk play — mock mode aktif otomatis.")]
    public string solanaDevnetRpcUrl =
        "https://solana-devnet.g.alchemy.com/v2/JiVbTwHnF3qEGfs5AtgKR";

    public string alchemyApiKeySuffix = "JiVbTwHnF3qEGfs5AtgKR";

    [Tooltip("Mint address SPL token utility Alpha.")]
    public string alphaUtilityMintAddress =
        "ByrXMnACFFyvsL6d4yKFguCK8CNRJDMSWWshLejaApVu";

    [Tooltip("Matikan untuk skip chain verify saat development.")]
    public bool verifyMintOnWalletConnect = false;
}
