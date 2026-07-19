using UnityEngine;
using Lifetopia.Gameplay;
using Lifetopia.Mechanics;

namespace Lifetopia.Controllers
{
    /// <summary>
    /// NPC yang bisa diajak bicara saat player mendekat.
    /// Attach ke NPC GameObject. Implements IInteractable.
    /// </summary>
    public class NPCDialogueController : MonoBehaviour, IInteractable
    {
        [Header("NPC Info")]
        public string NpcId      = "npc_01";
        public string NpcName    = "Merchant";

        [Header("Dialogue")]
        public DialogueData dialogue;

        [Header("Interact")]
        public float interactRadius = 1.5f;
        public string promptText    = "Press E to talk";

        public bool   CanInteract   => true;
        public string InteractPrompt=> promptText;

        public void Interact(GameObject interactor)
        {
            if (DialogueSystem.Instance == null) return;
            if (dialogue == null)
            {
                dialogue = new DialogueData
                {
                    DialogueId = NpcId + "_default",
                    Lines = new System.Collections.Generic.List<DialogueLine>
                    {
                        new DialogueLine { Speaker = NpcName, Text = "Hello, traveler!" },
                        new DialogueLine { Speaker = NpcName, Text = "Welcome to Lifetopia!" },
                    }
                };
            }
            DialogueSystem.Instance.StartDialogue(dialogue, NpcId);
        }

        void OnDrawGizmosSelected()
        {
            Gizmos.color = Color.yellow;
            Gizmos.DrawWireSphere(transform.position, interactRadius);
        }
    }
}
