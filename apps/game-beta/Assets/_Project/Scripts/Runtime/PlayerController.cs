using UnityEngine;

namespace Lifetopia.Gameplay
{
    /// <summary>
    /// Kontrol karakter top-down 4 arah + trigger aksi tool. Fase 1 MVP:
    /// gerak WASD/arrow key, tekan 1/2/3 buat coba animasi Till/Axe/Water.
    ///
    /// Sengaja pakai Input Manager lama (Input.GetAxisRaw / GetKeyDown),
    /// BUKAN package Input System baru - supaya gak ada dependency package
    /// tambahan yang perlu diinstal dulu buat nge-tes Fase 1 ini. Nanti pas
    /// kita beneran butuh dukungan virtual joystick untuk Android (Fase 5),
    /// baru masuk akal pindah ke Input System. Cukup tempel prefab ini ke
    /// scene, gak perlu setup input action asset dulu.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    [RequireComponent(typeof(SpriteFrameAnimator))]
    public class PlayerController : MonoBehaviour
    {
        private enum Facing { Down, Up, Side }
        private enum Action { None, Till, Axe, Water }

        [Header("Movement")]
        [SerializeField] private float moveSpeed = 2.5f;

        [Header("Animation")]
        [SerializeField] private float walkFps = 8f;
        [SerializeField] private float actionFps = 10f;

        [Header("Sprites (auto-assigned oleh Lifetopia > Setup > Create Farmer Player)")]
        [SerializeField] private FarmerAnimationSet animation = new FarmerAnimationSet();

        private Rigidbody2D _rb;
        private SpriteFrameAnimator _animator;
        private Vector2 _moveInput;
        private Facing _facing = Facing.Down;
        private bool _facingLeft;
        private Action _currentAction = Action.None;

        private void Awake()
        {
            _rb = GetComponent<Rigidbody2D>();
            _rb.gravityScale = 0f;
            _rb.freezeRotation = true;
            _animator = GetComponent<SpriteFrameAnimator>();
        }

        private void Update()
        {
            ReadMovementInput();
            ReadActionInput();
            UpdateAnimation();
        }

        private void FixedUpdate()
        {
            if (_currentAction != Action.None)
            {
                // Diam di tempat selagi mainkan animasi tool.
                // Catatan: pakai Rigidbody2D.velocity (bukan linearVelocity)
                // karena project ini di Unity 2022.3 LTS - linearVelocity
                // baru ada mulai Unity 6.
                _rb.velocity = Vector2.zero;
                return;
            }

            _rb.velocity = _moveInput * moveSpeed;
        }

        private void ReadMovementInput()
        {
            if (_currentAction != Action.None)
            {
                _moveInput = Vector2.zero;
                return;
            }

            float x = Input.GetAxisRaw("Horizontal");
            float y = Input.GetAxisRaw("Vertical");
            _moveInput = new Vector2(x, y).normalized;

            if (_moveInput.sqrMagnitude < 0.01f) return;

            // Prioritas arah vertikal kalau gerakan diagonal, biar gak
            // "gemeteran" gonta-ganti sprite pas nge-drag joystick/tombol.
            if (Mathf.Abs(_moveInput.y) >= Mathf.Abs(_moveInput.x))
            {
                _facing = _moveInput.y > 0 ? Facing.Up : Facing.Down;
            }
            else
            {
                _facing = Facing.Side;
                _facingLeft = _moveInput.x < 0;
            }
        }

        private void ReadActionInput()
        {
            if (_currentAction != Action.None) return;

            if (Input.GetKeyDown(KeyCode.Alpha1)) StartAction(Action.Till, animation.till);
            else if (Input.GetKeyDown(KeyCode.Alpha2)) StartAction(Action.Axe, animation.axe);
            else if (Input.GetKeyDown(KeyCode.Alpha3)) StartAction(Action.Water, animation.water);
        }

        private void StartAction(Action action, Sprite[] frames)
        {
            if (frames == null || frames.Length == 0)
            {
                Debug.LogWarning($"[PlayerController] Frame untuk aksi {action} belum di-assign.");
                return;
            }

            _currentAction = action;
            _animator.SetFlipX(_facing == Facing.Side && _facingLeft);
            _animator.PlayOnce(frames, OnActionComplete, actionFps);
        }

        private void OnActionComplete()
        {
            _currentAction = Action.None;
        }

        private void UpdateAnimation()
        {
            if (_currentAction != Action.None) return; // biarin PlayOnce yang jalan

            bool isMoving = _moveInput.sqrMagnitude > 0.01f;
            _animator.SetFlipX(_facing == Facing.Side && _facingLeft);

            Sprite[] loopFrames = _facing switch
            {
                Facing.Up => animation.walkUp,
                Facing.Side => animation.walkSide,
                _ => animation.walkDown,
            };

            if (isMoving)
            {
                _animator.PlayLoop(loopFrames, walkFps);
            }
            else
            {
                Sprite idle = _facing switch
                {
                    Facing.Up => animation.IdleUp,
                    Facing.Side => animation.IdleSide,
                    _ => animation.IdleDown,
                };
                _animator.ShowStatic(idle);
            }
        }
    }
}
