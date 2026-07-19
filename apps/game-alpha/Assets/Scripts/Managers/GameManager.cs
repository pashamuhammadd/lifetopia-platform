using UnityEngine;
using Lifetopia.Events;
using Lifetopia.SaveSystem;

namespace Lifetopia.Managers
{
    /// <summary>
    /// Root game manager — bootstrap semua sistem saat game start.
    /// Satu-satunya entry point yang perlu ada di scene pertama.
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        [Header("Auto-spawn Systems")]
        public bool spawnHttpClient      = true;
        public bool spawnRequestQueue    = true;
        public bool spawnConnectionMonitor = true;
        public bool spawnWeb3Service     = true;
        public bool spawnWalletManager   = true;
        public bool spawnAuthService     = true;
        public bool spawnApiServices     = true;
        public bool spawnSaveManager     = true;
        public bool spawnSceneLoader     = true;
        public bool spawnAudioManager    = true;

        public bool IsReady { get; private set; }

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            BootstrapSystems();
        }

        void BootstrapSystems()
        {
            if (spawnHttpClient)
                EnsureComponent<Lifetopia.Network.HttpClient>();
            if (spawnRequestQueue)
                EnsureComponent<Lifetopia.Network.RequestQueue>();
            if (spawnConnectionMonitor)
                EnsureComponent<Lifetopia.Network.ConnectionMonitor>();
            if (spawnWeb3Service)
                EnsureComponent<Lifetopia.Web3.Web3Service>();
            if (spawnWalletManager)
                EnsureComponent<Lifetopia.Wallet.WalletManager>();
            if (spawnAuthService)
                EnsureComponent<Lifetopia.Authentication.AuthService>();
            if (spawnApiServices)
            {
                EnsureComponent<Lifetopia.API.PlayerApiService>();
                EnsureComponent<Lifetopia.API.WalletApiService>();
                EnsureComponent<Lifetopia.API.EconomyApiService>();
            }
            if (spawnSaveManager)
                EnsureComponent<SaveManager>();
            if (spawnSceneLoader)
                EnsureComponent<Lifetopia.LoadSystem.SceneLoader>();
            if (spawnAudioManager)
                EnsureComponent<Lifetopia.Audio.AudioManager>();

            IsReady = true;
            UnityEngine.Debug.Log("[GameManager] All systems bootstrapped.");
        }

        T EnsureComponent<T>() where T : Component
        {
            var existing = FindObjectOfType<T>();
            if (existing != null) return existing;
            return gameObject.AddComponent<T>();
        }

        void OnApplicationQuit()
        {
            SaveManager.Instance?.Flush();
        }
    }
}
