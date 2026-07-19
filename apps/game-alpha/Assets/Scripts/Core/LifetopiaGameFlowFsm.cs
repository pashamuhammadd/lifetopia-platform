using System;
using UnityEngine;
using UnityEngine.SceneManagement;

/// <summary>
/// FSM alur GLOBAL game — dari boot sampai gameplay.
///
/// FLOW:
///   Boot → Splash → MapSelect → Travel → CinematicIntro → Gameplay ←→ Paused
///                                                                   → GameOver
///                                                                   → Credits
///
/// CARA PAKAI:
///   LifetopiaGameFlowFsm.Instance.BeginTravel();
///   LifetopiaGameFlowFsm.Instance.OnStateChanged += (prev, next) => { ... };
/// </summary>
[DisallowMultipleComponent]
public class LifetopiaGameFlowFsm : MonoBehaviour
{
    // ── Singleton ─────────────────────────────────────────────────────────────
    public static LifetopiaGameFlowFsm Instance { get; private set; }

    // ── States ────────────────────────────────────────────────────────────────
    public enum FlowState
    {
        /// <summary>Inisialisasi awal — sebelum scene pertama load.</summary>
        Boot,

        /// <summary>Splash screen / intro cinematic game.</summary>
        Splash,

        /// <summary>Layar pilih map / world map.</summary>
        MapSelect,

        /// <summary>Transisi antar scene (loading).</summary>
        Travel,

        /// <summary>Cinematic title card biome sedang berjalan.</summary>
        CinematicIntro,

        /// <summary>Gameplay aktif — player bisa bergerak.</summary>
        Gameplay,

        /// <summary>Game di-pause (overlay pause menu).</summary>
        Paused,

        /// <summary>Game over / player mati.</summary>
        GameOver,

        /// <summary>Credits / end screen.</summary>
        Credits,
    }

    // ── Inspector ─────────────────────────────────────────────────────────────
    [Header("State saat ini (read-only)")]
    [SerializeField] FlowState _current = FlowState.Boot;

    // ── Public Properties ─────────────────────────────────────────────────────
    public FlowState Current        => _current;
    public FlowState PreviousState  { get; private set; } = FlowState.Boot;
    public string    ActiveBiome    { get; private set; } = "";
    public string    ActiveSceneName{ get; private set; } = "";

    /// <summary>True kalau gameplay aktif dan tidak di-pause.</summary>
    public bool IsPlaying => _current == FlowState.Gameplay;

    // ── Events ────────────────────────────────────────────────────────────────

    /// <summary>Dipanggil setiap state berubah. (prev, next)</summary>
    public event Action<FlowState, FlowState> OnStateChanged;

    /// <summary>Dipanggil saat masuk Gameplay.</summary>
    public event Action<string> OnGameplayStarted; // biomeKey

    /// <summary>Dipanggil saat Travel dimulai.</summary>
    public event Action OnTravelStarted;

    // ─────────────────────────────────────────────────────────────────────────

    void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject);
    }

    void OnEnable()  => SceneManager.sceneLoaded += OnSceneLoaded;
    void OnDisable() => SceneManager.sceneLoaded -= OnSceneLoaded;

    // ── Scene Auto-Detection ──────────────────────────────────────────────────

    void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        string n = scene.name.ToLowerInvariant();

        if (n.Contains("splash"))
        {
            Set(FlowState.Splash);
        }
        else if (n.Contains("choose") || n.Contains("map select"))
        {
            Set(FlowState.MapSelect);
        }
        else if (IsWorldScene(n))
        {
            ActiveSceneName = scene.name;
            // Gameplay state akan di-set oleh EnterLevel() setelah cinematic
            Set(FlowState.CinematicIntro);
        }
        else if (n.Contains("credits"))
        {
            Set(FlowState.Credits);
        }
    }

    static bool IsWorldScene(string n)
    {
        return n.Contains("farm")     ||
               n.Contains("map_city") ||
               n.Contains("map_garden") ||
               n.Contains("map_suburban") ||
               n.Contains("map_fishing");
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /// <summary>Mulai travel ke scene baru.</summary>
    public void BeginTravel()
    {
        Set(FlowState.Travel);
        OnTravelStarted?.Invoke();
    }

    /// <summary>
    /// Dipanggil dari LevelCinematicIntro setelah cinematic selesai.
    /// Masuk ke Gameplay state.
    /// </summary>
    public void EnterLevel(string biomeKey, string unitySceneName)
    {
        ActiveBiome     = biomeKey ?? "";
        ActiveSceneName = unitySceneName ?? "";
        Set(FlowState.Gameplay);
        OnGameplayStarted?.Invoke(ActiveBiome);
    }

    /// <summary>Pause / resume toggle.</summary>
    public void SetPaused(bool paused)
    {
        if (paused && _current == FlowState.Gameplay)
            Set(FlowState.Paused);
        else if (!paused && _current == FlowState.Paused)
            Set(FlowState.Gameplay);
    }

    /// <summary>Toggle pause.</summary>
    public void TogglePause() => SetPaused(_current != FlowState.Paused);

    /// <summary>Game over.</summary>
    public void TriggerGameOver()
    {
        Set(FlowState.GameOver);
    }

    /// <summary>Ke credits.</summary>
    public void GoToCredits()
    {
        Set(FlowState.Credits);
    }

    /// <summary>Kembali ke map select.</summary>
    public void ReturnToMapSelect()
    {
        BeginTravel();
        if (SceneTransitionManager.Instance != null)
            SceneTransitionManager.Instance.LoadScene("choose map");
        else
            SceneManager.LoadScene("choose map");
    }

    // ── Internal ──────────────────────────────────────────────────────────────

    void Set(FlowState next)
    {
        if (_current == next) return;

        FlowState prev = _current;
        PreviousState  = prev;
        _current       = next;

        OnStateChanged?.Invoke(prev, next);
    }

    // ── Debug ─────────────────────────────────────────────────────────────────

#if UNITY_EDITOR
    [UnityEngine.ContextMenu("Debug: Print Flow State")]
    void DebugPrint() =>
        UnityEngine.Debug.Log($"[GameFlowFSM] {PreviousState} → {_current} | Biome: {ActiveBiome}");
#endif
}
