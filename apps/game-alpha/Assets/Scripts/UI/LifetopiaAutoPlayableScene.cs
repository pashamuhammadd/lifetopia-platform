using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using TMPro;

/// <summary>
/// Bootstrap runtime — TIDAK spawn karakter atau background.
/// Semua visual (karakter, BG, kamera) diatur manual di scene.
/// Script ini hanya handle: HUD, GameState, FSM, SceneTransition.
/// </summary>
public class LifetopiaAutoPlayableScene : MonoBehaviour
{
    private const string BootstrapObjectName = "__LIFETOPIA_AUTO_BOOTSTRAP__";

    public static LifetopiaAutoPlayableScene Instance { get; private set; }

    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
    private static void AutoInit()
    {
        if (GameObject.Find(BootstrapObjectName) != null) return;

        GameObject bootstrap = new GameObject(BootstrapObjectName);
        DontDestroyOnLoad(bootstrap);

        if (bootstrap.GetComponent<LifetopiaGameState>() == null)
            bootstrap.AddComponent<LifetopiaGameState>();
        if (bootstrap.GetComponent<SceneTransitionManager>() == null)
            bootstrap.AddComponent<SceneTransitionManager>();
        if (bootstrap.GetComponent<LifetopiaGameFlowFsm>() == null)
            bootstrap.AddComponent<LifetopiaGameFlowFsm>();

        bootstrap.AddComponent<LifetopiaAutoPlayableScene>();
    }

    private GameObject _uiCanvas;

    void Awake()
    {
        if (gameObject.name == BootstrapObjectName)
            Instance = this;
    }

    void OnDestroy()
    {
        if (Instance == this)
            Instance = null;
    }

    void OnEnable()
    {
        if (gameObject.name != BootstrapObjectName) return;
        SceneManager.sceneLoaded += OnSceneLoaded;
        StartCoroutine(SetupAfterFrame());
    }

    void OnDisable()
    {
        if (gameObject.name != BootstrapObjectName) return;
        SceneManager.sceneLoaded -= OnSceneLoaded;
    }

