using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

namespace World
{
    /// <summary>
    /// Helper script for buttons in the World Map scene to talk to the WorldMapManager
    /// which resides in the persistent Core scene.
    /// </summary>
    [RequireComponent(typeof(Button))]
    public class WorldMapButton : MonoBehaviour
    {
        [Tooltip("The name of the scene to navigate to (e.g., Level_Farm)")]
        [SerializeField] private string targetAreaName;

        private void Start()
        {
            GetComponent<Button>().onClick.AddListener(OnClick);
        }

        private void OnClick()
        {
            var manager = WorldMapManager.Instance;
            
            if (manager == null)
            {
                manager = FindFirstObjectByType<WorldMapManager>();
            }

            if (manager != null)
            {
                if (string.IsNullOrEmpty(targetAreaName))
                {
                    manager.CloseMap();
                }
                else
                {
                    manager.NavigateToArea(targetAreaName);
                }
            }
            else
            {
                // Only load if name is not empty
                if (!string.IsNullOrEmpty(targetAreaName))
                {
                    SceneManager.LoadScene(targetAreaName);
                }
                
                Debug.LogWarning("[WorldMapButton] WorldMapManager not found in scene! Ensure WorldMapManager is in your Core scene and that the Core scene is loaded.");
            }
        }
    }
}
