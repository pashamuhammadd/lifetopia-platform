using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

/// <summary>
/// Cinematic title card yang muncul saat masuk scene.
/// Style: pixel/golden seperti screenshot — letterbox bars, judul biome, subtitle, partikel.
///
/// CARA PAKAI:
///   Attach ke LifetopiaPlayableLevel GameObject, atau biarkan LifetopiaPlayableLevel
///   auto-spawn via AddComponent.
///
/// CUSTOMISASI (semua dari Inspector):
///   - biomeTitles[]  : judul per biome
///   - subtitles[]    : subtitle per biome
///   - accentColor    : warna teks utama (default golden)
///   - letterboxColor : warna bar atas/bawah
///   - durasi masing-masing fase
/// </summary>
public class LevelCinematicIntro : MonoBehaviour
{
    // ── Biome Data ────────────────────────────────────────────────────────────

    [System.Serializable]
    public class BiomeTitleData
    {
        public LifetopiaPlayableLevel.WorldBiomeKind biome;
        [Tooltip("Judul besar, e.g. 'CITY DISTRICT'")]
        public string title    = "CITY DISTRICT";
        [Tooltip("Subtitle kecil, e.g. 'Where commerce meets adventure'")]
        public string subtitle = "Where commerce meets adventure";
        [Tooltip("Warna aksen override. Kosong = pakai accentColor global.")]
        public Color  accentOverride = Color.clear;
    }

    // ── Inspector ─────────────────────────────────────────────────────────────

    [Header("Biome Titles")]
    public BiomeTitleData[] biomeTitles = new BiomeTitleData[]
    {
        new BiomeTitleData { biome = LifetopiaPlayableLevel.WorldBiomeKind.Farm,
            title = "LIFETOPIA FARM", subtitle = "Grow. Harvest. Prosper." },
        new BiomeTitleData { biome = LifetopiaPlayableLevel.WorldBiomeKind.City,
            title = "CITY DISTRICT",  subtitle = "Where commerce meets adventure." },
        new BiomeTitleData { biome = LifetopiaPlayableLevel.WorldBiomeKind.Garden,
            title = "THE GARDEN",     subtitle = "Nature's bounty awaits." },
        new BiomeTitleData { biome = LifetopiaPlayableLevel.WorldBiomeKind.Suburban,
            title = "SUBURBAN HILLS", subtitle = "A quiet life, a big world." },
        new BiomeTitleData { biome = LifetopiaPlayableLevel.WorldBiomeKind.Fishing,
            title = "FISHING COVE",   subtitle = "Cast your line. Reel in fortune." },
    };

    [Header("Style")]
    [Tooltip("Warna teks judul (golden default).")]
    public Color accentColor      = new Color(1f, 0.85f, 0.15f, 1f);
    [Tooltip("Warna bar letterbox atas/bawah.")]
    public Color letterboxColor   = new Color(0f, 0f, 0f, 0.92f);
    [Tooltip("Warna teks subtitle.")]
    public Color subtitleColor    = new Color(0.9f, 0.9f, 0.9f, 1f);
    [Tooltip("Warna garis dekoratif di bawah judul.")]
    public Color lineColor        = new Color(1f, 0.85f, 0.15f, 0.8f);
    [Tooltip("Font untuk judul (TMP). Kosong = default TMP font.")]
    public TMP_FontAsset titleFont;
    [Tooltip("Font untuk subtitle.")]
    public TMP_FontAsset subtitleFont;

    [Header("Timing (detik)")]
    public float letterboxSlideIn  = 0.35f;
    public float titleFadeIn       = 0.45f;
    public float titleHold         = 1.6f;
    public float subtitleFadeIn    = 0.3f;
    public float subtitleHold      = 0.8f;
    public float fadeOut           = 0.5f;

    [Header("Particles")]
    [Tooltip("Jumlah partikel golden yang muncul saat title hold.")]
    public int   particleCount     = 40;
    public float particleLifetime  = 2.5f;
    public float particleSpeed     = 60f;

    [Header("Skip")]
    [Tooltip("Tekan Space/Enter untuk skip cinematic.")]
    public bool allowSkip          = true;

    // ── Runtime ───────────────────────────────────────────────────────────────

    Canvas          _canvas;
    RectTransform   _topBar, _botBar;
    TextMeshProUGUI _titleTmp, _subtitleTmp;
    RectTransform   _line;
    CanvasGroup     _titleGroup, _subtitleGroup, _lineGroup;
    bool            _skipped;