    private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        StartCoroutine(SetupAfterFrame());
    }

    private System.Collections.IEnumerator SetupAfterFrame()
    {
        yield return null; // tunggu 1 frame agar semua Awake() di scene selesai
        TrySetupCurrentScene();
    }

    private void TrySetupCurrentScene()
    {
        Scene active = SceneManager.GetActiveScene();
        string sceneName = active.name.ToLower();

        if (sceneName.Contains("splash"))
        {
            EnsureSplashIntroSetup();
            return;
        }

        if (sceneName.Contains("choose"))
        {
            EnsureChooseMapSetup();
            return;
        }

        // Scene gameplay — kalau ada LifetopiaPlayableLevel, dia yang handle via Start()
        if (FindObjectOfType<LifetopiaPlayableLevel>() != null)
            return;

        // Legacy scene tanpa LifetopiaPlayableLevel — hanya build HUD, tidak spawn apapun
        if (IsGameplayScene(sceneName))
        {
            // Legacy scene tanpa LifetopiaPlayableLevel — deteksi biome dari nama scene
            bool isFarm = sceneName.Contains("farm");
            BuildHudIfNeeded(isFarm);
        }
    }

    static bool IsGameplayScene(string n)
    {
        return n.Contains("farm") || n.Contains("map_city") || n.Contains("map_garden")
               || n.Contains("map_suburban") || n.Contains("map_fishing");
    }

    // ── Dipanggil dari LifetopiaPlayableLevel ─────────────────────────────────

    /// <summary>
    /// Dipanggil dari LifetopiaPlayableLevel.Start().
    /// Setup HUD + farm plots. FSM akan masuk Gameplay setelah cinematic selesai.
    /// </summary>
    public void BuildFromPlayableLevel(LifetopiaPlayableLevel spec)
    {
        if (spec == null) return;

        bool isFarm = spec.levelBiome == LifetopiaPlayableLevel.WorldBiomeKind.Farm;

        if (isFarm && spec.enableFarmPlots)
            EnsureFarmPlots();

        if (spec.enableHudAndHotbar)
            BuildHudIfNeeded(isFarm);

        // EnterLevel dipanggil setelah cinematic selesai via LevelFSM callback
        string biomeKey  = spec.BiomeKey();
        string sceneName = spec.gameObject.scene.name;

        var levelFsm = LifetopiaLevelGameplayFsm.Instance;
        if (levelFsm != null)
        {
            // One-shot callback: setelah cinematic → notify global FSM
            void OnIntroFinished()
            {
                LifetopiaGameFlowFsm.Instance?.EnterLevel(biomeKey, sceneName);
                levelFsm.OnCinematicIntroFinished -= OnIntroFinished;
            }
            levelFsm.OnCinematicIntroFinished += OnIntroFinished;
        }
        else
        {
            // Tidak ada FSM lokal — langsung enter level
            LifetopiaGameFlowFsm.Instance?.EnterLevel(biomeKey, sceneName);
        }
    }

    // ── Farm Plots ────────────────────────────────────────────────────────────

    private void EnsureFarmPlots()
    {
        if (GameObject.Find("FarmPlots") != null) return;

        var cfg = LifetopiaBootstrapConfig.Instance;
        Vector3 origin    = cfg != null ? cfg.plotOriginWorld  : new Vector3(-3.95f, -3.08f, 0f);
        float   step      = cfg != null ? cfg.plotStep         : 1.9f;
        Vector3 plotScale = cfg != null ? cfg.plotVisualScale  : new Vector3(2.1f, 1.2f, 1f);

        GameObject plots = new GameObject("FarmPlots");

        for (int i = 0; i < 4; i++)
        {
            GameObject plotGO = new GameObject("Plot_" + i);
            plotGO.transform.SetParent(plots.transform);
            plotGO.transform.position = origin + new Vector3(step * i, 0f, 0f);
            plotGO.transform.localScale = plotScale;

            SpriteRenderer sr = plotGO.AddComponent<SpriteRenderer>();
            sr.sortingOrder = 4;
            // Warna coklat tanah sebagai placeholder
            sr.color = new Color(0.4f, 0.26f, 0.13f);

            FarmPlot fp = plotGO.AddComponent<FarmPlot>();
            fp.wheatGrowSeconds = 120f;
        }
    }

    // ── HUD ───────────────────────────────────────────────────────────────────

    /// <summary>isFarm = true → HUD lengkap. false → top bar minimal saja.</summary>
    private void BuildHudIfNeeded(bool isFarm = true)
    {
        GameObject existingGo = GameObject.Find("AutoGameplayCanvas");
        if (existingGo != null && existingGo.GetComponent<LifetopiaFarmHudController>() != null)
        {
            _uiCanvas = existingGo;
            return;
        }

        if (existingGo != null)
            Destroy(existingGo);

        _uiCanvas = new GameObject("AutoGameplayCanvas");
        Canvas canvas = _uiCanvas.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvas.sortingOrder = 100;

        CanvasScaler scaler = _uiCanvas.AddComponent<CanvasScaler>();
        scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1920f, 1080f);
        scaler.matchWidthOrHeight = 0.5f;
        _uiCanvas.AddComponent<GraphicRaycaster>();

        // Hotbar bawah hanya untuk farm
        if (isFarm)
            BuildBottomHotbar(_uiCanvas.transform);

        PlayerFarmInteractor pf = FindPlayerInteractor();

        LifetopiaFarmHudController hud = _uiCanvas.AddComponent<LifetopiaFarmHudController>();
        hud.Setup(pf, isFarm);
    }

    /// <summary>Cari PlayerFarmInteractor dari GameObject bertag Player di scene.</summary>
    private static PlayerFarmInteractor FindPlayerInteractor()
    {
        GameObject playerGO = GameObject.FindWithTag("Player");
        if (playerGO != null)
            return playerGO.GetComponent<PlayerFarmInteractor>();
        return null;
    }

    private void BuildBottomHotbar(Transform parent)
    {
        // Jangan buat kalau sudah ada
        if (parent.Find("BottomHud") != null) return;

        GameObject bottomBar = CreatePanel(
            "BottomHud", parent,
            new Vector2(0.5f, 0f), new Vector2(0.5f, 0f),
            new Vector2(0f, 55f), new Vector2(740f, 74f),
            new Color(0.16f, 0.12f, 0.08f, 0.92f));

        string[] tools = { "HOE", "AXE", "PICK", "WATER", "SEED", "TOMATO", "CARROT", "PUMPKIN" };
        float startX = -315f;
        for (int i = 0; i < tools.Length; i++)
            CreateHotbarButton(tools[i], bottomBar.transform, new Vector2(startX + i * 90f, 0f), new Vector2(82f, 58f));
    }

    private GameObject CreatePanel(string name, Transform parent,
        Vector2 anchorMin, Vector2 anchorMax, Vector2 anchoredPos, Vector2 size, Color color)
    {
        GameObject panel = new GameObject(name);
        panel.transform.SetParent(parent, false);
        Image img = panel.AddComponent<Image>();
        img.color = color;
        RectTransform rt = panel.GetComponent<RectTransform>();
        rt.anchorMin = anchorMin;
        rt.anchorMax = anchorMax;
        rt.pivot = new Vector2(0.5f, 0.5f);
        rt.anchoredPosition = anchoredPos;
        rt.sizeDelta = size;
        return panel;
    }

    private void CreateHotbarButton(string label, Transform parent, Vector2 pos, Vector2 size)
    {
        GameObject go = new GameObject(label + "_BTN");
        go.transform.SetParent(parent, false);

        Image img = go.AddComponent<Image>();
        var cfg = LifetopiaBootstrapConfig.Instance;
        if (cfg != null && cfg.hotbarButtonSprite != null)
        {
            img.sprite = cfg.hotbarButtonSprite;
            img.type = Image.Type.Simple;
            img.color = Color.white;
        }
        else
            img.color = new Color(0.34f, 0.24f, 0.12f, 1f);

        go.AddComponent<Button>();
        go.AddComponent<UiButtonFeedback>();

        RectTransform rt = go.GetComponent<RectTransform>();
        rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 0.5f);
        rt.anchoredPosition = pos;
        rt.sizeDelta = size;

        GameObject txtGo = new GameObject("Label");
        txtGo.transform.SetParent(go.transform, false);
        TextMeshProUGUI txt = txtGo.AddComponent<TextMeshProUGUI>();
        txt.text = label;
        txt.alignment = TextAlignmentOptions.Center;
        txt.fontSize = 18f;
        txt.color = new Color(1f, 0.86f, 0.32f, 1f);
        RectTransform txtr = txt.rectTransform;
        txtr.anchorMin = Vector2.zero;
        txtr.anchorMax = Vector2.one;
        txtr.offsetMin = Vector2.zero;
        txtr.offsetMax = Vector2.zero;
    }

    // ── Splash & Choose Map (tetap auto-build karena tidak ada visual manual) ─

    private void EnsureSplashIntroSetup()
    {
        if (FindObjectOfType<IntroSceneSetup>() != null) return;

        GameObject setup = new GameObject("AutoIntroSetup");
        IntroSceneSetup intro = setup.AddComponent<IntroSceneSetup>();
        var cfg = LifetopiaBootstrapConfig.Instance;
        intro.logoSprite = cfg?.splashLogoOverride;
        intro.mapSprite  = cfg?.splashMapCinematicOverride;
        intro.nextScene  = "choose map";
    }

    private void EnsureChooseMapSetup()
    {
        if (FindObjectOfType<ChooseMapScene>() != null) return;

        GameObject setup = new GameObject("AutoChooseMapSetup");
        ChooseMapScene choose = setup.AddComponent<ChooseMapScene>();
        var cfg = LifetopiaBootstrapConfig.Instance;
        choose.mapBackgroundSprite = cfg?.chooseMapBackgroundOverride;
    }

    // ── Static helpers (masih dipakai LifetopiaFarmHudController) ────────────

    /// <summary>Fit SpriteRenderer BG ke ukuran kamera. Panggil dari scene jika perlu.</summary>
    public static void FitBackgroundSprite(SpriteRenderer sr)
    {
        if (sr == null || sr.sprite == null) return;
        Camera cam = Camera.main;
        if (cam == null) return;

        var cfg = LifetopiaBootstrapConfig.Instance;
        float targetH = cfg != null ? cfg.backgroundFitWorldHeight : 14f;
        float mult    = cfg != null ? cfg.backgroundScaleMultiplier : 1f;

        float worldW = cam.orthographicSize * 2f * cam.aspect;
        Vector2 sprSize = sr.sprite.bounds.size;
        if (sprSize.x <= 0f || sprSize.y <= 0f) return;

        float scale = Mathf.Max(worldW / sprSize.x, targetH / sprSize.y) * mult;
        sr.transform.localScale = new Vector3(scale, scale, 1f);
    }

    /// <summary>Resolve sprite BG berdasarkan biome key. Masih dipakai HUD ApplyBiome.</summary>
    public static Sprite ResolveBiomeBackground(string biomeUpper)
    {
        var cfg = LifetopiaBootstrapConfig.Instance;
        string b = string.IsNullOrEmpty(biomeUpper) ? "FARM" : biomeUpper.ToUpperInvariant();

        switch (b)
        {
            case "CITY":     if (cfg?.biomeCitySprite     != null) return cfg.biomeCitySprite;     break;
            case "SUBURBAN": if (cfg?.biomeSuburbanSprite != null) return cfg.biomeSuburbanSprite; break;
            case "GARDEN":   if (cfg?.biomeGardenSprite   != null) return cfg.biomeGardenSprite;   break;
            case "FISHING":  if (cfg?.biomeFishingSprite  != null) return cfg.biomeFishingSprite;  break;
            default:         if (cfg?.biomeFarmSprite     != null) return cfg.biomeFarmSprite;     break;
        }

        return null; // tidak ada sprite — biarkan BG manual di scene
    }
}
