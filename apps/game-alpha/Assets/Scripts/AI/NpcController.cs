using UnityEngine;
using Lifetopia.Events;

namespace Lifetopia.AI
{
    /// <summary>
    /// Simple NPC controller — idle, patrol, interact.
    /// Tidak butuh NavMesh untuk 2D side-scroller.
    /// </summary>
    public class NpcController : MonoBehaviour
    {
        public enum NpcState { Idle, Patrol, Talking, Busy }

        [Header("Identity")]
        public string NpcId   = "npc_01";
        public string NpcName = "Merchant";

        [Header("Patrol")]
        public Transform[] patrolPoints;
        public float       moveSpeed    = 1.5f;
        public float       waitTime     = 2f;

        [Header("Interact")]
        public float       interactRadius = 1.5f;
        public string      dialogueId     = "";

        NpcState    _state = NpcState.Idle;
        int         _patrolIndex;
        float       _waitTimer;
        SpriteRenderer _sr;

        void Awake() => _sr = GetComponent<SpriteRenderer>();

        void Start()
        {
            if (patrolPoints != null && patrolPoints.Length > 0)
                _state = NpcState.Patrol;
        }

        void Update()
        {
            switch (_state)
            {
                case NpcState.Idle:    UpdateIdle();   break;
                case NpcState.Patrol:  UpdatePatrol(); break;
            }
        }

        void UpdateIdle()
        {
            // Idle animation handled by CharacterAnimator if present
        }

        void UpdatePatrol()
        {
            if (patrolPoints == null || patrolPoints.Length == 0) return;

            Transform target = patrolPoints[_patrolIndex];
            float dist = Vector2.Distance(transform.position, target.position);

            if (dist < 0.1f)
            {
                _waitTimer += Time.deltaTime;
                if (_waitTimer >= waitTime)
                {
                    _waitTimer = 0f;
                    _patrolIndex = (_patrolIndex + 1) % patrolPoints.Length;
                }
                return;
            }

            Vector2 dir = (target.position - transform.position).normalized;
            transform.Translate(dir * moveSpeed * Time.deltaTime);

            if (_sr != null) _sr.flipX = dir.x < 0f;
        }

        void OnTriggerEnter2D(Collider2D other)
        {
            if (!other.CompareTag("Player")) return;
            // Show interact prompt
        }

        public void StartDialogue()
        {
            _state = NpcState.Talking;
            GameEventBus.Publish(new DialogueStartedEvent
                { NpcId = NpcId, DialogueId = dialogueId });
        }

        public void EndDialogue()
        {
            _state = patrolPoints?.Length > 0 ? NpcState.Patrol : NpcState.Idle;
            GameEventBus.Publish(new DialogueEndedEvent { NpcId = NpcId });
        }

        void OnDrawGizmosSelected()
        {
            Gizmos.color = Color.yellow;
            Gizmos.DrawWireSphere(transform.position, interactRadius);
        }
    }
}
