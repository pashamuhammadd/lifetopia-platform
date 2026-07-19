using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro;

/// <summary>
/// Otomatis membuat label nama lokasi di peta bergaya pixel/golden.
/// 
/// CARA PAKAI:
/// 1. Attach script ini ke Canvas di scene "choose map"
/// 2. Assign mapImage (RectTransform gambar peta)
/// 3. Isi list locations dengan nama, posisi, dan scene tujuan
/// 4. Play — label muncul otomatis dengan animasi
/// </summary>
public class MapLabelManager : MonoBehaviour
{
    // ── Data Lokasi ───────────────────────────────────────────────────────────
    [System.Serializable]
    public class LocationData
    {
        public string locationName  = "CITY";
        public string sceneName     = "";
        [Tooltip("Posisi dalam persen dari ukuran peta (0-1). 0,0 = kiri bawah, 1,1 = kanan atas")]
        [Range(0f, 1f)] public float anchorX = 0.5f;
        [Range(0f, 1f)] public float anchorY = 0.5f;
        [Tooltip("Offset tambahan dalam pixel dari anchor")]
        public Vector2 labelOffset  = new Vector2(0f, 28f);
        public bool    isUnlocked   = true;
        [Tooltip("Sprite ikon lokasi (opsional, muncul di atas label)")]
        public Sprite  locationIcon;
    }

    [Header("References")]
    [Tooltip("RectTransform dari gambar peta")]
    public RectTransform mapRect;
    [Tooltip("Canvas parent untuk label (biarkan kosong = pakai Canvas ini)")]
    public Canvas targetCanvas;

    [Header("Lokasi di Peta")]
    public List<LocationData> locations = new List<LocationData>()
    {
        new LocationData { locationName = "CITY",     anchorX = 0.22f, anchorY = 0.68f, sceneName = "map_city" },
        new LocationData { locationName = "FARM",     anchorX = 0.15f, anchorY = 0.35f, sceneName = "farm game" },
        new LocationData { locationName = "GARDEN",   anchorX = 0.50f, anchorY = 0.42f, sceneName = "map_garden" },
        new LocationData { locationName = "SUBURBAN", anchorX = 0.75f, anchorY = 0.72f, sceneName = "map_suburban" },
        new LocationData { locationName = "FISHING",  anchorX = 0.82f, anchorY = 0.18f, sceneName = "map_fishing" },
    };

    [Header("Style Label")]
    public Font         pixelFont;                  // assign pixel font, atau biarkan default
    public TMP_FontAsset tmpPixelFont;              // untuk TextMeshPro
    public float        labelFontSize    = 18f;
    public Color        labelColorNormal = new Color(1f, 0.92f, 0.2f);   // golden
    public Color        labelColorLocked = new Color(0.5f, 0.5f, 0.5f);
    public Color        bgColorNormal    = new Color(0.12f, 0.08f, 0.02f, 0.82f);
    public Color        bgColorLocked    = new Color(0.1f, 0.1f, 0.1f, 0.75f);
    public float        bgPaddingX       = 14f;
    public float        bgPaddingY       = 6f;
    public float        bgCornerRadius   = 8f;      // hanya visual, pakai sprite rounded

    [Header("Dot / Pin")]
    public Sprite dotSprite;                        // sprite titik/pin lokasi
    public float  dotSize       = 20f;
    public Color  dotColorNormal = new Color(1f, 0.85f, 0.1f);
    public Color  dotColorLocked = Color.gray;

    [Header("Animasi Muncul")]
    public float appearDelay    = 0.15f;            // jeda antar label muncul
    public float appearDuration = 0.4f;

    [Header("Bottom Bar")]
    public bool  showBottomBar  = true;
    public string bottomBarText = "TAP A LOCATION TO TRAVEL";

    // ── Runtime ───────────────────────────────────────────────────────────────
    private List<MapLocationLabel> _labelObjects = new List<MapLocationLabel>();
    private RectTransform _canvasRect;
    private GameObject _bottomBar;

    // ─────────────────────────────────────────────────────────────────────────

    void Start()
    {
        if (targetCanvas == null) targetCanvas = GetComponentInParent<Canvas>();
        _canvasRect = targetCanvas.GetComponent<RectTransform>();

        if (mapRect == null)
        {
            UnityEngine.Debug.LogWarning("[MapLabelManager] mapRect belum di-assign! Cari otomatis...");
            var imgs = FindObjectsOfType<Image>();
            foreach (var img in imgs)
                if (img.gameObject.name.ToLower().Contains("map"))
                { mapRect = img.rectTransform; break; }
        }

        BuildAllLabels();

        if (showBottomBar) BuildBottomBar();
    }

    // ── Build Semua Label ─────────────────────────────────────────────────────

