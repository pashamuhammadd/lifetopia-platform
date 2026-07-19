using Data;
using Entity_Components.Character;
using Plugins.Lowscope.ComponentSaveSystem;
using Plugins.Lowscope.ComponentSaveSystem.Core;
using Referencing.Scriptable_Variables.Variables;
using Saving;
using Solana.Unity.SDK;
using Solana.Unity.Wallet;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

/// <summary>
/// Attach to the same persistent GameObject as Web3Connector (StartMenu scene).
///
/// On wallet login:
///   1. Picks/resumes a save slot keyed to the wallet public key.
///   2. Sets the Name StringVariable SOs and PlayerSession for UserInfo.
///   3a. NEW save  — randomizes body parts, sets SOs, writes "character" metadata to disk.
///   3b. OLD save  — reads saved "character" metadata, finds matching BodyData, re-sets SOs.
///        (Survives browser refresh because SOs are repopulated from persistent metadata.)
///   4. Loads the game scene.
/// </summary>
public class WalletAutoGameStarter : MonoBehaviour
{
    [Header("Scene")]
    [SerializeField] private string gameSceneName = "Core";

    [Header("Starting Level (must match SaveSystem initialScene value)")]
    [SerializeField] private string initialScene = "Level_Farm";

    [Header("Name ScriptableObject Variables")]
    [SerializeField] private StringVariable characterNameVariable;
    [SerializeField] private StringVariable farmNameVariable;

    [Header("Body Part ScriptableObject Variables")]
    [SerializeField] private BodyDataVariable startingHairVariable;
    [SerializeField] private BodyDataVariable startingEyesVariable;
    [SerializeField] private BodyDataVariable startingChestVariable;
    [SerializeField] private BodyDataVariable startingLegsVariable;
    [SerializeField] private BodyDataVariable startingArmsVariable;

    [Header("Character Part Options")]
    [SerializeField] private BodyData[] hairOptions;
    [SerializeField] private BodyData[] eyeOptions;
    [SerializeField] private BodyData[] chestOptions;
    [SerializeField] private BodyData[] legsOptions;
    [SerializeField] private BodyData[] armsOptions;

    private const string PrefKey = "WalletSlot_";

    // Mirrors BodySpriteSwapper's private SaveData struct
    [System.Serializable]
    private struct PartSaveData { public string partGuid; }

    private void OnEnable()  => Web3.OnLogin += OnLogin;
    private void OnDisable() => Web3.OnLogin -= OnLogin;

    private void OnLogin(Account account) => StartCoroutine(LoginRoutine(account));

    private IEnumerator LoginRoutine(Account account)
    {
        string pubKey = account.PublicKey.ToString();

        // ── 1. Resolve or create save slot ───────────────────────────────
        string prefsKey = PrefKey + pubKey;
        int slot;
        if (PlayerPrefs.HasKey(prefsKey))
        {
            slot = PlayerPrefs.GetInt(prefsKey);
        }
        else
        {
            SaveFileUtility.ObtainSlotSaveFileNames();
            slot = SaveFileUtility.GetAvailableSaveSlot();
            PlayerPrefs.SetInt(prefsKey, slot);
            PlayerPrefs.Save();
        }

        // ── 2. Activate the slot ──────────────────────────────────────────
        SaveMaster.SetSlot(slot, true);

        // ── 3. Derive and store names ─────────────────────────────────────
        string playerName = "Farmer_" + pubKey.Substring(0, Mathf.Min(12, pubKey.Length));
        string farmName   = pubKey.Substring(0, Mathf.Min(8, pubKey.Length)) + " Farm";

        if (characterNameVariable != null) characterNameVariable.Value = playerName;
        if (farmNameVariable != null)      farmNameVariable.Value = farmName;
        PlayerSession.PlayerName = playerName;
        PlayerSession.FarmName   = farmName;

        // ── 4. Wait for IndexedDB to load the slot (WebGL is async) ──────
        //       Poll until savedata appears in memory, or we time out.
        string existingJson = null;
        float waited = 0f;
        while (waited < 5f)
        {
            if (SaveMaster.GetMetaData("savedata", out string json) && !string.IsNullOrEmpty(json))
            {
                existingJson = json;
                break;
            }
            yield return new WaitForSeconds(0.2f);
            waited += 0.2f;
        }

        bool hadSave = !string.IsNullOrEmpty(existingJson);

        if (!hadSave)
        {
            // ── NEW SAVE: write savedata + randomize + persist character metadata ──
            var sd = new SaveData { lastScene = initialScene, playerName = playerName, farmName = farmName };
            SaveMaster.SetMetaData("savedata", JsonUtility.ToJson(sd));

            RandomizeAndSaveCharacter();
            SaveMaster.WriteActiveSaveToDisk();
        }
        else
        {
            // ── RETURNING SAVE: restore SOs from persisted character metadata ──
            // This re-populates the runtime SO values that are lost on browser refresh.
            RestoreBodyPartsToSOs();
        }

        // Give WebGL's IndexedDB time to flush before switching scenes
        yield return new WaitForSeconds(1f);

        SceneManager.LoadScene(gameSceneName);

    }

