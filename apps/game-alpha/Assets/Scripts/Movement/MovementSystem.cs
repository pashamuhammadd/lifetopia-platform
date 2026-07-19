using UnityEngine;

namespace Lifetopia.Movement
{
    /// <summary>
    /// Reusable movement system — bisa dipakai player maupun NPC.
    /// Decoupled dari input — caller yang set velocity.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    public class MovementSystem : MonoBehaviour
    {
        [Header("Speeds")]
        public float walkSpeed   = 3.2f;
        public float runSpeed    = 5.5f;
        public float crawlSpeed  = 1.5f;
        public float jumpForce   = 9f;
        public float gravityScale= 3f;

        [Header("Ground")]
        public Transform groundCheck;
        public float     groundCheckRadius = 0.15f;
        public LayerMask groundLayer;

        public bool  IsGrounded  { get; private set; }
        public bool  IsMoving    => Mathf.Abs(_rb.velocity.x) > 0.1f;
        public float CurrentSpeed=> Mathf.Abs(_rb.velocity.x);
        public Vector2 Velocity  => _rb.velocity;

        Rigidbody2D _rb;

        void Awake()
        {
            _rb = GetComponent<Rigidbody2D>();
            _rb.gravityScale   = gravityScale;
            _rb.freezeRotation = true;
        }

        void FixedUpdate() => CheckGround();

        void CheckGround()
        {
            if (groundCheck != null)
                IsGrounded = Physics2D.OverlapCircle(
                    groundCheck.position, groundCheckRadius, groundLayer);
            else
                IsGrounded = Physics2D.Raycast(
                    transform.position, Vector2.down, 0.6f, groundLayer);
        }

        // ── API ───────────────────────────────────────────────────────────────

        public void Move(float dirX, bool running = false, bool crawling = false)
        {
            float speed = crawling ? crawlSpeed : running ? runSpeed : walkSpeed;
            _rb.velocity = new Vector2(dirX * speed, _rb.velocity.y);
        }

        public bool Jump()
        {
            if (!IsGrounded) return false;
            _rb.velocity = new Vector2(_rb.velocity.x, jumpForce);
            return true;
        }

        public void Stop() =>
            _rb.velocity = new Vector2(0f, _rb.velocity.y);

        public void Teleport(Vector3 position)
        {
            _rb.velocity = Vector2.zero;
            transform.position = position;
        }

        public void AddForce(Vector2 force, ForceMode2D mode = ForceMode2D.Impulse) =>
            _rb.AddForce(force, mode);

        public void SetGravity(float scale) =>
            _rb.gravityScale = scale;
    }
}
