using System;
using UnityEngine;

/// <summary>
/// FSM lokal per scene gameplay — super lengkap, mudah diextend.
///
/// STATE MACHINE:
///   Bootstrap → CinematicIntro → Roaming ←→ UiModalOpen
///                                         ←→ FarmingPlot
///                                         ←→ Dialogue
///                                         ←→ ShopOpen
///                                         ←→ Cutscene
///                                         ←→ Paused
///                                         → LevelComplete
///                                         → LevelFailed
///
/// CARA PAKAI:
///   LifetopiaLevelGameplayFsm.Instance.Enter(LevelPlayState.ShopOpen);
///   LifetopiaLevelGameplayFsm.Instance.OpenShop();
///   LifetopiaLevelGameplayFsm.Instance.OnPlayStateChanged += (prev, next) => { ... };
/// </summary>
[DisallowMultipleComponent]
public class LifetopiaLevelGameplayFsm : MonoBehaviour
{
    // ── Singleton ─────────────────────────────────────────────────────────────
    public static LifetopiaLevelGameplayFsm Instance { get; private set; }

    // ── States ────────────────────────────────────────────────────────────────
    public enum LevelPlayState
    {
        /// <summary>Inisialisasi — sebelum scene siap.</summary>
        Bootstrap,

        /// <summary>Animasi cinematic title card sedang berjalan.</summary>
        CinematicIntro,

        /// <summary>Player bebas bergerak di dunia.</summary>
        Roaming,

        /// <summary>Modal UI terbuka (inventory, wallet, tasks, dll).</summary>
        UiModalOpen,

        /// <summary>Player sedang interaksi dengan farm plot.</summary>
        FarmingPlot,

        /// <summary>Dialog NPC sedang berjalan.</summary>
        Dialogue,

        /// <summary>Shop / toko terbuka.</summary>
        ShopOpen,

        /// <summary>Cutscene sedang berjalan (player tidak bisa gerak).</summary>
        Cutscene,

        /// <summary>Game di-pause.</summary>
        Paused,

        /// <summary>Level selesai dengan sukses.</summary>
        LevelComplete,

        /// <summary>Level gagal / game over.</summary>
        LevelFailed,
    }

    // ── Inspector ─────────────────────────────────────────────────────────────
    [Header("State saat ini (read-only di runtime)")]
    [SerializeField] LevelPlayState _state = LevelPlayState.Bootstrap;

    [Header("Settings")]
    [Tooltip("State sebelum CinematicIntro selesai tidak bisa di-interrupt.")]
    public bool lockInputDuringCinematic = true;

    [Tooltip("State yang tidak bisa di-pause (Bootstrap, CinematicIntro, LevelComplete, LevelFailed).")]
    public bool blockPauseDuringCinematic = true;

    // ── Public Properties ─────────────────────────────────────────────────────
    public LevelPlayState State        => _state;
    public LevelPlayState PreviousState { get; private set; } = LevelPlayState.Bootstrap;

    /// <summary>True kalau player bisa gerak (Roaming).</summary>
    public bool CanMove => _state == LevelPlayState.Roaming;

    /// <summary>True kalau input player harus diblokir.</summary>
    public bool InputBlocked =>
        _state == LevelPlayState.Bootstrap      ||
        _state == LevelPlayState.CinematicIntro ||
        _state == LevelPlayState.Cutscene       ||
        _state == LevelPlayState.LevelComplete  ||
        _state == LevelPlayState.LevelFailed;

    // ── Events ────────────────────────────────────────────────────────────────

    /// <summary>Dipanggil setiap kali state berubah. (prev, next)</summary>
    public event Action<LevelPlayState, LevelPlayState> OnPlayStateChanged;

    /// <summary>Dipanggil saat masuk Roaming (player bebas gerak).</summary>
    public event Action OnRoamingStarted;

    /// <summary>Dipanggil saat CinematicIntro selesai.</summary>
    public event Action OnCinematicIntroFinished;

    /// <summary>Dipanggil saat level selesai.</summary>
    public event Action<bool> OnLevelEnded; // true = complete, false = failed

    // ── State sebelum pause (untuk resume) ───────────────────────────────────
    LevelPlayState _stateBeforePause = LevelPlayState.Roaming;

    // ─────────────────────────────────────────────────────────────────────────

    void Awake()
    {
        // Singleton per-scene (bukan DontDestroyOnLoad)
        if (Instance != null && Instance != this)
        {
            Destroy(this);
            return;
        }
        Instance = this;
    }

    void OnDestroy()
    {
        if (Instance == this) Instance = null;
    }

    void Start()
    {
        // Mulai dari CinematicIntro — akan di-trigger oleh LevelCinematicIntro
        Enter(LevelPlayState.CinematicIntro);
    }

    // ── Core State Machine ────────────────────────────────────────────────────

    /// <summary>
    /// Pindah ke state baru. Validasi transisi dilakukan di sini.
    /// </summary>
    public bool Enter(LevelPlayState next)
    {
        if (_state == next) return false;

        // Blokir transisi yang tidak valid
        if (!IsTransitionAllowed(_state, next))
        {
            UnityEngine.Debug.LogWarning($"[LevelFSM] Transisi {_state} → {next} tidak diizinkan.");
            return false;
        }

        LevelPlayState prev = _state;
        PreviousState = prev;
        _state = next;

        OnExitState(prev);
        OnEnterState(next, prev);

        OnPlayStateChanged?.Invoke(prev, next);
        return true;
    }

