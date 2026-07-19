using UnityEngine;
using UnityEngine.UI;
using TMPro;

/// <summary>
/// Auto-build seluruh UI intro + cinematic map reveal via code.
/// Attach ke empty GameObject di scene splashscreen/intro.
///
/// Hierarchy yang dibuat:
///   IntroCanvas
///   ├── MapImage          ← gambar peta (di belakang)
///   ├── Vignette          ← overlay gelap tepi layar
///   ├── Logo              ← logo game (bounce in)
///   ├── Tagline           ← teks tagline (opsional)
///   └── BlackOverlay      ← panel hitam (paling depan, untuk fade)
/// </summary>
public class IntroSceneSetup : MonoBehaviour
{
    [Header("Assets")]
    public Sprite logoSprite;
    public Sprite mapSprite;                          // gambar peta / world map
    public string taglineString = "";                 // kosongkan kalau tidak mau tagline
    public string nextScene     = "choose map";

    [Header("Cinematic Map Settings")]
    public float mapStartScale  = 1.4f;
    public float mapEndScale    = 1.0f;
    public Vector2 mapStartOffset = new Vector2(-120f, 80f);
    public Vector2 mapEndOffset   = new Vector2(0f, 0f);
    public float mapZoomDuration  = 3.5f;

    [Header("Colors")]
    public Color taglineColor = new Color(1f, 0.85f, 0.3f);

    void Awake()
    {
        BuildUI();
    }

    private void BuildUI()
    {
        // ── Canvas ──────────────────────────────────────────────────────────
        GameObject canvasGO = new GameObject("IntroCanvas");
        Canvas canvas = canvasGO.AddComponent<Canvas>();
        canvas.renderMode  = RenderMode.ScreenSpaceOverlay;
        canvas.sortingOrder = 100;

        CanvasScaler scaler = canvasGO.AddComponent<CanvasScaler>();
        scaler.uiScaleMode        = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1920, 1080);
        scaler.matchWidthOrHeight  = 0.5f;

        canvasGO.AddComponent<GraphicRaycaster>();

        // ── Map Image (paling bawah) ─────────────────────────────────────────
        GameObject mapGO = new GameObject("MapImage");
        mapGO.transform.SetParent(canvasGO.transform, false);
        Image mapImg = mapGO.AddComponent<Image>();
        if (mapSprite != null) mapImg.sprite = mapSprite;
        mapImg.preserveAspect = false;

        RectTransform mapRect = mapGO.GetComponent<RectTransform>();
        // Penuhi seluruh layar
        mapRect.anchorMin        = Vector2.zero;
        mapRect.anchorMax        = Vector2.one;
        mapRect.offsetMin        = Vector2.zero;
        mapRect.offsetMax        = Vector2.zero;
        mapRect.localScale       = Vector3.one * mapStartScale;
        mapRect.anchoredPosition = mapStartOffset;

        CanvasGroup mapCG = mapGO.AddComponent<CanvasGroup>();
        mapCG.alpha = 0f;

        // ── Vignette (gradient gelap di tepi) ───────────────────────────────
        GameObject vigGO = new GameObject("Vignette");
        vigGO.transform.SetParent(canvasGO.transform, false);
        Image vigImg = vigGO.AddComponent<Image>();
        // Warna hitam transparan — di editor bisa ganti dengan texture vignette
        vigImg.color = new Color(0f, 0f, 0f, 0f);

        RectTransform vigRect = vigGO.GetComponent<RectTransform>();
        vigRect.anchorMin = Vector2.zero;
        vigRect.anchorMax = Vector2.one;
        vigRect.offsetMin = Vector2.zero;
        vigRect.offsetMax = Vector2.zero;

        CanvasGroup vigCG = vigGO.AddComponent<CanvasGroup>();
        vigCG.alpha = 0f;
        vigCG.blocksRaycasts = false;

