using System.Text;
using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;

/// <summary>
/// HUD controller untuk semua scene gameplay.
/// Mode FARM  : top bar lengkap + tip bar + hotbar + semua modal
/// Mode NON-FARM (city/garden/suburban/fishing) : top bar minimal saja
/// </summary>
[DisallowMultipleComponent]
public class LifetopiaFarmHudController : MonoBehaviour
{
    // ── Labels ────────────────────────────────────────────────────────────────
    TextMeshProUGUI _goldLbl;
    TextMeshProUGUI _lvlLbl;
    TextMeshProUGUI _walletLbl;
    TextMeshProUGUI _tipTxt;
    TextMeshProUGUI _tasksBody;
    TextMeshProUGUI _invBody;
    TextMeshProUGUI _nftBody;

    // ── Modal roots ───────────────────────────────────────────────────────────
    GameObject _walletRoot;
    GameObject _nftRoot;
    GameObject _tasksRoot;
    GameObject _invRoot;
    GameObject _devRoot;
    GameObject _setRoot;

    bool _isFarmMode;
    int  _ti;

    readonly string[] _tips =
    {
        "Seeds & GOLD loop — hotbar slots 5–8 pick seed; E plants / harvests plot.",
        "CONNECT WALLET mocks Devnet flow on Desktop; Guest still persists locally.",
        "INIT ACCOUNT mocks Alpha NFT for light growth/yield boosts.",
        "TASKS aggregates daily harvest / plant / earn GOLD progress.",
    };

    // ── Public API ────────────────────────────────────────────────────────────

    /// <summary>
    /// Panggil setelah Canvas dibuat.
    /// isFarm = true  → HUD lengkap (farm mode)
    /// isFarm = false → top bar minimal saja
    /// </summary>
    public void Setup(PlayerFarmInteractor interactor, bool isFarm)
    {
        _isFarmMode = isFarm;

        if (!TryGetComponent<UnityEngine.UI.GraphicRaycaster>(out _))
            gameObject.AddComponent<UnityEngine.UI.GraphicRaycaster>();

        Canvas cv = GetComponent<Canvas>();
        if (cv != null && cv.sortingOrder < 100)
            cv.sortingOrder = 120;

        // Top bar selalu ada
        if (transform.Find("AlphaTopHud") == null)
            BuildTopBar();

        if (isFarm)
        {
            // Tip bar + modals hanya di farm
            if (transform.Find("AlphaTip") == null)
                BuildTipBar();

            if (_walletRoot == null)
                BuildModals();

            HotbarAndKeys.WireBottomHotbar(transform, interactor);
        }

        var gs = LifetopiaGameState.Instance;
        if (gs != null)
        {
            gs.OnStateChanged -= Sync;
            gs.OnStateChanged += Sync;
        }

        Sync();
        HideAllPanels();
    }

    // Overload lama agar tidak break kode lain yang panggil Setup(pf)
    public void Setup(PlayerFarmInteractor interactor)
    {
        // Default ke farm mode untuk backward compat
        Setup(interactor, isFarm: true);
    }

    void HideAllPanels()
    {
        if (_walletRoot) _walletRoot.SetActive(false);
        if (_nftRoot)    _nftRoot.SetActive(false);
        if (_tasksRoot)  _tasksRoot.SetActive(false);
        if (_invRoot)    _invRoot.SetActive(false);
        if (_devRoot)    _devRoot.SetActive(false);
        if (_setRoot)    _setRoot.SetActive(false);
    }

    void OnDestroy()
    {
        var gs = LifetopiaGameState.Instance;
        if (gs != null) gs.OnStateChanged -= Sync;
    }

    // ── Top Bar ───────────────────────────────────────────────────────────────