    private void BuildAllLabels()
    {
        for (int i = 0; i < locations.Count; i++)
        {
            var data = locations[i];
            GameObject labelGO = BuildLabel(data);
            MapLocationLabel comp = labelGO.GetComponent<MapLocationLabel>();
            _labelObjects.Add(comp);

            // Animasi muncul berurutan
            StartCoroutine(AnimateAppear(labelGO, i * appearDelay));
        }
    }

    private GameObject BuildLabel(LocationData data)
    {
        // ── Container ──
        GameObject container = new GameObject($"Label_{data.locationName}");
        container.transform.SetParent(targetCanvas.transform, false);

        RectTransform containerRect = container.AddComponent<RectTransform>();
        containerRect.sizeDelta = Vector2.zero;

        // Posisi berdasarkan anchor di peta
        Vector2 worldPos = GetMapPosition(data.anchorX, data.anchorY);
        containerRect.anchoredPosition = worldPos + data.labelOffset;

        // Tambah komponen interaksi
        MapLocationLabel labelComp = container.AddComponent<MapLocationLabel>();
        labelComp.locationName = data.locationName;
        labelComp.sceneName    = data.sceneName;
        labelComp.isUnlocked   = data.isUnlocked;
        labelComp.OnLocationClicked += OnLocationSelected;

        // Tambah GraphicRaycaster target
        container.AddComponent<CanvasGroup>();

        // ── Dot / Pin ──
        if (dotSprite != null || true)
        {
            GameObject dotGO = new GameObject("Dot");
            dotGO.transform.SetParent(container.transform, false);
            Image dotImg = dotGO.AddComponent<Image>();
            if (dotSprite != null) dotImg.sprite = dotSprite;
            else dotImg.color = data.isUnlocked ? dotColorNormal : dotColorLocked;

            RectTransform dotRect = dotGO.GetComponent<RectTransform>();
            dotRect.sizeDelta        = new Vector2(dotSize, dotSize);
            dotRect.anchoredPosition = new Vector2(0f, -dotSize * 0.5f - 2f);
        }

        // ── Background pill ──
        GameObject bgGO = new GameObject("Background");
        bgGO.transform.SetParent(container.transform, false);
        Image bgImg = bgGO.AddComponent<Image>();
        bgImg.color = data.isUnlocked ? bgColorNormal : bgColorLocked;
        // Rounded look — kalau ada sprite rounded assign di sini
        bgImg.type = Image.Type.Sliced;

        RectTransform bgRect = bgGO.GetComponent<RectTransform>();

        // ── Teks nama ──
        GameObject textGO = new GameObject("Text");
        textGO.transform.SetParent(bgGO.transform, false);

        TextMeshProUGUI tmp = textGO.AddComponent<TextMeshProUGUI>();
        tmp.text      = data.locationName;
        tmp.fontSize  = labelFontSize;
        tmp.color     = data.isUnlocked ? labelColorNormal : labelColorLocked;
        tmp.alignment = TextAlignmentOptions.Center;
        tmp.fontStyle = FontStyles.Bold;
        if (tmpPixelFont != null) tmp.font = tmpPixelFont;

        // Auto-size background sesuai teks
        tmp.ForceMeshUpdate();
        Vector2 textSize = tmp.GetRenderedValues(false);
        Vector2 bgSize   = new Vector2(
            textSize.x + bgPaddingX * 2f,
            labelFontSize + bgPaddingY * 2f
        );
        bgRect.sizeDelta        = bgSize;
        bgRect.anchoredPosition = Vector2.zero;

        RectTransform textRect = textGO.GetComponent<RectTransform>();
        textRect.anchorMin        = Vector2.zero;
        textRect.anchorMax        = Vector2.one;
        textRect.offsetMin        = new Vector2(bgPaddingX, bgPaddingY);
        textRect.offsetMax        = new Vector2(-bgPaddingX, -bgPaddingY);

        // ── Lock icon (kalau locked) ──
        Image lockIcon = null;
        if (!data.isUnlocked)
        {
            GameObject lockGO = new GameObject("LockIcon");
            lockGO.transform.SetParent(container.transform, false);
            lockIcon = lockGO.AddComponent<Image>();
            lockIcon.color = Color.white;

            RectTransform lockRect = lockGO.GetComponent<RectTransform>();
            lockRect.sizeDelta        = new Vector2(16f, 16f);
            lockRect.anchoredPosition = new Vector2(bgSize.x * 0.5f + 4f, 0f);
        }

        // Assign referensi ke komponen
        labelComp.labelRect       = containerRect;
        labelComp.labelText       = tmp;
        labelComp.labelBackground = bgImg;
        labelComp.lockIcon        = lockIcon;
        labelComp.RefreshLabelColor();

        // Mulai invisible (animasi muncul)
        CanvasGroup cg = container.GetComponent<CanvasGroup>();
        cg.alpha = 0f;
        container.transform.localScale = Vector3.one * 0.5f;

        return container;
    }

    // ── Bottom Bar "TAP A LOCATION TO TRAVEL" ────────────────────────────────

