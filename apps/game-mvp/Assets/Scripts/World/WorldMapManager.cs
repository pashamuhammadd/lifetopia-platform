using UnityEngine;
using UnityEngine.SceneManagement;
using Event.Events;

namespace World
{
    /// <summary>
    /// Manages toggling a World Map GameObject and navigating to different area scenes.
    /// Simplified to use GameObject activation instead of scene loading for the map itself.
    /// </summary>
    [AddComponentMenu("Farming Kit/World/World Map Manager")]
    public class WorldMapManager : MonoBehaviour
    {
        [Header("Settings")]
        [SerializeField] private GameObject mapRoot;
        
        [Header("Events")]
        [SerializeField] private GameEvent toggleMapEvent;
        [SerializeField] private BoolEvent pauzeEvent;

        // Singleton access for UI buttons and persistent state
        public static WorldMapManager Instance { get; private set; }

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                // Ensure the Core root stays persistent
                DontDestroyOnLoad(gameObject.transform.root.gameObject);
                
                // First time visibility logic
                bool hasShownBefore = PlayerPrefs.GetInt("WorldMapInitiallyShown", 0) == 1;

                if (!hasShownBefore)
                {
                    // First time Load: Show map and pause
                    if (mapRoot != null)
                        mapRoot.SetActive(true);

                    if (pauzeEvent != null)
                        pauzeEvent.Invoke(true);

                    PlayerPrefs.SetInt("WorldMapInitiallyShown", 1);
                    PlayerPrefs.Save();
                }
                else
                {
                    // Not first time: Keep hidden
                    if (mapRoot != null)
                        mapRoot.SetActive(false);
                }
            }
            else if (Instance != this)
            {
                Destroy(gameObject);
            }
        }

        private void OnEnable()
        {
            if (toggleMapEvent != null)
                toggleMapEvent.AddListener(ToggleMap);
        }

        private void OnDisable()
        {
            if (toggleMapEvent != null)
                toggleMapEvent.RemoveListener(ToggleMap);
        }

        /// <summary>
        /// Toggles the map UI visibility.
        /// </summary>
        public void ToggleMap()
        {
            if (mapRoot != null)
            {
                bool newState = !mapRoot.activeSelf;
                mapRoot.SetActive(newState);
                
                if (pauzeEvent != null)
                    pauzeEvent.Invoke(newState);

                Debug.Log($"[WorldMapManager] Map toggled: {newState}");
            }
        }

        /// <summary>
        /// Explicitly closes the map UI.
        /// </summary>
        public void CloseMap()
        {
            if (mapRoot != null)
            {
                mapRoot.SetActive(false);
                
                if (pauzeEvent != null)
                    pauzeEvent.Invoke(false);

                Debug.Log($"[WorldMapManager] Map closed.");
            }
        }

        /// <summary>
        /// Navigates to a specific area and closes the map.
        /// </summary>
        /// <param name="areaSceneName">Target scene name</param>
        public void NavigateToArea(string areaSceneName)
        {
            string currentScene = SceneManager.GetActiveScene().name;

            if (areaSceneName == currentScene)
            {
                Debug.Log($"[WorldMapManager] Already in {areaSceneName}. Closing map.");
            }
            else
            {
                Debug.Log($"[WorldMapManager] Navigating to {areaSceneName} (Single Mode)");
                SceneManager.LoadScene(areaSceneName, LoadSceneMode.Single);
            }

            if (mapRoot != null)
                CloseMap();
        }
    }
}
