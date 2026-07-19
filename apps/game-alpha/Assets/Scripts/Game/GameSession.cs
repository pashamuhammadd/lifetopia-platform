using System;
using UnityEngine;
using Lifetopia.Models;
using Lifetopia.Events;

namespace Lifetopia.Game
{
    /// <summary>
    /// Session data untuk satu sesi bermain.
    /// Reset setiap kali game dimulai, tidak di-persist.
    /// </summary>
    public class GameSession : MonoBehaviour
    {
        public static GameSession Instance { get; private set; }

        // ── Session Data ──────────────────────────────────────────────────────
        public string   SessionId       { get; private set; }
        public DateTime StartTime       { get; private set; }
        public string   CurrentBiome    { get; private set; } = "FARM";
        public string   CurrentScene    { get; private set; } = "";
        public int      GoldEarnedThisSession  { get; private set; }
        public int      CropsHarvestedThisSession { get; private set; }
        public int      CropsPlantedThisSession   { get; private set; }
        public float    PlayTimeSeconds { get; private set; }
        public bool     IsActive        { get; private set; }

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start()
        {
            BeginSession();
            GameEventBus.Subscribe<GoldChangedEvent>(e =>
            {
                if (e.Delta > 0) GoldEarnedThisSession += e.Delta;
            });
            GameEventBus.Subscribe<CropHarvestedEvent>(_ => CropsHarvestedThisSession++);
            GameEventBus.Subscribe<CropPlantedEvent>(_ => CropsPlantedThisSession++);
            GameEventBus.Subscribe<BiomeChangedEvent>(e => CurrentBiome = e.NewBiome);
            GameEventBus.Subscribe<SceneChangedEvent>(e =>
            {
                CurrentScene = e.SceneName;
                CurrentBiome = e.Biome;
            });
        }

        void Update()
        {
            if (IsActive) PlayTimeSeconds += Time.deltaTime;
        }

        public void BeginSession()
        {
            SessionId    = Guid.NewGuid().ToString("N").Substring(0, 12);
            StartTime    = DateTime.UtcNow;
            IsActive     = true;
            GoldEarnedThisSession     = 0;
            CropsHarvestedThisSession = 0;
            CropsPlantedThisSession   = 0;
            PlayTimeSeconds           = 0f;
            UnityEngine.Debug.Log($"[GameSession] Session started: {SessionId}");
        }

        public void EndSession()
        {
            IsActive = false;
            UnityEngine.Debug.Log($"[GameSession] Session ended. " +
                $"Duration: {PlayTimeSeconds:F0}s | " +
                $"Gold: {GoldEarnedThisSession} | " +
                $"Harvested: {CropsHarvestedThisSession}");
        }

        public string GetPlayTimeFormatted()
        {
            int mins = (int)(PlayTimeSeconds / 60);
            int secs = (int)(PlayTimeSeconds % 60);
            return $"{mins:00}:{secs:00}";
        }
    }
}
