using System.Collections.Generic;
using System.IO;
using UnityEngine;

/// <summary>
/// Cycles character visual variants from Assets/image/characters by pressing Tab.
/// This keeps movement/controls intact and only swaps displayed sprites.
/// </summary>
[RequireComponent(typeof(CharacterAnimator))]
public class CharacterVariantSwitcher : MonoBehaviour
{
    [Header("Input")]
    public KeyCode switchKey = KeyCode.Tab;

    [Header("Character Folder (relative to project root)")]
    public string characterFolder = "Assets/image/characters";

    private CharacterAnimator _animator;
    private readonly List<Sprite> _variants = new List<Sprite>();
    private int _currentVariantIndex;

    void Awake()
    {
        _animator = GetComponent<CharacterAnimator>();
        LoadVariantsFromFolder();
        ApplyCurrentVariant();
    }

    void Update()
    {
        if (_variants.Count <= 1) return;

        if (UnityEngine.Input.GetKeyDown(switchKey))
        {
            _currentVariantIndex = (_currentVariantIndex + 1) % _variants.Count;
            ApplyCurrentVariant();
        }
    }

    private void LoadVariantsFromFolder()
    {
        _variants.Clear();

        string projectRoot = Directory.GetParent(Application.dataPath)?.FullName ?? Application.dataPath;
        string absoluteFolder = Path.Combine(projectRoot, characterFolder.Replace('/', Path.DirectorySeparatorChar));

        if (!Directory.Exists(absoluteFolder))
        {
            UnityEngine.Debug.LogWarning($"[CharacterVariantSwitcher] Folder not found: {absoluteFolder}");
            return;
        }

        string[] files = Directory.GetFiles(absoluteFolder, "*.png", SearchOption.TopDirectoryOnly);
        System.Array.Sort(files);

        foreach (string file in files)
        {
            Sprite loaded = LoadSpriteFromDisk(file, 64f);
            if (loaded != null) _variants.Add(loaded);
        }

        if (_variants.Count == 0)
            UnityEngine.Debug.LogWarning("[CharacterVariantSwitcher] No character variants loaded.");
    }

    private void ApplyCurrentVariant()
    {
        if (_variants.Count == 0 || _animator == null) return;

        Sprite current = _variants[_currentVariantIndex];
        Sprite[] one = { current };

        // Keep animation system alive while applying selected variant across major states.
        _animator.idleFrames = one;
        _animator.walkFrames = one;
        _animator.runFrames = one;
        _animator.jumpFrames = one;
        _animator.sitFrames = one;
        _animator.bendFrames = one;
        _animator.crawlFrames = one;
        _animator.pickUpFrames = one;
        _animator.throwFrames = one;
        _animator.catchFrames = one;
        _animator.standUpFrames = one;
        _animator.tipHatFrames = one;
        _animator.liftLegFrames = one;
        _animator.liftStepFrames = one;
        _animator.workFrames = one;
        _animator.fishFrames = one;
        _animator.happyFrames = one;
        _animator.boostFrames = one;

        _animator.SetState(CharacterAnimator.CharacterState.Idle, true);
    }

    private Sprite LoadSpriteFromDisk(string absolutePath, float pixelsPerUnit)
    {
        if (!File.Exists(absolutePath)) return null;

        byte[] bytes = File.ReadAllBytes(absolutePath);
        if (bytes == null || bytes.Length == 0) return null;

        Texture2D tex = new Texture2D(2, 2, TextureFormat.RGBA32, false);
        tex.filterMode = FilterMode.Point;
        tex.wrapMode = TextureWrapMode.Clamp;
        if (!tex.LoadImage(bytes)) return null;

        Rect rect = new Rect(0, 0, tex.width, tex.height);
        Vector2 pivot = new Vector2(0.5f, 0.0f);
        return Sprite.Create(tex, rect, pivot, pixelsPerUnit);
    }
}