        // ── Logo ─────────────────────────────────────────────────────────────
        GameObject logoGO = new GameObject("Logo");
        logoGO.transform.SetParent(canvasGO.transform, false);
        Image logoImg = logoGO.AddComponent<Image>();
        if (logoSprite != null) logoImg.sprite = logoSprite;
        logoImg.preserveAspect = true;

        RectTransform logoRect = logoGO.GetComponent<RectTransform>();
        logoRect.anchorMin        = new Vector2(0.5f, 0.5f);
        logoRect.anchorMax        = new Vector2(0.5f, 0.5f);
        logoRect.anchoredPosition = new Vector2(0f, 40f);
        logoRect.sizeDelta        = new Vector2(420f, 210f);

        CanvasGroup logoCG = logoGO.AddComponent<CanvasGroup>();
        logoCG.alpha = 0f;

        // Auto-scale logo
        LogoAutoScale autoScale = logoGO.AddComponent<LogoAutoScale>();
        autoScale.targetScreenWidthRatio = 0.25f;
        autoScale.maxScreenHeightRatio   = 0.20f;
        autoScale.animateOnStart         = false;

        // ── Tagline ──────────────────────────────────────────────────────────
        CanvasGroup taglineCG = null;
        TextMeshProUGUI taglineTMP = null;

        if (!string.IsNullOrEmpty(taglineString))
        {
            GameObject taglineGO = new GameObject("Tagline");
            taglineGO.transform.SetParent(canvasGO.transform, false);
            taglineTMP = taglineGO.AddComponent<TextMeshProUGUI>();
            taglineTMP.text      = taglineString;
            taglineTMP.fontSize  = 30;
            taglineTMP.color     = taglineColor;
            taglineTMP.alignment = TextAlignmentOptions.Center;
            taglineTMP.fontStyle = FontStyles.Bold;

            RectTransform taglineRect = taglineGO.GetComponent<RectTransform>();
            taglineRect.anchorMin        = new Vector2(0.5f, 0.5f);
            taglineRect.anchorMax        = new Vector2(0.5f, 0.5f);
            taglineRect.anchoredPosition = new Vector2(0f, -70f);
            taglineRect.sizeDelta        = new Vector2(800f, 60f);

            taglineCG = taglineGO.AddComponent<CanvasGroup>();
            taglineCG.alpha = 0f;
        }

        // ── Black Overlay (paling depan) ─────────────────────────────────────
        GameObject overlayGO = new GameObject("BlackOverlay");
        overlayGO.transform.SetParent(canvasGO.transform, false);
        Image overlayImg = overlayGO.AddComponent<Image>();
        overlayImg.color = Color.black;

        RectTransform overlayRect = overlayGO.GetComponent<RectTransform>();
        overlayRect.anchorMin = Vector2.zero;
        overlayRect.anchorMax = Vector2.one;
        overlayRect.offsetMin = Vector2.zero;
        overlayRect.offsetMax = Vector2.zero;

        CanvasGroup overlayCG = overlayGO.AddComponent<CanvasGroup>();
        overlayCG.alpha = 1f;
        overlayCG.blocksRaycasts = false;

        // ── GameIntro controller ─────────────────────────────────────────────
        GameIntro intro = canvasGO.AddComponent<GameIntro>();
        intro.nextSceneName      = nextScene;
        intro.blackOverlay       = overlayCG;
        intro.logoRect           = logoRect;
        intro.logoGroup          = logoCG;
        intro.taglineGroup       = taglineCG;
        intro.taglineText        = taglineTMP;
        intro.mapRect            = mapRect;
        intro.mapGroup           = mapCG;
        intro.vignetteGroup      = vigCG;

        // Cinematic settings
        intro.mapStartScale      = mapStartScale;
        intro.mapEndScale        = mapEndScale;
        intro.mapStartOffset     = mapStartOffset;
        intro.mapEndOffset       = mapEndOffset;
        intro.mapZoomDuration    = mapZoomDuration;
    }
}
