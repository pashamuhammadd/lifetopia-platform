using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro;

/// <summary>
/// Cinematic Intro Sequence:
/// Black → Logo bounce in → Hold → Logo fade out → Cinematic map reveal (zoom + pan) → Game starts
/// </summary>
public class GameIntro : MonoBehaviour
{
    [Header("Scene to Load After Intro")]
    public string nextSceneName = "choose map";

    [Header("── UI References ──")]
    public CanvasGroup blackOverlay;        // Full-screen black panel
    public RectTransform logoRect;          // Logo transform
    public CanvasGroup logoGroup;           // Logo alpha
    public CanvasGroup taglineGroup;        // Tagline (opsional)
    public TextMeshProUGUI taglineText;

    [Header("── Map Cinematic References ──")]
    [Tooltip("GameObject yang berisi gambar peta (Image atau RawImage)")]
    public RectTransform mapRect;           // Map image RectTransform
    public CanvasGroup mapGroup;            // Map CanvasGroup untuk fade in
    [Tooltip("Vignette/overlay gelap di tepi layar saat sinematik (opsional)")]
    public CanvasGroup vignetteGroup;

    [Header("── Logo Timing ──")]
    public float initialBlackDuration  = 0.4f;
    public float logoFadeInDuration    = 0.7f;
    public float logoScaleDuration     = 0.55f;
    public float logoHoldDuration      = 1.8f;
    public float logoFadeOutDuration   = 0.5f;

    [Header("── Logo Animation ──")]
    public float logoStartScale = 0.2f;
    public float logoEndScale   = 1.0f;

    [Header("── Map Cinematic Timing ──")]
    public float mapFadeInDuration     = 1.0f;   // map fade dari hitam
    public float mapZoomDuration       = 3.5f;   // durasi zoom + pan
    public float mapHoldAfterZoom      = 0.6f;   // tahan setelah zoom selesai
    public float finalFadeOutDuration  = 0.5f;   // fade hitam sebelum load scene

    [Header("── Map Cinematic Animation ──")]
    [Tooltip("Scale awal peta (zoom in dari besar ke normal, atau kecil ke besar)")]
    public float mapStartScale  = 1.4f;          // mulai zoom in (lebih besar)
    public float mapEndScale    = 1.0f;          // akhir normal
    [Tooltip("Posisi awal pan peta (offset dari center)")]
    public Vector2 mapStartOffset = new Vector2(-120f, 80f);
    [Tooltip("Posisi akhir pan peta (biasanya center = 0,0)")]
    public Vector2 mapEndOffset   = new Vector2(0f, 0f);

    [Header("── Skip ──")]
    public bool allowSkip = true;

    // ── Runtime ──────────────────────────────────────────────────────────────
    private bool _skipped = false;

    // ─────────────────────────────────────────────────────────────────────────

    void Start()
    {
        // Reset semua ke state awal
        SetAlpha(blackOverlay, 1f);
        SetAlpha(logoGroup, 0f);
        SetAlpha(taglineGroup, 0f);
        SetAlpha(mapGroup, 0f);
        SetAlpha(vignetteGroup, 0f);

        if (logoRect)  logoRect.localScale  = Vector3.one * logoStartScale;
        if (mapRect)
        {
            mapRect.localScale        = Vector3.one * mapStartScale;
            mapRect.anchoredPosition  = mapStartOffset;
        }

        StartCoroutine(PlayIntroSequence());
    }

    void Update()
    {
        if (allowSkip && !_skipped && UnityEngine.Input.GetKeyDown(KeyCode.Escape))
        {
            _skipped = true;
            StopAllCoroutines();
            StartCoroutine(QuickFadeAndLoad());
        }
    }

    // ── Main Sequence ─────────────────────────────────────────────────────────

