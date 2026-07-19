using UnityEngine;

/// <summary>
/// Editor helper — auto-configures a Character GameObject with all required components.
/// Right-click a GameObject in the Hierarchy → "Setup 2D Character" (via context menu).
/// Or call SetupCharacter() from code.
/// </summary>
public class CharacterSetupHelper : MonoBehaviour
{
    [Header("Auto-Setup on Awake")]
    public bool autoSetupOnAwake = true;

    [Header("Physics")]
    public float gravityScale = 3f;
    public PhysicsMaterial2D frictionlessMaterial;

    void Awake()
    {
        if (autoSetupOnAwake)
            SetupCharacter();
    }

    [ContextMenu("Setup 2D Character")]
    public void SetupCharacter()
    {
        // ── Rigidbody2D ──
        Rigidbody2D rb = GetComponent<Rigidbody2D>();
        if (rb == null) rb = gameObject.AddComponent<Rigidbody2D>();
        rb.gravityScale = gravityScale;
        rb.freezeRotation = true;
        rb.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
        if (frictionlessMaterial != null) rb.sharedMaterial = frictionlessMaterial;

        // ── Collider ──
        CapsuleCollider2D col = GetComponent<CapsuleCollider2D>();
        if (col == null) col = gameObject.AddComponent<CapsuleCollider2D>();
        col.size = new Vector2(0.5f, 1f);
        col.offset = new Vector2(0f, 0f);

        // ── SpriteRenderer ──
        SpriteRenderer sr = GetComponent<SpriteRenderer>();
        if (sr == null) sr = gameObject.AddComponent<SpriteRenderer>();
        sr.sortingLayerName = "Characters";

        // ── CharacterAnimator ──
        CharacterAnimator anim = GetComponent<CharacterAnimator>();
        if (anim == null) anim = gameObject.AddComponent<CharacterAnimator>();

        // ── CharacterController2D ──
        CharacterController2D ctrl = GetComponent<CharacterController2D>();
        if (ctrl == null) ctrl = gameObject.AddComponent<CharacterController2D>();

        // ── Ground Check child ──
        Transform groundCheck = transform.Find("GroundCheck");
        if (groundCheck == null)
        {
            GameObject gcGO = new GameObject("GroundCheck");
            gcGO.transform.SetParent(transform);
            gcGO.transform.localPosition = new Vector3(0f, -0.55f, 0f);
            groundCheck = gcGO.transform;
        }
        ctrl.groundCheck = groundCheck;

        UnityEngine.Debug.Log($"[CharacterSetupHelper] '{gameObject.name}' configured as 2D character.");
    }
}
