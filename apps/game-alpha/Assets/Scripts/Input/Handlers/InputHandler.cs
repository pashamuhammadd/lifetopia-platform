using UnityEngine;

namespace Lifetopia.Input.Handlers
{
    /// <summary>
    /// Central input handler — semua input game lewat sini.
    /// Tidak butuh Input System package — pakai UnityEngine.Input.
    /// </summary>
    public class InputHandler : MonoBehaviour
    {
        public static InputHandler Instance { get; private set; }

        // ── Axes ──────────────────────────────────────────────────────────────
        public Vector2 Movement     { get; private set; }
        public Vector2 MousePosition{ get; private set; }

        // ── Buttons ───────────────────────────────────────────────────────────
        public bool JumpPressed     { get; private set; }
        public bool JumpHeld        { get; private set; }
        public bool RunHeld         { get; private set; }
        public bool InteractPressed { get; private set; }
        public bool AttackPressed   { get; private set; }
        public bool PausePressed    { get; private set; }
        public bool InventoryPressed{ get; private set; }
        public bool MapPressed      { get; private set; }
        public bool SprintPressed   { get; private set; }

        // ── Hotbar ────────────────────────────────────────────────────────────
        public int HotbarSlot { get; private set; } = -1;  // 0-7, -1 = none

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Update()
        {
            // Movement
            Movement = new Vector2(
                UnityEngine.Input.GetAxisRaw("Horizontal"),
                UnityEngine.Input.GetAxisRaw("Vertical"));

            MousePosition = UnityEngine.Input.mousePosition;

            // Buttons
            JumpPressed      = UnityEngine.Input.GetKeyDown(KeyCode.Space) ||
                               UnityEngine.Input.GetKeyDown(KeyCode.W);
            JumpHeld         = UnityEngine.Input.GetKey(KeyCode.Space);
            RunHeld          = UnityEngine.Input.GetKey(KeyCode.LeftShift);
            InteractPressed  = UnityEngine.Input.GetKeyDown(KeyCode.E);
            AttackPressed    = UnityEngine.Input.GetKeyDown(KeyCode.Mouse0);
            PausePressed     = UnityEngine.Input.GetKeyDown(KeyCode.Escape);
            InventoryPressed = UnityEngine.Input.GetKeyDown(KeyCode.I) ||
                               UnityEngine.Input.GetKeyDown(KeyCode.Tab);
            MapPressed       = UnityEngine.Input.GetKeyDown(KeyCode.M);
            SprintPressed    = UnityEngine.Input.GetKeyDown(KeyCode.LeftShift);

            // Hotbar 1-8
            HotbarSlot = -1;
            for (int i = 0; i < 8; i++)
                if (UnityEngine.Input.GetKeyDown(KeyCode.Alpha1 + i))
                    HotbarSlot = i;
        }

        public bool IsMoving() => Movement.sqrMagnitude > 0.01f;
        public bool IsMovingHorizontal() => Mathf.Abs(Movement.x) > 0.01f;
        public bool IsFacingRight() => Movement.x > 0f;
    }
}
