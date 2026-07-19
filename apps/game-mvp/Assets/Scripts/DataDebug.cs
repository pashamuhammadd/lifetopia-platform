using Plugins.Lowscope.ComponentSaveSystem;
using Plugins.Lowscope.ComponentSaveSystem.Core;
using UnityEngine;

public class DebugSaveReset : MonoBehaviour
{
    [ContextMenu("Delete Slot 0")]
    private void DeleteSlot0()
    {
        // Initialize the cache first so DeleteSave doesn't crash on null
        SaveFileUtility.ObtainSlotSaveFileNames();
        SaveFileUtility.DeleteSave(0);
        PlayerPrefs.DeleteAll();
        Debug.Log("Save slot 0 deleted.");
    }

    [ContextMenu("Delete All Slots")]
    private void DeleteAllSlots()
    {
        // DeleteAllSaveFiles() doesn't rely on the cache — safe to call anytime
        SaveFileUtility.DeleteAllSaveFiles();
        PlayerPrefs.DeleteAll();
        Debug.Log("All save slots deleted.");
    }
}