    // ─────────────────────────────────────────────────────────────────────────

    /// <summary>Panggil dari LifetopiaPlayableLevel setelah biome diketahui.</summary>
    public void Play(LifetopiaPlayableLevel.WorldBiomeKind biome)
    {
        BiomeTitleData data = GetData(biome);
        Color accent = (data.accentOverride.a > 0f) ? data.accentOverride : accentColor;
        StartCoroutine(RunCinematic(data.title, data.subtitle, accent));
    }

    // ── Build UI ──────────────────────────────────────────────────────────────

    void BuildUI(string title, string subtitle, Color accent)
    {
        // Canvas
        GameObject cGO = new GameObject("CinematicCanvas");
        _canvas = cGO.AddComponent<Canvas>();
        _canvas.renderMode  = RenderMode.ScreenSpaceOverlay;
        _canvas.sortingOrder = 999;
        cGO.AddComponent<CanvasScaler>().uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
        ((CanvasScaler)cGO.GetComponent<CanvasScaler>()).referenceResolution = new Vector2(1920, 1080);
        cGO.AddComponent<GraphicRaycaster>();

        // ── Letterbox bars ──
        _topBar = MakeBar("TopBar", cGO.transform, new Vector2(0f, 1f), new Vector2(1f, 1f),
            new Vector2(0.5f, 1f), 140f, letterboxColor);
        _botBar = MakeBar("BotBar", cGO.transform, new Vector2(0f, 0f), new Vector2(1f, 0f),
            new Vector2(0.5f, 0f), 140f, letterboxColor);

        // Start off-screen
        _topBar.anchoredPosition = new Vector2(0f,  140f);
        _botBar.anchoredPosition = new Vector2(0f, -140f);

        // ── Center group ──
        GameObject centerGO = new GameObject("CenterGroup");
        centerGO.transform.SetParent(cGO.transform, false);
        RectTransform centerRT = centerGO.AddComponent<RectTransform>();
        centerRT.anchorMin = centerRT.anchorMax = new Vector2(0.5f, 0.5f);
        centerRT.anchoredPosition = Vector2.zero;
        centerRT.sizeDelta = new Vector2(1200f, 200f);

        // ── Decorative line ──
        GameObject lineGO = new GameObject("Line");
        lineGO.transform.SetParent(centerGO.transform, false);
        Image lineImg = lineGO.AddComponent<Image>();
        lineImg.color = lineColor;
        _line = lineGO.GetComponent<RectTransform>();
        _line.anchorMin = _line.anchorMax = new Vector2(0.5f, 0.5f);
        _line.anchoredPosition = new Vector2(0f, 8f);
        _line.sizeDelta = new Vector2(900f, 3f);
        _lineGroup = lineGO.AddComponent<CanvasGroup>();
        _lineGroup.alpha = 0f;

        // ── Title ──
        GameObject titleGO = new GameObject("Title");
        titleGO.transform.SetParent(centerGO.transform, false);
        _titleTmp = titleGO.AddComponent<TextMeshProUGUI>();
        _titleTmp.text      = title;
        _titleTmp.fontSize  = 72f;
        _titleTmp.fontStyle = FontStyles.Bold;
        _titleTmp.color     = accent;
        _titleTmp.alignment = TextAlignmentOptions.Center;
        _titleTmp.characterSpacing = 8f;
        if (titleFont != null) _titleTmp.font = titleFont;

        // Outline effect
        _titleTmp.outlineWidth = 0.2f;
        _titleTmp.outlineColor = new Color(0f, 0f, 0f, 0.8f);

        RectTransform titleRT = titleGO.GetComponent<RectTransform>();
        titleRT.anchorMin = titleRT.anchorMax = new Vector2(0.5f, 0.5f);
        titleRT.anchoredPosition = new Vector2(0f, 50f);
        titleRT.sizeDelta = new Vector2(1100f, 100f);

        _titleGroup = titleGO.AddComponent<CanvasGroup>();
        _titleGroup.alpha = 0f;

        // ── Subtitle ──
        GameObject subGO = new GameObject("Subtitle");
        subGO.transform.SetParent(centerGO.transform, false);
        _subtitleTmp = subGO.AddComponent<TextMeshProUGUI>();
        _subtitleTmp.text      = subtitle;
        _subtitleTmp.fontSize  = 28f;
        _subtitleTmp.fontStyle = FontStyles.Italic;
        _subtitleTmp.color     = subtitleColor;
        _subtitleTmp.alignment = TextAlignmentOptions.Center;
        _subtitleTmp.characterSpacing = 3f;
        if (subtitleFont != null) _subtitleTmp.font = subtitleFont;

        RectTransform subRT = subGO.GetComponent<RectTransform>();
        subRT.anchorMin = subRT.anchorMax = new Vector2(0.5f, 0.5f);
        subRT.anchoredPosition = new Vector2(0f, -20f);
        subRT.sizeDelta = new Vector2(1000f, 60f);

        _subtitleGroup = subGO.AddComponent<CanvasGroup>();
        _subtitleGroup.alpha = 0f;
    }

