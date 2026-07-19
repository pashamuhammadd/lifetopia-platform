#if UNITY_EDITOR
using System.IO;
using UnityEditor;
using UnityEngine;

/// <summary>Editor-only: generate minimal map_*.unity from splash header (run once from menu).</summary>
public static class GenerateMapPlaceholderScenes
{
    const string SplashPath = "Assets/Scenes/splashscreen.unity";

    [MenuItem("Tools/Lifetopia/Generate Map Placeholder Scenes")]
    static void Generate()
    {
        string[] lines = File.ReadAllLines(SplashPath);
        if (lines.Length < 284)
        {
            Debug.LogError("[Lifetopia] splashscreen.unity too short.");
            return;
        }

        var sb = new System.Text.StringBuilder();
        for (int i = 0; i < 284; i++)
            sb.AppendLine(lines[i]);

        string head = sb.ToString();

        Make(head, "map_city", 940100001, 940100002, 940100003, 940100004, 1);
        Make(head, "map_garden", 940200001, 940200002, 940200003, 940200004, 2);
        Make(head, "map_suburban", 940300001, 940300002, 940300003, 940300004, 3);
        Make(head, "map_fishing", 940400001, 940400002, 940400003, 940400004, 4);

        AssetDatabase.Refresh();
        Debug.Log("[Lifetopia] map_city, map_garden, map_suburban, map_fishing written. Add them to Build Settings.");
    }

    static void Make(string head, string name, int go, int tr, int pl, int fsm, int biome)
    {
        string path = $"Assets/Scenes/{name}.unity";
        string driver =
            $"--- !u!1 &{go}\n" +
            "GameObject:\n" +
            "  m_ObjectHideFlags: 0\n" +
            "  m_CorrespondingSourceObject: {fileID: 0}\n" +
            "  m_PrefabInstance: {fileID: 0}\n" +
            "  m_PrefabAsset: {fileID: 0}\n" +
            "  serializedVersion: 6\n" +
            "  m_Component:\n" +
            $"  - component: {{fileID: {tr}}}\n" +
            $"  - component: {{fileID: {pl}}}\n" +
            $"  - component: {{fileID: {fsm}}}\n" +
            "  m_Layer: 0\n" +
            "  m_Name: Lifetopia_LevelDriver\n" +
            "  m_TagString: Untagged\n" +
            "  m_Icon: {fileID: 0}\n" +
            "  m_NavMeshLayer: 0\n" +
            "  m_StaticEditorFlags: 0\n" +
            "  m_IsActive: 1\n" +
            $"--- !u!4 &{tr}\n" +
            "Transform:\n" +
            "  m_ObjectHideFlags: 0\n" +
            "  m_CorrespondingSourceObject: {fileID: 0}\n" +
            "  m_PrefabInstance: {fileID: 0}\n" +
            "  m_PrefabAsset: {fileID: 0}\n" +
            $"  m_GameObject: {{fileID: {go}}}\n" +
            "  serializedVersion: 2\n" +
            "  m_LocalRotation: {x: 0, y: 0, z: 0, w: 1}\n" +
            "  m_LocalPosition: {x: 0, y: 0, z: 0}\n" +
            "  m_LocalScale: {x: 1, y: 1, z: 1}\n" +
            "  m_ConstrainProportionsScale: 0\n" +
            "  m_Children: []\n" +
            "  m_Father: {fileID: 0}\n" +
            "  m_LocalEulerAnglesHint: {x: 0, y: 0, z: 0}\n" +
            $"--- !u!114 &{pl}\n" +
            "MonoBehaviour:\n" +
            "  m_ObjectHideFlags: 0\n" +
            "  m_CorrespondingSourceObject: {fileID: 0}\n" +
            "  m_PrefabInstance: {fileID: 0}\n" +
            "  m_PrefabAsset: {fileID: 0}\n" +
            $"  m_GameObject: {{fileID: {go}}}\n" +
            "  m_Enabled: 1\n" +
            "  m_EditorHideFlags: 0\n" +
            "  m_Script: {fileID: 11500000, guid: 15d9dfdbbece4ad6a623ba564a0ae711, type: 3}\n" +
            "  m_Name: \n" +
            "  m_EditorClassIdentifier: \n" +
            "  configOverride: {fileID: 0}\n" +
            $"  levelBiome: {biome}\n" +
            "  enableFarmPlots: 0\n" +
            "  enableHudAndHotbar: 1\n" +
            "  ensureLevelFsm: 1\n" +
            $"--- !u!114 &{fsm}\n" +
            "MonoBehaviour:\n" +
            "  m_ObjectHideFlags: 0\n" +
            "  m_CorrespondingSourceObject: {fileID: 0}\n" +
            "  m_PrefabInstance: {fileID: 0}\n" +
            "  m_PrefabAsset: {fileID: 0}\n" +
            $"  m_GameObject: {{fileID: {go}}}\n" +
            "  m_Enabled: 1\n" +
            "  m_EditorHideFlags: 0\n" +
            "  m_Script: {fileID: 11500000, guid: c9a6e4d13f814b409e5d73f1b2c6d8ef, type: 3}\n" +
            "  m_Name: \n" +
            "  m_EditorClassIdentifier: \n" +
            "  state: 0\n" +
            "--- !u!1660057539 &9223372036854775807\n" +
            "SceneRoots:\n" +
            "  m_ObjectHideFlags: 0\n" +
            "  m_Roots:\n" +
            "  - {fileID: 519420032}\n" +
            "  - {fileID: 673328998}\n" +
            $"  - {{fileID: {tr}}}\n";

        File.WriteAllText(path, head + driver);
    }
}
#endif
