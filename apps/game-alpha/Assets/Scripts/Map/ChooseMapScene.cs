using UnityEngine;
using UnityEngine.UI;
using TMPro;

/// <summary>
/// Setup otomatis scene "choose map".
/// Attach ke empty GameObject di scene choose map.
/// Akan membuat Canvas + peta + semua label lokasi secara otomatis.
/// </summary>
public class ChooseMapScene : MonoBehaviour
{
    [Header("Sprites")]
    public Sprite mapBackgroundSprite;   // gambar peta dunia
    public Sprite logoSprite;            // logo kecil di pojok

    [Header("Font")]
    public TMP_FontAsset pixelFont;      // assign pixel font (opsional)

    [Header("Lokasi — sesuaikan posisi anchor dengan peta kamu")]
    public MapLabelManager.LocationData[] locationOverrides;

    void Awake()
    {
        BuildScene();
    }

    private void BuildScene()
    {
        // ── Canvas ──────────────────────────────────────────────────────────
        GameObject canvasGO = new GameObject("MapCanvas");
        Canvas canvas = canvasGO.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;

        UnityEngine.UI.CanvasScaler scaler = canvasGO.AddComponent<UnityEngine.UI.CanvasScaler>();
        scaler.uiScaleMode         = UnityEngine.UI.CanvasScaler.ScaleMode.ScaleWithScreenSize;
        scaler.referenceResolution = new Vector2(1920, 1080);
        scaler.matchWidthOrHeight  = 0.5f;

        canvasGO.AddComponent<UnityEngine.UI.GraphicRaycaster>();

        // ── Map Background ───────────────────────────────────────────────────
        GameObject mapGO = new GameObject("MapBackground");
        mapGO.transform.SetParent(canvasGO.transform, false);
        UnityEngine.UI.Image mapImg = mapGO.AddComponent<UnityEngine.UI.Image>();
        if (mapBackgroundSprite != null) mapImg.sprite = mapBackgroundSprite;
        mapImg.preserveAspect = false;

        RectTransform mapRect = mapGO.GetComponent<RectTransform>();
        mapRect.anchorMin = Vector2.zero;
        mapRect.anchorMax = Vector2.one;
        mapRect.offsetMin = Vector2.zero;
        mapRect.offsetMax = Vector2.zero;

        // ── Logo pojok kiri atas ─────────────────────────────────────────────
        if (logoSprite != null)
        {
            GameObject logoGO = new GameObject("LogoCorner");
            logoGO.transform.SetParent(canvasGO.transform, false);
            UnityEngine.UI.Image logoImg = logoGO.AddComponent<UnityEngine.UI.Image>();
            logoImg.sprite = logoSprite;
            logoImg.preserveAspect = true;

            RectTransform logoRect = logoGO.GetComponent<RectTransform>();
            logoRect.anchorMin        = new Vector2(0f, 1f);
            logoRect.anchorMax        = new Vector2(0f, 1f);
            logoRect.pivot            = new Vector2(0f, 1f);
            logoRect.anchoredPosition = new Vector2(20f, -20f);
            logoRect.sizeDelta        = new Vector2(160f, 80f);

            // Auto-scale logo
            LogoAutoScale ls = logoGO.AddComponent<LogoAutoScale>();
            ls.targetScreenWidthRatio = 0.10f;
            ls.maxScreenHeightRatio   = 0.12f;
            ls.animateOnStart         = false;
        }

        // ── MapLabelManager ──────────────────────────────────────────────────
        MapLabelManager mgr = canvasGO.AddComponent<MapLabelManager>();
        mgr.mapRect      = mapRect;
        mgr.targetCanvas = canvas;
        if (pixelFont != null) mgr.tmpPixelFont = pixelFont;

        // Override lokasi kalau ada
        if (locationOverrides != null && locationOverrides.Length > 0)
        {
            mgr.locations.Clear();
            foreach (var loc in locationOverrides)
                mgr.locations.Add(loc);
        }
    }
}
