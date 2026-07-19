#if UNITY_EDITOR
using UnityEditor;
using UnityEngine;

/// <summary>
/// Menu editor Lifetopia — Tools > Lifetopia > ...
/// Semua setup bisa dilakukan dari sini tanpa assign manual di Inspector.
/// </summary>
static class LifetopiaEditorMenus
{
    const string ResourcesDir = "Assets/Resources";
    const string ConfigPath   = ResourcesDir + "/LifetopiaBootstrapConfig.asset";

    // ── Bootstrap Config ──────────────────────────────────────────────────────

    [MenuItem("Tools/Lifetopia/1. Create Bootstrap Config", priority = 1)]
    static void CreateBootstrapConfig()
    {
        if (!AssetDatabase.IsValidFolder(ResourcesDir))
            AssetDatabase.CreateFolder("Assets", "Resources");

        var existing = AssetDatabase.LoadAssetAtPath<LifetopiaBootstrapConfig>(ConfigPath);
        if (existing != null)
        {
            EditorUtility.DisplayDialog("Lifetopia", "Sudah ada:\n" + ConfigPath, "OK");
            Selection.activeObject = existing;
            return;
        }

        var asset = ScriptableObject.CreateInstance<LifetopiaBootstrapConfig>();
        // Default values sudah di-set di field declarations
        AssetDatabase.CreateAsset(asset, ConfigPath);
        AssetDatabase.SaveAssets();
        EditorUtility.FocusProjectWindow();
        Selection.activeObject = asset;
        Debug.Log("[Lifetopia] Bootstrap Config dibuat: " + ConfigPath);
    }

    // ── Validate Setup ────────────────────────────────────────────────────────

    [MenuItem("Tools/Lifetopia/2. Validate Setup", priority = 2)]
    static void ValidateSetup()
    {
        var issues = new System.Text.StringBuilder();
        bool ok = true;

        // Check Bootstrap Config
        var cfg = AssetDatabase.LoadAssetAtPath<LifetopiaBootstrapConfig>(ConfigPath);
        if (cfg == null)
        {
            issues.AppendLine("❌ Bootstrap Config tidak ada di Resources/");
            issues.AppendLine("   → Jalankan: Tools > Lifetopia > 1. Create Bootstrap Config");
            ok = false;
        }
        else
        {
            issues.AppendLine("✅ Bootstrap Config: " + ConfigPath);
        }

        // Check Ground layer
        int groundLayer = LayerMask.NameToLayer("Ground");
        if (groundLayer < 0)
        {
            issues.AppendLine("⚠️  Layer 'Ground' tidak ada");
            issues.AppendLine("   → Edit > Project Settings > Tags and Layers > tambah 'Ground'");
        }
        else
        {
            issues.AppendLine("✅ Layer 'Ground': index " + groundLayer);
        }

        // Check TMP
        var tmpSettings = Resources.Load("TMP Settings");
        if (tmpSettings == null)
            issues.AppendLine("⚠️  TextMeshPro belum di-import (Window > TextMeshPro > Import TMP Essential Resources)");
        else
            issues.AppendLine("✅ TextMeshPro: OK");

        // Check scenes in build
        var scenes = EditorBuildSettings.scenes;
        string[] expectedScenes = { "splashscreen", "choose map", "farm game", "map_city", "map_garden", "map_suburban", "map_fishing" };
        foreach (var expected in expectedScenes)
        {
            bool found = false;
            foreach (var s in scenes)
                if (s.path.ToLower().Contains(expected.ToLower())) { found = true; break; }
            if (!found)
                issues.AppendLine($"⚠️  Scene '{expected}' tidak ada di Build Settings");
        }

        string title = ok ? "✅ Setup Valid" : "⚠️ Ada Issues";
        EditorUtility.DisplayDialog("Lifetopia Setup Check", issues.ToString(), "OK");
        Debug.Log("[Lifetopia Validate]\n" + issues);
    }

    // ── Add Ground Layer ──────────────────────────────────────────────────────

    [MenuItem("Tools/Lifetopia/3. Add Ground Layer", priority = 3)]
    static void AddGroundLayer()
    {
        if (LayerMask.NameToLayer("Ground") >= 0)
        {
            EditorUtility.DisplayDialog("Lifetopia", "Layer 'Ground' sudah ada.", "OK");
            return;
        }

        // Buka TagManager
        SerializedObject tagManager = new SerializedObject(
            AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/TagManager.asset")[0]);
        SerializedProperty layers = tagManager.FindProperty("layers");

        for (int i = 8; i < layers.arraySize; i++)
        {
            SerializedProperty layer = layers.GetArrayElementAtIndex(i);
            if (string.IsNullOrEmpty(layer.stringValue))
            {
                layer.stringValue = "Ground";
                tagManager.ApplyModifiedProperties();
                Debug.Log($"[Lifetopia] Layer 'Ground' ditambahkan di index {i}");
                EditorUtility.DisplayDialog("Lifetopia", $"Layer 'Ground' berhasil ditambahkan di slot {i}!", "OK");
                return;
            }
        }

        EditorUtility.DisplayDialog("Lifetopia",
            "Tidak ada slot layer kosong (8-31). Hapus layer yang tidak dipakai dulu.", "OK");
    }

    // ── Full Auto Setup ───────────────────────────────────────────────────────

    [MenuItem("Tools/Lifetopia/0. FULL AUTO SETUP (Jalankan ini dulu!)", priority = 0)]
    static void FullAutoSetup()
    {
        int steps = 0;

        // 1. Bootstrap Config
        if (AssetDatabase.LoadAssetAtPath<LifetopiaBootstrapConfig>(ConfigPath) == null)
        {
            if (!AssetDatabase.IsValidFolder(ResourcesDir))
                AssetDatabase.CreateFolder("Assets", "Resources");
            var asset = ScriptableObject.CreateInstance<LifetopiaBootstrapConfig>();
            AssetDatabase.CreateAsset(asset, ConfigPath);
            steps++;
            Debug.Log("[Lifetopia] ✅ Bootstrap Config dibuat");
        }

        // 2. Ground Layer
        if (LayerMask.NameToLayer("Ground") < 0)
        {
            SerializedObject tagManager = new SerializedObject(
                AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/TagManager.asset")[0]);
            SerializedProperty layers = tagManager.FindProperty("layers");
            for (int i = 8; i < layers.arraySize; i++)
            {
                SerializedProperty layer = layers.GetArrayElementAtIndex(i);
                if (string.IsNullOrEmpty(layer.stringValue))
                {
                    layer.stringValue = "Ground";
                    tagManager.ApplyModifiedProperties();
                    steps++;
                    Debug.Log($"[Lifetopia] ✅ Layer 'Ground' ditambahkan di slot {i}");
                    break;
                }
            }
        }

        AssetDatabase.SaveAssets();
        AssetDatabase.Refresh();

        string msg = steps > 0
            ? $"✅ Auto Setup selesai!\n{steps} item dibuat/dikonfigurasi.\n\nSekarang bisa langsung Play."
            : "✅ Semua sudah ter-setup sebelumnya.\nBisa langsung Play!";

        EditorUtility.DisplayDialog("Lifetopia Auto Setup", msg, "Siap!");
        Debug.Log("[Lifetopia] Full Auto Setup selesai. Steps: " + steps);
    }
}
#endif
