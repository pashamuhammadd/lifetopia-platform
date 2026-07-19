using UnityEngine;

/// <summary>
/// Taruh komponen ini di scene gameplay (satu per scene).
/// Tugasnya:
///   1. Spawn ground collider agar karakter tidak jatuh
///   2. Auto-setup komponen player (WASD, physics) dari GameObject bertag "Player"
///   3. Build HUD + hotbar
///   4. Notify FSM
///
/// Karakter, background, dan kamera tetap diatur manual di scene.
/// </summary>
[DisallowMultipleComponent]
public class LifetopiaPlayableLevel : MonoBehaviour
{
    public enum WorldBiomeKind { Farm, City, Garden, Suburban, Fishing }

    [Header("Biome scene ini")]
    public WorldBiomeKind levelBiome = WorldBiomeKind.Farm;

    [Header("Konten")]
    [Tooltip("Aktifkan farm plots (hanya relevan untuk scene Farm).")]
    public bool enableFarmPlots = false;

    [Tooltip("Tampilkan HUD dan hotbar gameplay.")]
    public bool enableHudAndHotbar = true;

    [Header("Ground Collider (auto-spawn)")]
    [Tooltip("Posisi Y ground collider di world space.")]
    public float groundY      = -4.45f;
    [Tooltip("Lebar ground collider.")]
    public float groundWidth  = 200f;

    [Header("Global config (opsional)")]
    [Tooltip("Override LifetopiaBootstrapConfig untuk scene ini saja.")]
    public LifetopiaBootstrapConfig configOverride;

    [Header("FSM lokal")]
    [Tooltip("Otomatis tambahkan LifetopiaLevelGameplayFsm jika belum ada.")]
    public bool ensureLevelFsm = true;

    // ─────────────────────────────────────────────────────────────────────────

    void Reset()
    {
        levelBiome         = WorldBiomeKind.Farm;
        enableFarmPlots    = false;
        enableHudAndHotbar = true;
        ensureLevelFsm     = true;
        groundY            = -4.45f;
        groundWidth        = 200f;
    }

    void OnValidate()
    {
        if (levelBiome != WorldBiomeKind.Farm)
            enableFarmPlots = false;
    }

    void Awake()
    {
        if (ensureLevelFsm && GetComponent<LifetopiaLevelGameplayFsm>() == null)
            gameObject.AddComponent<LifetopiaLevelGameplayFsm>();
    }

    void Start()
    {
        // Auto-load config dari Resources kalau tidak di-assign manual
        if (configOverride == null)
            configOverride = LifetopiaBootstrapConfig.Instance;

        if (configOverride != null)
            LifetopiaBootstrapConfig.OverrideCache(configOverride);

        // 1. Spawn ground collider
        EnsureGroundCollider();

        // 2. Auto-setup player
        EnsurePlayerSetup();

        // 3. Sync biome ke GameState
        LifetopiaGameState.Instance?.SetTravelBiome(BiomeKey());

        // 4. Build HUD + notify FSM
        var runner = LifetopiaAutoPlayableScene.Instance;
        if (runner == null)
        {
            UnityEngine.Debug.LogError("[LifetopiaPlayableLevel] LifetopiaAutoPlayableScene tidak ditemukan.");
            return;
        }
        runner.BuildFromPlayableLevel(this);

        // 5. Jalankan cinematic intro (FSM sudah di CinematicIntro state dari Awake)
        StartCinematicIntro();
    }

    void StartCinematicIntro()
    {
        // Tambah LevelCinematicIntro ke GameObject ini dan langsung play
        LevelCinematicIntro intro = gameObject.AddComponent<LevelCinematicIntro>();
        intro.Play(levelBiome);
    }

    // ── Ground Collider ───────────────────────────────────────────────────────

    private void EnsureGroundCollider()
    {
        // Jangan buat duplikat
        if (GameObject.Find("__GroundCollider__") != null) return;

        int groundIdx = LayerMask.NameToLayer("Ground");
        if (groundIdx < 0)
        {
            UnityEngine.Debug.LogWarning("[LifetopiaPlayableLevel] Layer 'Ground' tidak ada — " +
                             "ground collider pakai Default. Tambah layer 'Ground' di Project Settings.");
            groundIdx = 0;
        }

        GameObject g = new GameObject("__GroundCollider__");
        g.layer = groundIdx;
        g.transform.position = new Vector3(0f, groundY, 0f);

        BoxCollider2D bc = g.AddComponent<BoxCollider2D>();
        bc.size = new Vector2(groundWidth, 1f);

        UnityEngine.Debug.Log($"[LifetopiaPlayableLevel] Ground collider spawned di Y={groundY}");
    }

    // ── Player Setup ──────────────────────────────────────────────────────────

    private void EnsurePlayerSetup()
    {
        GameObject playerGO = GameObject.FindWithTag("Player");
        if (playerGO == null)
        {
            UnityEngine.Debug.LogWarning("[LifetopiaPlayableLevel] Tidak ada GameObject bertag 'Player' di scene. " +
                             "Beri tag 'Player' ke karakter kamu.");
            return;
        }

        // Kalau sudah ada PlayerSetup, dia sudah handle sendiri di Awake
        if (playerGO.GetComponent<PlayerSetup>() != null) return;

        // Belum ada — tambahkan dan setup sekarang
        PlayerSetup ps = playerGO.AddComponent<PlayerSetup>();
        ps.SetupAll();
    }

    // ── Biome ─────────────────────────────────────────────────────────────────

    public string BiomeKey()
    {
        switch (levelBiome)
        {
            case WorldBiomeKind.City:     return "CITY";
            case WorldBiomeKind.Garden:   return "GARDEN";
            case WorldBiomeKind.Suburban: return "SUBURBAN";
            case WorldBiomeKind.Fishing:  return "FISHING";
            default:                      return "FARM";
        }
    }
}