    private void BuildBottomBar()
    {
        _bottomBar = new GameObject("BottomBar");
        _bottomBar.transform.SetParent(targetCanvas.transform, false);

        RectTransform barRect = _bottomBar.AddComponent<RectTransform>();
        barRect.anchorMin        = new Vector2(0.5f, 0f);
        barRect.anchorMax        = new Vector2(0.5f, 0f);
        barRect.pivot            = new Vector2(0.5f, 0f);
        barRect.anchoredPosition = new Vector2(0f, 30f);
        barRect.sizeDelta        = new Vector2(420f, 48f);

        // Background pill
        Image barBg = _bottomBar.AddComponent<Image>();
        barBg.color = new Color(0.85f, 0.65f, 0.05f, 1f); // golden bar

        // Teks
        GameObject barTextGO = new GameObject("BarText");
        barTextGO.transform.SetParent(_bottomBar.transform, false);
        TextMeshProUGUI barTMP = barTextGO.AddComponent<TextMeshProUGUI>();
        barTMP.text      = bottomBarText;
        barTMP.fontSize  = 16f;
        barTMP.color     = new Color(0.15f, 0.08f, 0f);
        barTMP.alignment = TextAlignmentOptions.Center;
        barTMP.fontStyle = FontStyles.Bold;
        if (tmpPixelFont != null) barTMP.font = tmpPixelFont;

        RectTransform barTextRect = barTextGO.GetComponent<RectTransform>();
        barTextRect.anchorMin = Vector2.zero;
        barTextRect.anchorMax = Vector2.one;
        barTextRect.offsetMin = new Vector2(16f, 4f);
        barTextRect.offsetMax = new Vector2(-16f, -4f);

        // Animasi muncul
        CanvasGroup barCG = _bottomBar.AddComponent<CanvasGroup>();
        barCG.alpha = 0f;
        StartCoroutine(AnimateAppear(_bottomBar, locations.Count * appearDelay + 0.2f));
    }

    // ── Animasi Muncul ────────────────────────────────────────────────────────

    private IEnumerator AnimateAppear(GameObject go, float delay)
    {
        yield return new WaitForSeconds(delay);

        CanvasGroup cg = go.GetComponent<CanvasGroup>();
        if (cg == null) cg = go.AddComponent<CanvasGroup>();

        float timer = 0f;
        Vector3 startScale = Vector3.one * 0.5f;
        Vector3 endScale   = Vector3.one;

        while (timer < appearDuration)
        {
            timer += Time.deltaTime;
            float t = Mathf.Clamp01(timer / appearDuration);
            float eased = 1f - Mathf.Pow(1f - t, 3f); // cubic ease out

            cg.alpha             = eased;
            go.transform.localScale = Vector3.Lerp(startScale, endScale, eased);
            yield return null;
        }

        cg.alpha             = 1f;
        go.transform.localScale = endScale;
    }

    // ── Kalkulasi Posisi ──────────────────────────────────────────────────────

    /// <summary>
    /// Konversi anchor (0-1) relatif terhadap mapRect ke posisi anchoredPosition di canvas.
    /// </summary>
    private Vector2 GetMapPosition(float anchorX, float anchorY)
    {
        if (mapRect == null) return Vector2.zero;

        // Ukuran peta dalam canvas space
        Vector2 mapSize = mapRect.rect.size;
        Vector2 mapPos  = mapRect.anchoredPosition;

        // Pivot peta (biasanya 0.5, 0.5)
        Vector2 pivot = mapRect.pivot;

        float x = mapPos.x + (anchorX - pivot.x) * mapSize.x;
        float y = mapPos.y + (anchorY - pivot.y) * mapSize.y;

        return new Vector2(x, y);
    }

    // ── Klik Lokasi ───────────────────────────────────────────────────────────

    private void OnLocationSelected(MapLocationLabel label)
    {
        if (!label.isUnlocked) return;

        UnityEngine.Debug.Log($"[MapLabelManager] Pergi ke: {label.locationName} → {label.sceneName}");

        if (LifetopiaGameState.Instance != null)
            LifetopiaGameState.Instance.SetTravelBiome(label.locationName);

        if (!string.IsNullOrEmpty(label.sceneName))
        {
            LifetopiaGameFlowFsm.Instance?.BeginTravel();

            if (SceneTransitionManager.Instance != null)
                SceneTransitionManager.Instance.LoadScene(label.sceneName);
            else
                SceneManager.LoadScene(label.sceneName);
        }
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /// <summary>Unlock lokasi berdasarkan nama.</summary>
    public void UnlockLocation(string name)
    {
        foreach (var lbl in _labelObjects)
        {
            if (lbl.locationName == name)
            {
                lbl.SetUnlocked(true);
                return;
            }
        }
    }

    /// <summary>Lock lokasi berdasarkan nama.</summary>
    public void LockLocation(string name)
    {
        foreach (var lbl in _labelObjects)
        {
            if (lbl.locationName == name)
            {
                lbl.SetUnlocked(false);
                return;
            }
        }
    }
}
