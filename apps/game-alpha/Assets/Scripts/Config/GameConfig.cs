using UnityEngine;

namespace Lifetopia.Config
{
    /// <summary>
    /// Runtime game config — semua tunable value di satu tempat.
    /// Tidak butuh ScriptableObject. Auto-load dari PlayerPrefs.
    /// </summary>
    public class GameConfig : MonoBehaviour
    {
        public static GameConfig Instance { get; private set; }

        // ── Audio ─────────────────────────────────────────────────────────────
        public float MasterVolume { get; private set; } = 1f;
        public float MusicVolume  { get; private set; } = 0.7f;
        public float SfxVolume    { get; private set; } = 1f;

        // ── Graphics ──────────────────────────────────────────────────────────
        public bool  ShowFps      { get; private set; } = false;
        public bool  ReduceMotion { get; private set; } = false;

        // ── Gameplay ──────────────────────────────────────────────────────────
        public bool  ShowTutorial { get; private set; } = true;
        public bool  ShowHints    { get; private set; } = true;
        public float GameSpeed    { get; private set; } = 1f;

        // ── Web3 ──────────────────────────────────────────────────────────────
        public bool  Web3Enabled  { get; private set; } = true;
        public bool  MockMode     { get; private set; } = true;
        public string RpcUrl      { get; private set; } = Constants.GameConstants.SOLANA_DEVNET_RPC;

        const string KEY_PREFIX = "lf_cfg_";

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            Load();
        }

        // ── Setters ───────────────────────────────────────────────────────────

        public void SetMasterVolume(float v)
        {
            MasterVolume = Mathf.Clamp01(v);
            Audio.AudioManager.Instance?.SetMasterVolume(MasterVolume);
            Save();
        }

        public void SetMusicVolume(float v)
        {
            MusicVolume = Mathf.Clamp01(v);
            Audio.AudioManager.Instance?.SetMusicVolume(MusicVolume);
            Save();
        }

        public void SetSfxVolume(float v)
        {
            SfxVolume = Mathf.Clamp01(v);
            Audio.AudioManager.Instance?.SetSfxVolume(SfxVolume);
            Save();
        }

        public void SetShowFps(bool show)    { ShowFps = show; Save(); }
        public void SetReduceMotion(bool v)  { ReduceMotion = v; Save(); }
        public void SetShowTutorial(bool v)  { ShowTutorial = v; Save(); }
        public void SetMockMode(bool v)      { MockMode = v; Save(); }

        // ── Persistence ───────────────────────────────────────────────────────

        void Save()
        {
            PlayerPrefs.SetFloat(KEY_PREFIX + "master_vol", MasterVolume);
            PlayerPrefs.SetFloat(KEY_PREFIX + "music_vol",  MusicVolume);
            PlayerPrefs.SetFloat(KEY_PREFIX + "sfx_vol",    SfxVolume);
            PlayerPrefs.SetInt(KEY_PREFIX + "show_fps",     ShowFps ? 1 : 0);
            PlayerPrefs.SetInt(KEY_PREFIX + "reduce_motion",ReduceMotion ? 1 : 0);
            PlayerPrefs.SetInt(KEY_PREFIX + "show_tutorial",ShowTutorial ? 1 : 0);
            PlayerPrefs.SetInt(KEY_PREFIX + "mock_mode",    MockMode ? 1 : 0);
            PlayerPrefs.Save();
        }

        void Load()
        {
            MasterVolume  = PlayerPrefs.GetFloat(KEY_PREFIX + "master_vol", 1f);
            MusicVolume   = PlayerPrefs.GetFloat(KEY_PREFIX + "music_vol",  0.7f);
            SfxVolume     = PlayerPrefs.GetFloat(KEY_PREFIX + "sfx_vol",    1f);
            ShowFps       = PlayerPrefs.GetInt(KEY_PREFIX + "show_fps",     0) == 1;
            ReduceMotion  = PlayerPrefs.GetInt(KEY_PREFIX + "reduce_motion",0) == 1;
            ShowTutorial  = PlayerPrefs.GetInt(KEY_PREFIX + "show_tutorial",1) == 1;
            MockMode      = PlayerPrefs.GetInt(KEY_PREFIX + "mock_mode",    1) == 1;
        }

        public void ResetToDefaults()
        {
            MasterVolume = 1f; MusicVolume = 0.7f; SfxVolume = 1f;
            ShowFps = false; ReduceMotion = false;
            ShowTutorial = true; MockMode = true;
            Save();
        }
    }
}
