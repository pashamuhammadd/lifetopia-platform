using System;
using System.Collections.Generic;
using UnityEngine;

/// <summary>Persistent progression + identity (wallet + off-chain GOLD/inventory) lean alpha.</summary>
public class LifetopiaGameState : MonoBehaviour
{
    public static LifetopiaGameState Instance { get; private set; }

    [Header("Session / travel")]
    public string PendingTravelBiome = "";

    [Header("Identity")]
    public string WalletPublicKey = "";
    public bool IsGuest = true;
    public string ActiveWalletProvider = "";

    [Header("Economy & XP")]
    public int Gold = 0;
    public int Level = 1;
    public int XP = 0;

    [Header("Inventory (itemId -> qty)")]
    public Dictionary<string, int> Inventory = new Dictionary<string, int>();

    [Header("NFT devnet (mock until WebGL bridge)")]
    public bool HasAlphaNftMinted;

    /// <summary>True when Devnet RPC confirms wallet holds token accounts for configured utility mint.</summary>
    public bool HasChainVerifiedUtilityToken;

    public string LastMockMintSignature = "";
    public float FarmingSpeedMultiplier = 1f;
    public float HarvestYieldMultiplier = 1f;

    [Header("Daily quests (persisted)")]
    public int QuestHarvestCrops;
    public int QuestPlantSeeds;
    public int QuestEarnGold;
    public const int TargetHarvest = 5;
    public const int TargetPlant = 10;
    public const int TargetGold = 20;

    public event Action OnStateChanged;

    const string PREF_WALLET = "lf_wallet";
    const string PREF_GUEST = "lf_guest";
    const string PREF_GOLD = "lf_gold";
    const string PREF_LEVEL = "lf_level";
    const string PREF_XP = "lf_xp";
    const string PREF_HAS_NFT = "lf_has_nft";
    const string PREF_CHAIN_NFT = "lf_chain_nft";
    const string PREF_INV_PREFIX = "lf_inv_";
    const string PREF_QH = "lf_qharvest";
    const string PREF_QP = "lf_qplant";
    const string PREF_QG = "lf_qgold";