    void BuildTopBar()
    {
        RectTransform row = HudPrimitives.TopBar(transform, "AlphaTopHud");
        var cfg  = LifetopiaBootstrapConfig.Instance;
        Sprite rib  = cfg?.hudRibbonButtonSprite;
        Sprite purp = cfg?.hudPurpleButtonSprite;

        // MAP — selalu ada
        HudPrimitives.RowButton(row, 74f, "MAP", LoadMap, spriteOverride: rib);

        // LVL
        GameObject lv = HudPrimitives.RowButton(row, 74f, "LVL",
            () => { LifetopiaGameState.Instance?.AddXP(3); Sync(); },
            spriteOverride: rib);
        _lvlLbl = lv.transform.Find("Lbl").GetComponent<TextMeshProUGUI>();

        if (_isFarmMode)
        {
            // Tombol ekstra hanya di farm
            HudPrimitives.RowButton(row, 100f, "TASKS",
                () => { if (_tasksRoot) _tasksRoot.SetActive(true); }, spriteOverride: rib);

            HudPrimitives.RowButton(row, 96f, "ITEMS",
                () => { if (_invRoot) _invRoot.SetActive(true); }, spriteOverride: rib);

            HudPrimitives.RowButton(row, 118f, "MY NFTS",
                () => { if (_nftRoot) _nftRoot.SetActive(true); }, spriteOverride: rib);
        }

        // GOLD — selalu ada
        var g = HudPrimitives.RowButton(row, 154f, "GOLD", null, spriteOverride: rib);
        _goldLbl = g.transform.Find("Lbl").GetComponent<TextMeshProUGUI>();

        if (_isFarmMode)
        {
            HudPrimitives.RowButton(row, 132f, "+10 GOLD",
                () => LifetopiaGameState.Instance?.GrantGold(10), spriteOverride: rib);

            HudPrimitives.RowButton(row, 98f, "DEVNET",
                () => { if (_devRoot) _devRoot.SetActive(true); }, spriteOverride: rib);
        }

        // CONNECT WALLET — selalu ada
        var w = HudPrimitives.RowButton(row, 218f, "CONNECT",
            () => { if (_walletRoot) _walletRoot.SetActive(true); },
            purple: true,
            spriteOverride: purp != null ? purp : rib);
        _walletLbl = w.transform.Find("Lbl").GetComponent<TextMeshProUGUI>();

        // SET — selalu ada
        HudPrimitives.RowButton(row, 74f, "SET",
            () => { if (_setRoot) _setRoot.SetActive(true); }, spriteOverride: rib);
    }

    // ── Tip Bar (farm only) ───────────────────────────────────────────────────

    void BuildTipBar()
    {
        GameObject bar = new GameObject("AlphaTip");
        bar.transform.SetParent(transform, false);

        RectTransform rr = bar.AddComponent<RectTransform>();
        rr.anchorMin = new Vector2(0.05f, 1f);
        rr.anchorMax = new Vector2(0.95f, 1f);
        rr.offsetMin = new Vector2(0f, -128f);
        rr.offsetMax = new Vector2(0f, -90f);

        UnityEngine.UI.Image bg = bar.AddComponent<UnityEngine.UI.Image>();
        bg.color = new Color(0f, 0f, 0f, 0.55f);

        _tipTxt = HudPrimitives.Write(rr, Vector2.zero, new Vector2(720f, 40f),
            _tips[0], 18f, new Color(1f, 0.93f, 0.29f), TextAlignmentOptions.Center);

        Sprite ribTip = LifetopiaBootstrapConfig.Instance?.hudRibbonButtonSprite;
        HudPrimitives.CenterPushButton(rr, new Vector2(360f, 0f), new Vector2(110f, 32f), "NEXT>",
            () => { _ti = (_ti + 1) % _tips.Length; _tipTxt.text = _tips[_ti]; },
            spriteOverride: ribTip);
    }

    // ── Modals (farm only) ────────────────────────────────────────────────────