    // ── New save: pick random parts, set SOs, write character metadata to disk ──
    private void RandomizeAndSaveCharacter()
    {
        var bodyInfo = new List<StoreCharacterBodyMetaData.BodyData>();

        PickAndAdd(bodyInfo, startingHairVariable,  hairOptions,  "Hair/BodySpriteSwapper");
        PickAndAdd(bodyInfo, startingEyesVariable,  eyeOptions,   "Eyes/BodySpriteSwapper");
        PickAndAdd(bodyInfo, startingChestVariable, chestOptions, "Chest/BodySpriteSwapper");
        PickAndAdd(bodyInfo, startingLegsVariable,  legsOptions,  "Legs/BodySpriteSwapper");
        PickAndAdd(bodyInfo, startingArmsVariable,  armsOptions,  "Arms/BodySpriteSwapper");

        if (bodyInfo.Count > 0)
        {
            var charSave = new StoreCharacterBodyMetaData.SaveData { bodyInfo = bodyInfo };
            SaveMaster.SetMetaData("character", JsonUtility.ToJson(charSave));
        }
    }

    private void PickAndAdd(List<StoreCharacterBodyMetaData.BodyData> list,
                             BodyDataVariable variable, BodyData[] options, string saveId)
    {
        if (options == null || options.Length == 0) return;
        BodyData chosen = options[Random.Range(0, options.Length)];
        if (chosen == null) return;

        if (variable != null) variable.Value = chosen;

        string partJson = JsonUtility.ToJson(new PartSaveData { partGuid = chosen.GetGuid() });
        list.Add(new StoreCharacterBodyMetaData.BodyData { saveId = saveId, data = partJson });
    }

    // ── Returning save: read character metadata and re-set SO runtime values ──
    private void RestoreBodyPartsToSOs()
    {
        if (!SaveMaster.GetMetaData("character", out string charJson)
            || string.IsNullOrEmpty(charJson)) return;

        var charSave = JsonUtility.FromJson<StoreCharacterBodyMetaData.SaveData>(charJson);
        if (charSave?.bodyInfo == null) return;

        foreach (var entry in charSave.bodyInfo)
        {
            var partData = JsonUtility.FromJson<PartSaveData>(entry.data);
            if (string.IsNullOrEmpty(partData.partGuid)) continue;

            string id = entry.saveId;
            if      (id.Contains("Hair"))  ApplyToVariable(startingHairVariable,  hairOptions,  partData.partGuid);
            else if (id.Contains("Eye"))   ApplyToVariable(startingEyesVariable,  eyeOptions,   partData.partGuid);
            else if (id.Contains("Chest")) ApplyToVariable(startingChestVariable, chestOptions, partData.partGuid);
            else if (id.Contains("Leg"))   ApplyToVariable(startingLegsVariable,  legsOptions,  partData.partGuid);
            else if (id.Contains("Arm"))   ApplyToVariable(startingArmsVariable,  armsOptions,  partData.partGuid);
        }
    }

    private void ApplyToVariable(BodyDataVariable variable, BodyData[] options, string guid)
    {
        if (variable == null || options == null) return;
        foreach (var bd in options)
        {
            if (bd != null && bd.GetGuid() == guid)
            {
                variable.Value = bd;
                return;
            }
        }
    }
}
