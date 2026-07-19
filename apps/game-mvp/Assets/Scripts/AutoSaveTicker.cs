using Plugins.Lowscope.ComponentSaveSystem;
using UnityEngine;

/// <summary>
/// Attach to any persistent GameObject in the game scene.
/// Writes save data to disk (and flushes IndexedDB on WebGL) every N seconds.
/// </summary>
public class AutoSaveTicker : MonoBehaviour
{
    [SerializeField] private float intervalSeconds = 2f;

    private void Start() => InvokeRepeating(nameof(DoSave), intervalSeconds, intervalSeconds);

    private void DoSave() => SaveMaster.WriteActiveSaveToDisk();
}
