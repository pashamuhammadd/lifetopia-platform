using UnityEngine;

/// <summary>
/// Attach ke GameObject player di scene.
/// Auto-setup semua komponen physics + controller yang dibutuhkan.
/// Tidak spawn karakter baru — bekerja dengan sprite/visual yang sudah ada.
/// </summary>
[DisallowMultipleComponent]
public class PlayerSetup : MonoBehaviour
{
    [Header("Movement")]
    public float walkSpeed  = 3.2f;
    public float runSpeed   = 5.5f;
    public float boostSpeed = 8f;
    public float jumpForce  = 9f;

    [Header("Collider")]
    public Vector2 colliderSize   = new Vector2(0.5f, 1f);
    public Vector2 colliderOffset = new Vector2(0f, 0f);

    [Header("Ground Check")]
    [Tooltip("Posisi GroundCheck relatif ke pivot karakter.")]
    public Vector3 groundCheckOffset = new Vector3(0f, -0.55f, 0f);
    public float   groundCheckRadius = 0.15f;

    void Awake()
    {
        SetupAll();
    }

    [ContextMenu("Setup Player Now")]
    public void SetupAll()
    {
        gameObject.tag = "Player";

        // ── Rigidbody2D ──────────────────────────────────────────────────────
        Rigidbody2D rb = GetComponent<Rigidbody2D>();
        if (rb == null) rb = gameObject.AddComponent<Rigidbody2D>();
        rb.gravityScale            = 0f;
        rb.freezeRotation          = true;
        rb.collisionDetectionMode  = CollisionDetectionMode2D.Continuous;

        // ── Collider ─────────────────────────────────────────────────────────
        CapsuleCollider2D col = GetComponent<CapsuleCollider2D>();
        if (col == null) col = gameObject.AddComponent<CapsuleCollider2D>();
        col.size   = colliderSize;
        col.offset = colliderOffset;

        // ── GroundCheck child ─────────────────────────────────────────────────
        Transform gc = transform.Find("GroundCheck");
        if (gc == null)
        {
            gc = new GameObject("GroundCheck").transform;
            gc.SetParent(transform);
        }
        gc.localPosition = groundCheckOffset;

        // ── CharacterAnimator ─────────────────────────────────────────────────
        CharacterAnimator anim = GetComponent<CharacterAnimator>();
        if (anim == null) anim = gameObject.AddComponent<CharacterAnimator>();

        // ── CharacterController2D ─────────────────────────────────────────────
        CharacterController2D ctrl = GetComponent<CharacterController2D>();
        if (ctrl == null) ctrl = gameObject.AddComponent<CharacterController2D>();

        ctrl.groundCheck  = gc;
        ctrl.walkSpeed    = walkSpeed;
        ctrl.runSpeed     = runSpeed;
        ctrl.boostSpeed   = boostSpeed;
        ctrl.jumpForce    = jumpForce;
        ctrl.groundCheckRadius = groundCheckRadius;

        // Ground layer — pakai "Ground" kalau ada, fallback "Default"
        int groundIdx = LayerMask.NameToLayer("Ground");
        ctrl.groundLayer = groundIdx >= 0
            ? LayerMask.GetMask("Ground")
            : LayerMask.GetMask("Default");

        // ── PlayerFarmInteractor ──────────────────────────────────────────────
        if (GetComponent<PlayerFarmInteractor>() == null)
            gameObject.AddComponent<PlayerFarmInteractor>();

        UnityEngine.Debug.Log($"[PlayerSetup] '{gameObject.name}' siap — WASD aktif.");
    }
}