    RectTransform MakeBar(string name, Transform parent,
        Vector2 anchorMin, Vector2 anchorMax, Vector2 pivot, float height, Color color)
    {
        GameObject go = new GameObject(name);
        go.transform.SetParent(parent, false);
        Image img = go.AddComponent<Image>();
        img.color = color;
        RectTransform rt = go.GetComponent<RectTransform>();
        rt.anchorMin = anchorMin;
        rt.anchorMax = anchorMax;
        rt.pivot     = pivot;
        rt.offsetMin = Vector2.zero;
        rt.offsetMax = Vector2.zero;
        rt.sizeDelta = new Vector2(0f, height);
        return rt;
    }

    // ── Cinematic Coroutine ───────────────────────────────────────────────────

    IEnumerator RunCinematic(string title, string subtitle, Color accent)
    {
        BuildUI(title, subtitle, accent);

        // ── 1. Letterbox slide in ──
        yield return AnimateBars(0f, 1f, letterboxSlideIn);
        if (_skipped) { SkipToEnd(); yield break; }

        // ── 2. Title fade in + slide up ──
        yield return FadeAndSlide(_titleGroup, _titleTmp.rectTransform,
            new Vector2(0f, 30f), new Vector2(0f, 50f), titleFadeIn);
        if (_skipped) { SkipToEnd(); yield break; }

        // ── 3. Line fade in ──
        yield return FadeGroup(_lineGroup, 0f, 1f, 0.2f);

        // ── 4. Particles ──
        SpawnParticles(accent);

        // ── 5. Hold ──
        yield return WaitSkippable(titleHold);
        if (_skipped) { SkipToEnd(); yield break; }

        // ── 6. Subtitle fade in ──
        yield return FadeAndSlide(_subtitleGroup, _subtitleTmp.rectTransform,
            new Vector2(0f, -35f), new Vector2(0f, -20f), subtitleFadeIn);
        if (_skipped) { SkipToEnd(); yield break; }

        yield return WaitSkippable(subtitleHold);

        // ── 7. Fade out semua ──
        yield return FadeOutAll(fadeOut);

        // ── 8. Letterbox slide out ──
        yield return AnimateBars(1f, 0f, letterboxSlideIn);

        Finish();
    }

    void SkipToEnd()
    {
        if (_canvas != null) Destroy(_canvas.gameObject);
        Finish();
    }

    void Finish()
    {
        // Notify FSM bahwa cinematic selesai
        LifetopiaLevelGameplayFsm.Instance?.FinishCinematicIntro();
        Destroy(this); // komponen tidak dibutuhkan lagi
    }

    // ── Particles ─────────────────────────────────────────────────────────────

    void SpawnParticles(Color color)
    {
        if (_canvas == null) return;

        for (int i = 0; i < particleCount; i++)
        {
            GameObject p = new GameObject("Particle_" + i);
            p.transform.SetParent(_canvas.transform, false);

            Image img = p.AddComponent<Image>();
            img.color = new Color(color.r, color.g, color.b,
                UnityEngine.Random.Range(0.4f, 0.9f));

            float size = UnityEngine.Random.Range(3f, 10f);
            RectTransform rt = p.GetComponent<RectTransform>();
            rt.sizeDelta = new Vector2(size, size);
            rt.anchorMin = rt.anchorMax = new Vector2(
                UnityEngine.Random.Range(0.05f, 0.95f),
                UnityEngine.Random.Range(0.2f,  0.8f));
            rt.anchoredPosition = Vector2.zero;

            StartCoroutine(AnimateParticle(rt, img, color));
        }
    }

