using UnityEngine;
using Lifetopia.Events;

namespace Lifetopia.Mechanics
{
    /// <summary>
    /// Handles player interaction dengan objek di dunia.
    /// Attach ke player — scan radius untuk interactable objects.
    /// </summary>
    public class InteractionMechanic : MonoBehaviour
    {
        [Header("Settings")]
        public float   interactRadius = 1.8f;
        public LayerMask interactLayer;
        public KeyCode interactKey   = KeyCode.E;

        [Header("UI Prompt")]
        public bool showPrompt = true;

        IInteractable _nearest;
        bool          _promptVisible;

        void Update()
        {
            FindNearest();

            if (_nearest != null && UnityEngine.Input.GetKeyDown(interactKey))
                _nearest.Interact(gameObject);
        }

        void FindNearest()
        {
            var hits = Physics2D.OverlapCircleAll(transform.position, interactRadius, interactLayer);
            IInteractable best = null;
            float bestDist = float.MaxValue;

            foreach (var hit in hits)
            {
                var interactable = hit.GetComponent<IInteractable>();
                if (interactable == null || !interactable.CanInteract) continue;
                float d = Vector2.Distance(transform.position, hit.transform.position);
                if (d < bestDist) { bestDist = d; best = interactable; }
            }

            _nearest = best;
        }

        void OnDrawGizmosSelected()
        {
            Gizmos.color = Color.cyan;
            Gizmos.DrawWireSphere(transform.position, interactRadius);
        }
    }

    public interface IInteractable
    {
        bool CanInteract { get; }
        void Interact(GameObject interactor);
        string InteractPrompt { get; }
    }
}
