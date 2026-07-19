using UnityEngine;

/// <summary>
/// 2D Character Controller with WASD movement and full action support.
/// Requires: Rigidbody2D, Collider2D, CharacterAnimator on same GameObject.
/// </summary>
[RequireComponent(typeof(Rigidbody2D))]
[RequireComponent(typeof(CharacterAnimator))]
public class CharacterController2D : MonoBehaviour
{
    // ── Movement Settings ─────────────────────────────────────────────────────
    [Header("Movement")]
    public float walkSpeed = 6f;
    public float runSpeed = 10f;
    public float boostSpeed = 14f;
    public float jumpForce = 7f;
    public float crawlSpeed = 3f;

    [Header("Ground Check")]
    public Transform groundCheck;
    public float groundCheckRadius = 0.15f;
    public LayerMask groundLayer;

    [Header("Boost")]
    [Tooltip("Hold Shift to run, double-tap Shift or press B to boost")]
    public float boostDuration = 2f;
    public float boostCooldown = 5f;

    // ── Key Bindings ──────────────────────────────────────────────────────────
    [Header("Key Bindings")]
    public KeyCode keyLeft    = KeyCode.A;
    public KeyCode keyRight   = KeyCode.D;
    public KeyCode keyUp      = KeyCode.W;   // also jump when grounded
    public KeyCode keyDown    = KeyCode.S;   // sit / crawl
    public KeyCode keyRun     = KeyCode.LeftShift;
    public KeyCode keyBoost   = KeyCode.B;
    public KeyCode keyJump    = KeyCode.Space;
    public KeyCode keyPickUp  = KeyCode.F;
    public KeyCode keyThrow   = KeyCode.G;
    public KeyCode keyCatch   = KeyCode.H;
    public KeyCode keyWork    = KeyCode.E;
    public KeyCode keyFish    = KeyCode.R;
    public KeyCode keyHappy   = KeyCode.Y;
    public KeyCode keyTipHat  = KeyCode.T;
    public KeyCode keyCrawl   = KeyCode.C;
    public KeyCode keyBend    = KeyCode.X;

    // ── Runtime ───────────────────────────────────────────────────────────────
    private Rigidbody2D _rb;
    private CharacterAnimator _anim;

    private bool _isGrounded;
    private bool _isCrawling;
    private bool _isSitting;
    private bool _isBoosting;
    private bool _isDoingAction;   // blocks movement during one-shot actions

    private float _boostTimer = 0f;
    private float _boostCooldownTimer = 0f;
    private float _moveInput = 0f;

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    void Awake()
    {
        _rb = GetComponent<Rigidbody2D>();
        _anim = GetComponent<CharacterAnimator>();

        _rb.freezeRotation = true;
        _rb.gravityScale = 2.5f;
    }

    void Update()
    {
        CheckGround();
        HandleBoostTimer();
        HandleInput();
    }

    void FixedUpdate()
    {
        ApplyMovement();
    }

    // ── Ground Check ──────────────────────────────────────────────────────────

    private void CheckGround()
    {
        if (groundCheck != null)
        {
            _isGrounded = Physics2D.OverlapCircle(
                groundCheck.position, groundCheckRadius, groundLayer);
        }
        else
        {
            // Fallback: raycast downward from center
            _isGrounded = Physics2D.Raycast(
                transform.position, Vector2.down, 0.6f, groundLayer);
        }
    }

    // ── Input Handling ────────────────────────────────────────────────────────

    private void HandleInput()
    {
        // One-shot actions block movement
        if (_isDoingAction) return;

        // ── Horizontal movement ──
        _moveInput = 0f;
        if (Input.GetKey(keyLeft))  _moveInput = -1f;
        if (Input.GetKey(keyRight)) _moveInput =  1f;

        // ── Flip sprite ──
        if (_moveInput != 0f)
            _anim.SetFacingRight(_moveInput > 0f);

        // ── Crawl (C) ──
        if (UnityEngine.Input.GetKeyDown(keyCrawl))
        {
            _isCrawling = !_isCrawling;
            _isSitting = false;
        }

        // ── Sit / Crouch (S when still) ──
        if (UnityEngine.Input.GetKeyDown(keyDown) && Mathf.Abs(_moveInput) < 0.01f && _isGrounded)
        {
            _isSitting = !_isSitting;
            _isCrawling = false;
        }

        // ── Jump (Space or W) ──
        if ((UnityEngine.Input.GetKeyDown(keyJump) || UnityEngine.Input.GetKeyDown(keyUp)) && _isGrounded && !_isSitting && !_isCrawling)
        {
            _rb.velocity = new Vector2(_rb.velocity.x, jumpForce);
            _anim.SetState(CharacterAnimator.CharacterState.Jump);
        }

        // ── Boost (B) ──
        if (UnityEngine.Input.GetKeyDown(keyBoost) && _boostCooldownTimer <= 0f)
        {
            _isBoosting = true;
            _boostTimer = boostDuration;
            _boostCooldownTimer = boostCooldown;
        }

        // ── One-shot actions ──
        if (UnityEngine.Input.GetKeyDown(keyPickUp))  TriggerAction(CharacterAnimator.CharacterState.PickUp);
        if (UnityEngine.Input.GetKeyDown(keyThrow))   TriggerAction(CharacterAnimator.CharacterState.Throw);
        if (UnityEngine.Input.GetKeyDown(keyCatch))   TriggerAction(CharacterAnimator.CharacterState.Catch);
        if (UnityEngine.Input.GetKeyDown(keyWork))    TriggerAction(CharacterAnimator.CharacterState.Work);
        if (UnityEngine.Input.GetKeyDown(keyFish))    TriggerAction(CharacterAnimator.CharacterState.Fish);
        if (UnityEngine.Input.GetKeyDown(keyHappy))   TriggerAction(CharacterAnimator.CharacterState.Happy);
        if (UnityEngine.Input.GetKeyDown(keyTipHat))  TriggerAction(CharacterAnimator.CharacterState.TipHat);
        if (UnityEngine.Input.GetKeyDown(keyBend))    TriggerAction(CharacterAnimator.CharacterState.Bend);

        // ── Update animation state ──
        UpdateAnimationState();
    }