    void BuildModals()
    {
        Sprite rib  = LifetopiaBootstrapConfig.Instance?.hudRibbonButtonSprite;
        Sprite purp = LifetopiaBootstrapConfig.Instance?.hudPurpleButtonSprite;

        void OkWallet(string provider, string pk)
        {
            LifetopiaGameState.Instance?.SetWallet(provider, pk, false);
            _walletRoot?.SetActive(false);
            Sync();
        }
        void WalletErr(string e) => UnityEngine.Debug.LogWarning("[Wallet] " + e);

        // ── Wallet modal ──
        _walletRoot = HudPrimitives.ModalFullscreen(transform, "WalletRoot",
            new Vector2(520f, 440f), out RectTransform wp);

        HudPrimitives.Write(wp, new Vector2(0f, 170f), new Vector2(440f, 40f),
            "WALLET — Devnet", 26f, Color.black, TextAlignmentOptions.Center);
        HudPrimitives.Write(wp, new Vector2(0f, 110f), new Vector2(460f, 70f),
            "Pick provider. Desktop generates mock pubkey until WebGL JS bridge is plugged.",
            18f, Color.black, TextAlignmentOptions.TopJustified);

        HudPrimitives.CenterPushButton(wp, new Vector2(-130f, 40f), new Vector2(174f, 42f),
            "PHANTOM",  () => SolanaWalletBridge.ConnectPhantom(OkWallet, WalletErr),  spriteOverride: rib);
        HudPrimitives.CenterPushButton(wp, new Vector2(132f,  40f), new Vector2(174f, 42f),
            "SOLFLARE", () => SolanaWalletBridge.ConnectSolflare(OkWallet, WalletErr), spriteOverride: rib);
        HudPrimitives.CenterPushButton(wp, new Vector2(0f,   -32f), new Vector2(174f, 42f),
            "BACKPACK",  () => SolanaWalletBridge.ConnectBackpack(OkWallet, WalletErr), spriteOverride: rib);
        HudPrimitives.CenterPushButton(wp, new Vector2(0f,  -120f), new Vector2(280f, 48f),
            "PLAY AS GUEST",
            () => { LifetopiaGameState.Instance?.SetWallet("", "", true); _walletRoot?.SetActive(false); Sync(); },
            spriteOverride: purp != null ? purp : rib);
        HudPrimitives.CenterPushButton(wp, new Vector2(220f, 168f), new Vector2(40f, 40f),
            "X", () => _walletRoot?.SetActive(false));

        // ── NFT modal ──
        _nftRoot = HudPrimitives.ModalFullscreen(transform, "NftRoot",
            new Vector2(520f, 360f), out RectTransform np);
        HudPrimitives.Write(np, new Vector2(0f, 148f), new Vector2(420f, 36f),
            "MY NFTS", 26f, Color.black, TextAlignmentOptions.Center);
        _nftBody = HudPrimitives.Write(np, new Vector2(0f, 10f), new Vector2(460f, 160f),
            "", 18f, Color.black, TextAlignmentOptions.TopJustified);
        HudPrimitives.CenterPushButton(np, new Vector2(0f, -120f), new Vector2(280f, 44f),
            "INIT ACCOUNT (MOCK MINT)",
            () => { LifetopiaGameState.Instance?.TryMockMintAlphaNft(); Sync(); },
            spriteOverride: rib);
        HudPrimitives.CenterPushButton(np, new Vector2(210f, 150f), new Vector2(40f, 40f),
            "X", () => _nftRoot?.SetActive(false));

        // ── Tasks modal ──
        _tasksRoot = HudPrimitives.ModalFullscreen(transform, "TasksRoot",
            new Vector2(560f, 440f), out RectTransform tp);
        HudPrimitives.Write(tp, new Vector2(0f, 180f), new Vector2(420f, 40f),
            "TASKS — DAILY QUESTS", 26f, Color.black, TextAlignmentOptions.Center);
        _tasksBody = HudPrimitives.Write(tp, new Vector2(0f, 0f), new Vector2(500f, 280f),
            "", 19f, Color.black, TextAlignmentOptions.TopJustified);
        HudPrimitives.CenterPushButton(tp, new Vector2(240f, 180f), new Vector2(40f, 40f),
            "X", () => _tasksRoot?.SetActive(false));

        // ── Inventory modal ──
        _invRoot = HudPrimitives.ModalFullscreen(transform, "InvRoot",
            new Vector2(560f, 440f), out RectTransform ip);
        HudPrimitives.Write(ip, new Vector2(0f, 188f), new Vector2(420f, 36f),
            "ITEMS", 26f, Color.black, TextAlignmentOptions.Center);
        _invBody = HudPrimitives.Write(ip, new Vector2(0f, 0f), new Vector2(500f, 300f),
            "", 18f, Color.black, TextAlignmentOptions.TopLeft);
        HudPrimitives.CenterPushButton(ip, new Vector2(240f, 188f), new Vector2(40f, 40f),
            "X", () => _invRoot?.SetActive(false));

        // ── Devnet modal ──
        _devRoot = HudPrimitives.ModalFullscreen(transform, "DevRoot",
            new Vector2(520f, 400f), out RectTransform dp);
        HudPrimitives.Write(dp, new Vector2(0f, 130f), new Vector2(440f, 140f),
            "DEVNET INFO\nPublic Alpha uses Devnet signatures for mock claims + NFT mint logging.\nGOLD remains off-chain.",
            19f, Color.black, TextAlignmentOptions.TopJustified);
        HudPrimitives.CenterPushButton(dp, new Vector2(0f,   -40f), new Vector2(240f, 44f),
            "AIRDROP +5 GOLD",           () => LifetopiaGameState.Instance?.GrantGold(5),  spriteOverride: rib);
        HudPrimitives.CenterPushButton(dp, new Vector2(0f,  -100f), new Vector2(280f, 46f),
            "CLAIM HARVEST GOLD (+3)",   () => LifetopiaGameState.Instance?.GrantGold(3),  spriteOverride: rib);
        HudPrimitives.CenterPushButton(dp, new Vector2(0f,  -160f), new Vector2(260f, 42f),
            "VIEW MOCK TX LOG",
            () => UnityEngine.Debug.Log("Mock mint sig: " + LifetopiaGameState.Instance?.LastMockMintSignature),
            spriteOverride: rib);
        HudPrimitives.CenterPushButton(dp, new Vector2(218f, 168f), new Vector2(40f, 40f),
            "X", () => _devRoot?.SetActive(false));

        // ── Settings modal ──
        _setRoot = HudPrimitives.ModalFullscreen(transform, "SetRoot",
            new Vector2(460f, 320f), out RectTransform sp);
        HudPrimitives.Write(sp, Vector2.zero, new Vector2(340f, 120f),
            "SETTINGS\nDISCONNECT clears mock wallet locally.",
            20f, Color.black, TextAlignmentOptions.Center);
        HudPrimitives.CenterPushButton(sp, new Vector2(0f, -100f), new Vector2(260f, 46f),
            "DISCONNECT + SPLASHSCREEN",
            () =>
            {
                LifetopiaGameState.Instance?.ClearWallet();
                if (SceneTransitionManager.Instance != null)
                    SceneTransitionManager.Instance.LoadScene("splashscreen");
                else
                    SceneManager.LoadScene("splashscreen");
            },
            spriteOverride: rib);
        HudPrimitives.CenterPushButton(sp, new Vector2(180f, 138f), new Vector2(40f, 40f),
            "X", () => _setRoot?.SetActive(false));
    }