    void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);
        Load();
    }

    public void SetTravelBiome(string biome)
    {
        PendingTravelBiome = biome ?? "";
    }

    public void SetWallet(string provider, string publicKey, bool guest)
    {
        ActiveWalletProvider = provider ?? "";
        WalletPublicKey      = publicKey ?? "";
        IsGuest              = guest;

        HasChainVerifiedUtilityToken = false;

        ApplyNftBoost();
        Save();
        Raise();

        // Chain verify hanya jalan kalau config mengizinkan DAN bukan guest
        if (!guest && !string.IsNullOrEmpty(WalletPublicKey))
        {
            var cfg = LifetopiaBootstrapConfig.Instance;
            if (cfg != null && cfg.verifyMintOnWalletConnect &&
                !string.IsNullOrEmpty(cfg.solanaDevnetRpcUrl) &&
                !string.IsNullOrEmpty(cfg.alphaUtilityMintAddress))
            {
                VerifyMintOnChain(WalletPublicKey);
            }
        }
    }

    public void ClearWallet()
    {
        WalletPublicKey = "";
        IsGuest = true;
        ActiveWalletProvider = "";
        HasAlphaNftMinted = false;
        HasChainVerifiedUtilityToken = false;
        FarmingSpeedMultiplier = 1f;
        HarvestYieldMultiplier = 1f;
        Save();
        Raise();
    }

    public void GrantGold(int amount)
    {
        Gold = Mathf.Max(0, Gold + amount);
        QuestEarnGold += Mathf.Max(0, amount);
        CheckQuestComplete();
        Save();
        Raise();
    }

    public void AddXP(int amount)
    {
        XP += amount;
        while (XP >= Level * 50)
        {
            XP -= Level * 50;
            Level++;
        }
        Save();
        Raise();
    }

    public void IncPlantQuest() { QuestPlantSeeds++; CheckQuestComplete(); Save(); Raise(); }
    public void IncHarvestQuest() { QuestHarvestCrops++; CheckQuestComplete(); Save(); Raise(); }

    void CheckQuestComplete()
    {
        if (QuestHarvestCrops >= TargetHarvest && QuestPlantSeeds >= TargetPlant && QuestEarnGold >= TargetGold)
            return;
    }

    public bool InventoryGet(string id, out int qty)
    {
        return Inventory.TryGetValue(id, out qty);
    }

    public void InventorySet(string id, int qty)
    {
        qty = Mathf.Max(0, qty);
        if (qty == 0) Inventory.Remove(id);
        else Inventory[id] = qty;
        Save();
        Raise();
    }

    public void InventoryAdd(string id, int delta)
    {
        Inventory.TryGetValue(id, out int q);
        InventorySet(id, q + delta);
    }

    /// <summary>Returns true if item existed in sufficient quantity.</summary>
    public bool InventoryTrySpend(string id, int qty)
    {
        if (qty <= 0) return true;
        if (!Inventory.TryGetValue(id, out int have) || have < qty)
            return false;

        InventorySet(id, have - qty);
        return true;
    }

    public void TryMockMintAlphaNft()
    {
        if (string.IsNullOrEmpty(WalletPublicKey))
            return;

        HasAlphaNftMinted = true;
        LastMockMintSignature = $"devnet_mock_{UnityEngine.Random.Range(100000, 999999)}";
        ApplyNftBoost();
        Save();
        Raise();
    }

    void ApplyNftBoost()
    {
        bool active = HasAlphaNftMinted || HasChainVerifiedUtilityToken;
        FarmingSpeedMultiplier = active ? 1.12f : 1f;
        HarvestYieldMultiplier = active ? 1.1f : 1f;
    }

    void VerifyMintOnChain(string pk)
    {
        var cfg = LifetopiaBootstrapConfig.Instance;
        if (cfg == null || string.IsNullOrEmpty(cfg.solanaDevnetRpcUrl) ||
            string.IsNullOrEmpty(cfg.alphaUtilityMintAddress))
            return;

        SolanaChainQueries.VerifyWalletOwnsMint(
            pk,
            cfg.alphaUtilityMintAddress,
            cfg.solanaDevnetRpcUrl,
            (ok, msg) =>
            {
                HasChainVerifiedUtilityToken = ok;
                ApplyNftBoost();
                Save();
                Raise();
                if (!ok && !string.IsNullOrEmpty(msg) &&
                    msg.IndexOf("no_accounts", StringComparison.Ordinal) < 0)
                {
                    string s = msg.Length > 320 ? msg.Substring(0, 320) + "…" : msg;
                    UnityEngine.Debug.Log("[Solana] Mint verify: " + s);
                }
            });
    }

    public string ShortWalletDisplay()
    {
        if (string.IsNullOrEmpty(WalletPublicKey)) return "";
        string s = WalletPublicKey;
        if (s.Length <= 10) return s;
        return s.Substring(0, 4) + "…" + s.Substring(s.Length - 4);
    }

    public void Save()
    {
        PlayerPrefs.SetString(PREF_WALLET, WalletPublicKey);
        PlayerPrefs.SetInt(PREF_GUEST, IsGuest ? 1 : 0);
        PlayerPrefs.SetInt(PREF_GOLD, Gold);
        PlayerPrefs.SetInt(PREF_LEVEL, Level);
        PlayerPrefs.SetInt(PREF_XP, XP);
        PlayerPrefs.SetInt(PREF_HAS_NFT, HasAlphaNftMinted ? 1 : 0);
        PlayerPrefs.SetInt(PREF_CHAIN_NFT, HasChainVerifiedUtilityToken ? 1 : 0);
        PlayerPrefs.SetInt(PREF_QH, QuestHarvestCrops);
        PlayerPrefs.SetInt(PREF_QP, QuestPlantSeeds);
        PlayerPrefs.SetInt(PREF_QG, QuestEarnGold);

        foreach (var kv in Inventory)
            PlayerPrefs.SetInt(PREF_INV_PREFIX + kv.Key, kv.Value);

        PlayerPrefs.Save();
    }

    public void Load()
    {
        WalletPublicKey = PlayerPrefs.GetString(PREF_WALLET, "");
        IsGuest = PlayerPrefs.GetInt(PREF_GUEST, 1) == 1;
        Gold = PlayerPrefs.GetInt(PREF_GOLD, 0);
        Level = Mathf.Max(1, PlayerPrefs.GetInt(PREF_LEVEL, 1));
        XP = PlayerPrefs.GetInt(PREF_XP, 0);
        HasAlphaNftMinted = PlayerPrefs.GetInt(PREF_HAS_NFT, 0) == 1;
        HasChainVerifiedUtilityToken = PlayerPrefs.GetInt(PREF_CHAIN_NFT, 0) == 1;
        QuestHarvestCrops = PlayerPrefs.GetInt(PREF_QH, 0);
        QuestPlantSeeds = PlayerPrefs.GetInt(PREF_QP, 0);
        QuestEarnGold = PlayerPrefs.GetInt(PREF_QG, 0);

        string[] known = { "seed_wheat", "seed_tomato", "seed_carrot", "seed_pumpkin", "crop_wheat", "crop_tomato", "crop_carrot", "crop_pumpkin" };
        foreach (string k in known)
        {
            int v = PlayerPrefs.GetInt(PREF_INV_PREFIX + k, -1);
            if (v >= 0) Inventory[k] = v;
        }

        if (Inventory.Count == 0)
        {
            Inventory["seed_wheat"] = 8;
            Inventory["seed_tomato"] = 3;
            Inventory["seed_carrot"] = 2;
            Inventory["seed_pumpkin"] = 1;
        }

        ApplyNftBoost();
        Raise();
    }

    void Raise() => OnStateChanged?.Invoke();
}
