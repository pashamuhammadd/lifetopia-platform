using Combat.Interfaces;
using Plugins.Lowscope.ComponentSaveSystem.Interfaces;
using System.Collections;
using UnityEngine;

namespace Combat.Listeners
{
    /// <summary>
    /// Attach to any prefab that can be destroyed (grass, rocks, trees, etc.).
    /// Persists the "destroyed" state so the object stays gone after restart.
    /// 
    /// Setup:
    ///   1. Add this component to the prefab (or to each child that can die independently).
    ///   2. Assign the Health component in the Inspector.
    ///   3. Ensure the prefab hierarchy has a Saveable component.
    /// </summary>
    public class SaveDestroyedState : MonoBehaviour, IKillable, ISaveable
    {
        [SerializeField] private Health health;

        private bool isDestroyed;

        private void Awake()
        {
            if (health != null)
                health.AddListener(this);
        }

        public void OnDeath(Health h)
        {
            isDestroyed = true;
        }

        // ── ISaveable ────────────────────────────────────────────────────

        [System.Serializable]
        private struct SaveData
        {
            public bool isDestroyed;
        }

        public string OnSave()
        {
            return JsonUtility.ToJson(new SaveData { isDestroyed = isDestroyed });
        }

        public void OnLoad(string data)
        {
            SaveData d = JsonUtility.FromJson<SaveData>(data);
            isDestroyed = d.isDestroyed;

            if (isDestroyed)
            {
                gameObject.SetActive(false);
            }
        }

        public bool OnSaveCondition() => true;
    }
}