    // ── Sync ──────────────────────────────────────────────────────────────────

    void Sync()
    {
        var gs = LifetopiaGameState.Instance;
        if (gs == null) return;

        if (_goldLbl)   _goldLbl.text  = $"GOLD {gs.Gold}";
        if (_lvlLbl)    _lvlLbl.text   = $"LVL {gs.Level}";

        if (_walletLbl)
        {
            if (!string.IsNullOrEmpty(gs.WalletPublicKey))
                _walletLbl.text = gs.ShortWalletDisplay();
            else
                _walletLbl.text = gs.IsGuest ? "GUEST" : "CONNECT";
        }

        if (_tasksBody)
        {
            var sb = new StringBuilder();
            sb.AppendLine($"Harvest {LifetopiaGameState.TargetHarvest}: {gs.QuestHarvestCrops}");
            sb.AppendLine($"Plant {LifetopiaGameState.TargetPlant}: {gs.QuestPlantSeeds}");
            sb.AppendLine($"Earn {LifetopiaGameState.TargetGold} GOLD: {gs.QuestEarnGold}");
            _tasksBody.text = sb.ToString();
        }

        if (_invBody)
        {
            var sb = new StringBuilder();
            foreach (var kv in gs.Inventory)
                sb.AppendLine($"{kv.Key} × {kv.Value}");
            _invBody.text = sb.Length > 0 ? sb.ToString() : "(empty)";
        }

        if (_nftBody)
        {
            if (gs.HasAlphaNftMinted || gs.HasChainVerifiedUtilityToken)
            {
                var sb = new StringBuilder();
                sb.AppendLine("ALPHA UTILITY BOOST AKTIF");
                sb.AppendLine($"speed ×{gs.FarmingSpeedMultiplier:0.00}  yield ×{gs.HarvestYieldMultiplier:0.00}");
                if (gs.HasChainVerifiedUtilityToken)
                    sb.AppendLine("On-chain: wallet punya token utility (Devnet RPC).");
                if (gs.HasAlphaNftMinted)
                    sb.AppendLine("Mock mint: " + gs.LastMockMintSignature);
                _nftBody.text = sb.ToString();
            }
            else
            {
                _nftBody.text = string.IsNullOrEmpty(gs.WalletPublicKey)
                    ? "CONNECT wallet atau Guest — INIT ACCOUNT untuk mock-mint NFT Alpha."
                    : "Belum terdeteksi mint di wallet — INIT ACCOUNT untuk mock mint lokal.";
            }
        }
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    void LoadMap()
    {
        LifetopiaGameFlowFsm.Instance?.BeginTravel();
        if (SceneTransitionManager.Instance != null)
            SceneTransitionManager.Instance.LoadScene("choose map");
        else
            SceneManager.LoadScene("choose map");
    }
}