    // ── Transition Validation ─────────────────────────────────────────────────

    bool IsTransitionAllowed(LevelPlayState from, LevelPlayState to)
    {
        // Dari Bootstrap hanya bisa ke CinematicIntro
        if (from == LevelPlayState.Bootstrap)
            return to == LevelPlayState.CinematicIntro;

        // Dari LevelComplete / LevelFailed tidak bisa kemana-mana (terminal state)
        if (from == LevelPlayState.LevelComplete || from == LevelPlayState.LevelFailed)
            return false;

        // Dari CinematicIntro hanya bisa ke Roaming
        if (from == LevelPlayState.CinematicIntro)
            return to == LevelPlayState.Roaming;

        // Semua state lain bisa ke Paused (kecuali yang diblokir)
        if (to == LevelPlayState.Paused)
        {
            if (blockPauseDuringCinematic && from == LevelPlayState.CinematicIntro)
                return false;
            return true;
        }

        // Dari Paused hanya bisa resume ke state sebelumnya
        if (from == LevelPlayState.Paused)
            return to == _stateBeforePause || to == LevelPlayState.Roaming;

        // Semua transisi lain diizinkan
        return true;
    }

    // ── State Enter / Exit Hooks ──────────────────────────────────────────────

    void OnEnterState(LevelPlayState state, LevelPlayState from)
    {
        switch (state)
        {
            case LevelPlayState.Roaming:
                Time.timeScale = 1f;
                OnRoamingStarted?.Invoke();
                break;

            case LevelPlayState.Paused:
                _stateBeforePause = from;
                Time.timeScale = 0f;
                break;

            case LevelPlayState.Cutscene:
            case LevelPlayState.CinematicIntro:
                Time.timeScale = 1f;
                break;

            case LevelPlayState.LevelComplete:
                Time.timeScale = 0.5f; // slow-mo saat complete
                OnLevelEnded?.Invoke(true);
                break;

            case LevelPlayState.LevelFailed:
                Time.timeScale = 0f;
                OnLevelEnded?.Invoke(false);
                break;
        }
    }

    void OnExitState(LevelPlayState state)
    {
        switch (state)
        {
            case LevelPlayState.CinematicIntro:
                OnCinematicIntroFinished?.Invoke();
                break;

            case LevelPlayState.Paused:
                Time.timeScale = 1f;
                break;
        }
    }

    // ── Convenience Methods ───────────────────────────────────────────────────

    /// <summary>Cinematic intro selesai → mulai Roaming.</summary>
    public void FinishCinematicIntro()  => Enter(LevelPlayState.Roaming);

    /// <summary>Buka modal UI (inventory, wallet, dll).</summary>
    public void OpenUiModal()           => Enter(LevelPlayState.UiModalOpen);

    /// <summary>Tutup modal UI → kembali Roaming.</summary>
    public void CloseUiModal()          => Enter(LevelPlayState.Roaming);

    /// <summary>Masuk ke farm plot.</summary>
    public void EnterFarmingPlot()      => Enter(LevelPlayState.FarmingPlot);

    /// <summary>Keluar dari farm plot.</summary>
    public void ExitFarmingPlot()       => Enter(LevelPlayState.Roaming);

    /// <summary>Mulai dialog NPC.</summary>
    public void StartDialogue()         => Enter(LevelPlayState.Dialogue);

    /// <summary>Selesai dialog NPC.</summary>
    public void EndDialogue()           => Enter(LevelPlayState.Roaming);

    /// <summary>Buka toko.</summary>
    public void OpenShop()              => Enter(LevelPlayState.ShopOpen);

    /// <summary>Tutup toko.</summary>
    public void CloseShop()             => Enter(LevelPlayState.Roaming);

    /// <summary>Mulai cutscene.</summary>
    public void StartCutscene()         => Enter(LevelPlayState.Cutscene);

    /// <summary>Selesai cutscene.</summary>
    public void EndCutscene()           => Enter(LevelPlayState.Roaming);

    /// <summary>Pause game.</summary>
    public void Pause()                 => Enter(LevelPlayState.Paused);

    /// <summary>Resume dari pause.</summary>
    public void Resume()
    {
        if (_state == LevelPlayState.Paused)
            Enter(_stateBeforePause);
    }

    /// <summary>Toggle pause.</summary>
    public void TogglePause()
    {
        if (_state == LevelPlayState.Paused) Resume();
        else Pause();
    }

    /// <summary>Level selesai sukses.</summary>
    public void CompleteLevel()         => Enter(LevelPlayState.LevelComplete);

    /// <summary>Level gagal.</summary>
    public void FailLevel()             => Enter(LevelPlayState.LevelFailed);

    // ── Debug ─────────────────────────────────────────────────────────────────

    void Update()
    {
        // ESC = toggle pause (hanya di Roaming atau Paused)
        if (UnityEngine.Input.GetKeyDown(KeyCode.Escape))
        {
            if (_state == LevelPlayState.Roaming || _state == LevelPlayState.Paused)
                TogglePause();
        }
    }

#if UNITY_EDITOR
    [UnityEngine.ContextMenu("Debug: Print State")]
    void DebugPrintState() =>
        UnityEngine.Debug.Log($"[LevelFSM] State: {_state} | Prev: {PreviousState} | CanMove: {CanMove}");
#endif
}
