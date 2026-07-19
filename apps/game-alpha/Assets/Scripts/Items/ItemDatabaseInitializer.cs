using UnityEngine;

namespace Lifetopia.Items
{
    /// <summary>Auto-initialize ItemDatabase saat game start.</summary>
    public class ItemDatabaseInitializer : MonoBehaviour
    {
        void Awake() => ItemDatabase.Initialize();
    }
}