    private void UpdateAnimationState()
    {
        if (_isDoingAction) return;

        bool isMoving = Mathf.Abs(_moveInput) > 0.01f;

        if (!_isGrounded)
        {
            _anim.SetState(CharacterAnimator.CharacterState.Jump);
        }
        else if (_isCrawling)
        {
            _anim.SetState(CharacterAnimator.CharacterState.Crawl);
        }
        else if (_isSitting)
        {
            _anim.SetState(CharacterAnimator.CharacterState.Sit);
        }
        else if (isMoving)
        {
            if (_isBoosting)
                _anim.SetState(CharacterAnimator.CharacterState.Boost);
            else if (Input.GetKey(keyRun))
                _anim.SetState(CharacterAnimator.CharacterState.Run);
            else
                _anim.SetState(CharacterAnimator.CharacterState.Walk);
        }
        else
        {
            _anim.SetState(CharacterAnimator.CharacterState.Idle);
        }
    }

    // ── Movement Application ──────────────────────────────────────────────────

    private void ApplyMovement()
    {
        if (_isDoingAction || _isSitting) return;

        float speed;
        if (_isBoosting)
            speed = boostSpeed;
        else if (Input.GetKey(keyRun))
            speed = runSpeed;
        else if (_isCrawling)
            speed = crawlSpeed;
        else
            speed = walkSpeed;

        _rb.velocity = new Vector2(_moveInput * speed, _rb.velocity.y);
    }

    // ── Boost Timer ───────────────────────────────────────────────────────────

    private void HandleBoostTimer()
    {
        if (_isBoosting)
        {
            _boostTimer -= Time.deltaTime;
            if (_boostTimer <= 0f)
                _isBoosting = false;
        }

        if (_boostCooldownTimer > 0f)
            _boostCooldownTimer -= Time.deltaTime;
    }

    // ── Action Trigger ────────────────────────────────────────────────────────

    /// <summary>
    /// Triggers a one-shot action animation.
    /// Movement is blocked until the animation completes.
    /// </summary>
    public void TriggerAction(CharacterAnimator.CharacterState actionState)
    {
        _isDoingAction = true;
        _rb.velocity = new Vector2(0f, _rb.velocity.y); // stop horizontal

        _anim.PlayOnce(actionState);
        _anim.OnAnimationComplete = (s) =>
        {
            _isDoingAction = false;
            _anim.OnAnimationComplete = null;
        };
    }

    // ── Public Helpers ────────────────────────────────────────────────────────

    /// <summary>Force character to walk to a world X position (for cutscenes).</summary>
    public void WalkTo(float targetX, System.Action onArrived = null)
    {
        StartCoroutine(WalkToRoutine(targetX, onArrived));
    }

    private System.Collections.IEnumerator WalkToRoutine(float targetX, System.Action onArrived)
    {
        _anim.SetState(CharacterAnimator.CharacterState.Walk);
        float dir = Mathf.Sign(targetX - transform.position.x);
        _anim.SetFacingRight(dir > 0f);

        while (Mathf.Abs(transform.position.x - targetX) > 0.1f)
        {
            _rb.velocity = new Vector2(dir * walkSpeed, _rb.velocity.y);
            yield return null;
        }

        _rb.velocity = new Vector2(0f, _rb.velocity.y);
        _anim.SetState(CharacterAnimator.CharacterState.Idle);
        onArrived?.Invoke();
    }

    // ── Gizmos ────────────────────────────────────────────────────────────────

    void OnDrawGizmosSelected()
    {
        if (groundCheck != null)
        {
            Gizmos.color = Color.green;
            Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
        }
    }
}