    IEnumerator AnimateParticle(RectTransform rt, Image img, Color baseColor)
    {
        float life    = UnityEngine.Random.Range(particleLifetime * 0.5f, particleLifetime);
        float speedY  = UnityEngine.Random.Range(particleSpeed * 0.3f, particleSpeed);
        float speedX  = UnityEngine.Random.Range(-20f, 20f);
        float elapsed = 0f;
        Vector2 startPos = rt.anchoredPosition;

        while (elapsed < life)
        {
            elapsed += Time.deltaTime;
            float t = elapsed / life;
            rt.anchoredPosition = startPos + new Vector2(speedX * elapsed, speedY * elapsed);
            Color c = img.color;
            c.a = Mathf.Lerp(baseColor.a * 0.9f, 0f, t);
            img.color = c;
            yield return null;
        }

        if (rt != null) Destroy(rt.gameObject);
    }

    // ── Animation Helpers ─────────────────────────────────────────────────────

    IEnumerator AnimateBars(float from, float to, float dur)
    {
        float t = 0f;
        float topTarget = Mathf.Lerp(140f, 0f, to);
        float botTarget = Mathf.Lerp(-140f, 0f, to);
        float topStart  = _topBar.anchoredPosition.y;
        float botStart  = _botBar.anchoredPosition.y;

        while (t < dur)
        {
            t += Time.deltaTime;
            float p = Mathf.Clamp01(t / dur);
            float e = 1f - Mathf.Pow(1f - p, 3f); // cubic ease out
            _topBar.anchoredPosition = new Vector2(0f, Mathf.Lerp(topStart, topTarget, e));
            _botBar.anchoredPosition = new Vector2(0f, Mathf.Lerp(botStart, botTarget, e));
            yield return null;
        }
        _topBar.anchoredPosition = new Vector2(0f, topTarget);
        _botBar.anchoredPosition = new Vector2(0f, botTarget);
    }

    IEnumerator FadeGroup(CanvasGroup cg, float from, float to, float dur)
    {
        if (cg == null) yield break;
        float t = 0f;
        cg.alpha = from;
        while (t < dur)
        {
            t += Time.deltaTime;
            cg.alpha = Mathf.Lerp(from, to, Mathf.Clamp01(t / dur));
            yield return null;
        }
        cg.alpha = to;
    }

    IEnumerator FadeAndSlide(CanvasGroup cg, RectTransform rt,
        Vector2 startPos, Vector2 endPos, float dur)
    {
        if (cg == null) yield break;
        float t = 0f;
        cg.alpha = 0f;
        rt.anchoredPosition = startPos;
        while (t < dur)
        {
            t += Time.deltaTime;
            float p = Mathf.Clamp01(t / dur);
            float e = 1f - Mathf.Pow(1f - p, 2f); // quad ease out
            cg.alpha = e;
            rt.anchoredPosition = Vector2.Lerp(startPos, endPos, e);
            yield return null;
        }
        cg.alpha = 1f;
        rt.anchoredPosition = endPos;
    }

    IEnumerator FadeOutAll(float dur)
    {
        float t = 0f;
        float startTitle = _titleGroup    != null ? _titleGroup.alpha    : 0f;
        float startSub   = _subtitleGroup != null ? _subtitleGroup.alpha : 0f;
        float startLine  = _lineGroup     != null ? _lineGroup.alpha     : 0f;

        while (t < dur)
        {
            t += Time.deltaTime;
            float p = Mathf.Clamp01(t / dur);
            if (_titleGroup    != null) _titleGroup.alpha    = Mathf.Lerp(startTitle, 0f, p);
            if (_subtitleGroup != null) _subtitleGroup.alpha = Mathf.Lerp(startSub,   0f, p);
            if (_lineGroup     != null) _lineGroup.alpha     = Mathf.Lerp(startLine,  0f, p);
            yield return null;
        }
    }

    IEnumerator WaitSkippable(float dur)
    {
        float t = 0f;
        while (t < dur)
        {
            if (allowSkip && (UnityEngine.Input.GetKeyDown(KeyCode.Space) ||
                              UnityEngine.Input.GetKeyDown(KeyCode.Return) ||
                              UnityEngine.Input.GetKeyDown(KeyCode.Escape)))
            {
                _skipped = true;
                yield break;
            }
            t += Time.deltaTime;
            yield return null;
        }
    }

    // ── Data Lookup ───────────────────────────────────────────────────────────

    BiomeTitleData GetData(LifetopiaPlayableLevel.WorldBiomeKind biome)
    {
        foreach (var d in biomeTitles)
            if (d.biome == biome) return d;

        // Fallback
        return new BiomeTitleData
        {
            title    = biome.ToString().ToUpper(),
            subtitle = "Welcome to the world of Lifetopia."
        };
    }
}
