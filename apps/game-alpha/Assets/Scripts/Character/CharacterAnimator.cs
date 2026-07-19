using UnityEngine;

/// <summary>
/// Manages sprite-based 2D character animation states.
/// Works with SpriteRenderer and manually assigned sprite arrays per state.
/// </summary>
[RequireComponent(typeof(SpriteRenderer))]
public class CharacterAnimator : MonoBehaviour
{
    // ── Animation States ──────────────────────────────────────────────────────
    public enum CharacterState
    {
        Idle,
        Walk,
        Run,
        Jump,
        Sit,
        Bend,          // membungkuk
        Crawl,         // merayap
        PickUp,        // mengambil
        Throw,         // melempar
        Catch,         // menangkap
        StandUp,       // berdiri (dari duduk)
        TipHat,        // angkat topi
        LiftLeg,       // angkat kaki
        LiftStep,      // angkat melangkah
        Work,          // kerja (ayun kapak/sekop)
        Fish,          // memancing
        Happy,         // ekspresi senang
        Boost          // boost/sprint
    }

    [Header("Sprite Frames per State")]
    public Sprite[] idleFrames;
    public Sprite[] walkFrames;
    public Sprite[] runFrames;
    public Sprite[] jumpFrames;
    public Sprite[] sitFrames;
    public Sprite[] bendFrames;
    public Sprite[] crawlFrames;
    public Sprite[] pickUpFrames;
    public Sprite[] throwFrames;
    public Sprite[] catchFrames;
    public Sprite[] standUpFrames;
    public Sprite[] tipHatFrames;
    public Sprite[] liftLegFrames;
    public Sprite[] liftStepFrames;
    public Sprite[] workFrames;
    public Sprite[] fishFrames;
    public Sprite[] happyFrames;
    public Sprite[] boostFrames;

    [Header("Animation Settings")]
    [Tooltip("Frames per second for animation playback")]
    public float fps = 8f;

    [Tooltip("Loop the current animation")]
    public bool loop = true;

    // ── Runtime ───────────────────────────────────────────────────────────────
    private SpriteRenderer _sr;
    private CharacterState _currentState = CharacterState.Idle;
    private Sprite[] _currentFrames;
    private int _frameIndex = 0;
    private float _frameTimer = 0f;
    private bool _isPlaying = true;

    // Callback when a one-shot animation finishes
    public System.Action<CharacterState> OnAnimationComplete;

    void Awake()
    {
        _sr = GetComponent<SpriteRenderer>();
    }

    void Start()
    {
        SetState(CharacterState.Idle);
    }

    void Update()
    {
        if (!_isPlaying || _currentFrames == null || _currentFrames.Length == 0)
            return;

        _frameTimer += Time.deltaTime;

        if (_frameTimer >= 1f / fps)
        {
            _frameTimer = 0f;
            _frameIndex++;

            if (_frameIndex >= _currentFrames.Length)
            {
                if (loop)
                {
                    _frameIndex = 0;
                }
                else
                {
                    _frameIndex = _currentFrames.Length - 1;
                    _isPlaying = false;
                    OnAnimationComplete?.Invoke(_currentState);
                    return;
                }
            }

            _sr.sprite = _currentFrames[_frameIndex];
        }
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /// <summary>Sets the character animation state.</summary>
    public void SetState(CharacterState state, bool forceRestart = false)
    {
        if (_currentState == state && !forceRestart) return;

        _currentState = state;
        _currentFrames = GetFramesForState(state);
        _frameIndex = 0;
        _frameTimer = 0f;
        _isPlaying = true;

        // One-shot animations don't loop
        loop = IsLoopingState(state);

        if (_currentFrames != null && _currentFrames.Length > 0)
            _sr.sprite = _currentFrames[0];
    }

    /// <summary>Play a one-shot animation then return to idle.</summary>
    public void PlayOnce(CharacterState state)
    {
        loop = false;
        SetState(state, true);
        OnAnimationComplete = (s) =>
        {
            OnAnimationComplete = null;
            SetState(CharacterState.Idle);
        };
    }

    /// <summary>Flip sprite horizontally (for left/right movement).</summary>
    public void SetFacingRight(bool facingRight)
    {
        _sr.flipX = !facingRight;
    }

    public CharacterState CurrentState => _currentState;

    // ── Helpers ───────────────────────────────────────────────────────────────

    private Sprite[] GetFramesForState(CharacterState state)
    {
        return state switch
        {
            CharacterState.Idle      => idleFrames,
            CharacterState.Walk      => walkFrames,
            CharacterState.Run       => runFrames,
            CharacterState.Jump      => jumpFrames,
            CharacterState.Sit       => sitFrames,
            CharacterState.Bend      => bendFrames,
            CharacterState.Crawl     => crawlFrames,
            CharacterState.PickUp    => pickUpFrames,
            CharacterState.Throw     => throwFrames,
            CharacterState.Catch     => catchFrames,
            CharacterState.StandUp   => standUpFrames,
            CharacterState.TipHat    => tipHatFrames,
            CharacterState.LiftLeg   => liftLegFrames,
            CharacterState.LiftStep  => liftStepFrames,
            CharacterState.Work      => workFrames,
            CharacterState.Fish      => fishFrames,
            CharacterState.Happy     => happyFrames,
            CharacterState.Boost     => boostFrames,
            _                        => idleFrames
        };
    }

    private bool IsLoopingState(CharacterState state)
    {
        // These states loop continuously
        return state == CharacterState.Idle
            || state == CharacterState.Walk
            || state == CharacterState.Run
            || state == CharacterState.Crawl
            || state == CharacterState.Fish
            || state == CharacterState.Boost;
    }
}
