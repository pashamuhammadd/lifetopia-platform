using UnityEngine;
using Lifetopia.Input.Handlers;
using Lifetopia.Events;

namespace Lifetopia.Controllers
{
    /// <summary>
    /// Player controller — baca dari InputHandler, apply ke Rigidbody2D.
    /// Attach ke GameObject player.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    public class PlayerController : MonoBehaviour
    {
        [Header("Movement")]
        public float walkSpeed  = 3.2f;
        public float runSpeed   = 5.5f;
        public float jumpForce  = 9f;
        public float gravityScale = 3f;

        [Header("Ground Check")]
        public Transform groundCheck;
        public float     groundCheckRadius = 0.15f;
        public LayerMask groundLayer;

        [Header("State")]
        public bool inputEnabled = true;

        Rigidbody2D _rb;
        SpriteRenderer _sr;
        bool _isGrounded;
        bool _isFacingRight = true;

        void Awake()
        {
            _rb = GetComponent<Rigidbody2D>();
            _sr = GetComponent<SpriteRenderer>();
            _rb.gravityScale   = gravityScale;
            _rb.freezeRotation = true;
        }

        void Update()
        {
            CheckGround();
            if (!inputEnabled) return;
            HandleJump();
        }

        void FixedUpdate()
        {
            if (!inputEnabled) return;
            HandleMovement();
        }

        void CheckGround()
        {
            if (groundCheck != null)
                _isGrounded = Physics2D.OverlapCircle(
                    groundCheck.position, groundCheckRadius, groundLayer);
            else
                _isGrounded = Physics2D.Raycast(
                    transform.position, Vector2.down, 0.6f, groundLayer);
        }

        void HandleMovement()
        {
            var input = InputHandler.Instance;
            if (input == null) return;

            float speed = input.RunHeld ? runSpeed : walkSpeed;
            float moveX = input.Movement.x;

            _rb.velocity = new Vector2(moveX * speed, _rb.velocity.y);

            // Flip sprite
            if (moveX > 0.01f && !_isFacingRight)  Flip(true);
            if (moveX < -0.01f && _isFacingRight)   Flip(false);
        }

        void HandleJump()
        {
            var input = InputHandler.Instance;
            if (input == null) return;

            if (input.JumpPressed && _isGrounded)
                _rb.velocity = new Vector2(_rb.velocity.x, jumpForce);
        }

        void Flip(bool faceRight)
        {
            _isFacingRight = faceRight;
            if (_sr != null) _sr.flipX = !faceRight;
        }

        public void SetInputEnabled(bool enabled) => inputEnabled = enabled;
        public bool IsGrounded => _isGrounded;
        public bool IsFacingRight => _isFacingRight;
    }
}