    private IEnumerator PlayIntroSequence()
    {
        // 1. Tahan hitam sebentar
        yield return new WaitForSeconds(initialBlackDuration);

        // 2. Fade out black → reveal background (hitam polos)
        yield return Fade(blackOverlay, 1f, 0f, 0.4f);

        // 3. Logo bounce masuk
        yield return LogoBounceIn();

        // 4. Tagline fade in (opsional)
        if (taglineGroup != null)
            yield return Fade(taglineGroup, 0f, 1f, 0.5f);

        // 5. Tahan logo
        yield return new WaitForSeconds(logoHoldDuration);

        // 6. Logo + tagline fade OUT bersamaan
        StartCoroutine(Fade(taglineGroup, 1f, 0f, logoFadeOutDuration));
        yield return Fade(logoGroup, 1f, 0f, logoFadeOutDuration);

        // 7. Fade hitam masuk sebentar (transisi ke map)
        yield return Fade(blackOverlay, 0f, 1f, 0.3f);

        // 8. Siapkan map di belakang, lalu fade hitam keluar → reveal map
        if (mapGroup != null)
        {
            SetAlpha(mapGroup, 1f);  // map sudah ada, hitam yang nutup
        }

        // Vignette muncul bersamaan
        if (vignetteGroup != null)
            StartCoroutine(Fade(vignetteGroup, 0f, 0.6f, mapFadeInDuration));

        // Fade hitam keluar → map terlihat
        yield return Fade(blackOverlay, 1f, 0f, mapFadeInDuration);

        // 9. Sinematik zoom + pan peta
        yield return CinematicMapReveal();

        // 10. Tahan sebentar
        yield return new WaitForSeconds(mapHoldAfterZoom);

        // 11. Vignette fade out
        if (vignetteGroup != null)
            StartCoroutine(Fade(vignetteGroup, 0.6f, 0f, 0.4f));

        // 12. Fade hitam → load scene
        yield return Fade(blackOverlay, 0f, 1f, finalFadeOutDuration);

        LoadNextScene();
    }

    // ── Logo Bounce In ────────────────────────────────────────────────────────

    private IEnumerator LogoBounceIn()
    {
        float timer = 0f;
        float duration = Mathf.Max(logoFadeInDuration, logoScaleDuration);

        while (timer < duration)
        {
            if (_skipped) yield break;
            timer += Time.deltaTime;

            if (logoGroup)
                logoGroup.alpha = Mathf.Clamp01(timer / logoFadeInDuration);

            if (logoRect)
            {
                float t = BounceEaseOut(Mathf.Clamp01(timer / logoScaleDuration));
                logoRect.localScale = Vector3.one * Mathf.Lerp(logoStartScale, logoEndScale, t);
            }

            yield return null;
        }

        SetAlpha(logoGroup, 1f);
        if (logoRect) logoRect.localScale = Vector3.one * logoEndScale;
    }

    // ── Cinematic Map Reveal ──────────────────────────────────────────────────

    private IEnumerator CinematicMapReveal()
    {
        if (mapRect == null) yield break;

        float timer = 0f;

        while (timer < mapZoomDuration)
        {
            if (_skipped)
            {
                // Langsung ke posisi akhir
                mapRect.localScale       = Vector3.one * mapEndScale;
                mapRect.anchoredPosition = mapEndOffset;
                yield break;
            }

            timer += Time.deltaTime;
            float t = Mathf.Clamp01(timer / mapZoomDuration);

            // Smooth ease out untuk zoom dan pan
            float eased = SmoothEaseOut(t);

            mapRect.localScale       = Vector3.one * Mathf.Lerp(mapStartScale, mapEndScale, eased);
            mapRect.anchoredPosition = Vector2.Lerp(mapStartOffset, mapEndOffset, eased);

            yield return null;
        }

        mapRect.localScale       = Vector3.one * mapEndScale;
        mapRect.anchoredPosition = mapEndOffset;
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private IEnumerator Fade(CanvasGroup cg, float from, float to, float duration)
    {
        if (cg == null) yield break;
        float timer = 0f;
        cg.alpha = from;
        while (timer < duration)
        {
            timer += Time.deltaTime;
            cg.alpha = Mathf.Lerp(from, to, timer / duration);
            yield return null;
        }
        cg.alpha = to;
    }

    private IEnumerator QuickFadeAndLoad()
    {
        yield return Fade(blackOverlay, blackOverlay != null ? blackOverlay.alpha : 0f, 1f, 0.3f);
        LoadNextScene();
    }

    private void SetAlpha(CanvasGroup cg, float alpha)
    {
        if (cg != null) cg.alpha = alpha;
    }

    private void LoadNextScene()
    {
        if (!string.IsNullOrEmpty(nextSceneName))
            SceneManager.LoadScene(nextSceneName);
    }

    // Bounce ease — untuk logo
    private float BounceEaseOut(float t)
    {
        if (t < 1f / 2.75f)
            return 7.5625f * t * t;
        else if (t < 2f / 2.75f)
        { t -= 1.5f / 2.75f;  return 7.5625f * t * t + 0.75f; }
        else if (t < 2.5f / 2.75f)
        { t -= 2.25f / 2.75f; return 7.5625f * t * t + 0.9375f; }
        else
        { t -= 2.625f / 2.75f; return 7.5625f * t * t + 0.984375f; }
    }

    // Smooth ease out — untuk zoom/pan peta (lebih sinematik)
    private float SmoothEaseOut(float t)
    {
        return 1f - Mathf.Pow(1f - t, 3f); // cubic ease out
    }
}
