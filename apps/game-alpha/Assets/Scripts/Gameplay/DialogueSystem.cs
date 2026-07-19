using System;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.UI;
using Lifetopia.Events;

namespace Lifetopia.Gameplay
{
    [Serializable]
    public class DialogueLine
    {
        public string Speaker = "";
        public string Text    = "";
        public float  Delay   = 0f;
    }

    [Serializable]
    public class DialogueData
    {
        public string              DialogueId = "";
        public List<DialogueLine>  Lines      = new List<DialogueLine>();
    }

    /// <summary>
    /// Simple dialogue system — typewriter effect, speaker name, next/skip.
    /// Tidak butuh plugin.
    /// </summary>
    public class DialogueSystem : MonoBehaviour
    {
        public static DialogueSystem Instance { get; private set; }

        [Header("UI References (auto-built if null)")]
        public GameObject dialoguePanel;
        public TextMeshProUGUI speakerText;
        public TextMeshProUGUI bodyText;

        [Header("Settings")]
        public float typewriterSpeed = 0.04f;
        public bool  allowSkipLine   = true;

        public bool IsActive { get; private set; }

        DialogueData _current;
        int          _lineIndex;
        bool         _isTyping;
        bool         _skipRequested;

        public event Action OnDialogueStarted;
        public event Action OnDialogueEnded;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
        }

        // ── Public API ────────────────────────────────────────────────────────

        public void StartDialogue(DialogueData data, string npcId = "")
        {
            if (data == null || data.Lines.Count == 0) return;
            _current    = data;
            _lineIndex  = 0;
            IsActive    = true;

            EnsureUI();
            dialoguePanel?.SetActive(true);
            ShowLine(_current.Lines[0]);

            OnDialogueStarted?.Invoke();
            GameEventBus.Publish(new DialogueStartedEvent
                { NpcId = npcId, DialogueId = data.DialogueId });

            LifetopiaLevelGameplayFsm.Instance?.StartDialogue();
        }

        public void Advance()
        {
            if (!IsActive) return;

            if (_isTyping && allowSkipLine)
            {
                _skipRequested = true;
                return;
            }

            _lineIndex++;
            if (_lineIndex >= _current.Lines.Count)
            {
                EndDialogue();
                return;
            }

            ShowLine(_current.Lines[_lineIndex]);
        }

        public void EndDialogue()
        {
            IsActive = false;
            dialoguePanel?.SetActive(false);
            OnDialogueEnded?.Invoke();
            GameEventBus.Publish(new DialogueEndedEvent { NpcId = "" });
            LifetopiaLevelGameplayFsm.Instance?.EndDialogue();
        }

        // ── Internal ──────────────────────────────────────────────────────────

        void ShowLine(DialogueLine line)
        {
            if (speakerText != null) speakerText.text = line.Speaker;
            StartCoroutine(TypeLine(line.Text));
        }

        System.Collections.IEnumerator TypeLine(string text)
        {
            _isTyping      = true;
            _skipRequested = false;
            if (bodyText != null) bodyText.text = "";

            foreach (char c in text)
            {
                if (_skipRequested) break;
                if (bodyText != null) bodyText.text += c;
                yield return new WaitForSeconds(typewriterSpeed);
            }

            if (bodyText != null) bodyText.text = text;
            _isTyping = false;
        }

        void EnsureUI()
        {
            if (dialoguePanel != null) return;

            var canvas = new GameObject("DialogueCanvas");
            var cv = canvas.AddComponent<Canvas>();
            cv.renderMode  = RenderMode.ScreenSpaceOverlay;
            cv.sortingOrder = 200;
            canvas.AddComponent<CanvasScaler>().uiScaleMode =
                CanvasScaler.ScaleMode.ScaleWithScreenSize;
            canvas.AddComponent<GraphicRaycaster>();

            dialoguePanel = new GameObject("DialoguePanel");
            dialoguePanel.transform.SetParent(canvas.transform, false);
            var img = dialoguePanel.AddComponent<Image>();
            img.color = new Color(0.05f, 0.05f, 0.1f, 0.92f);
            var rt = dialoguePanel.GetComponent<RectTransform>();
            rt.anchorMin = new Vector2(0.05f, 0f);
            rt.anchorMax = new Vector2(0.95f, 0f);
            rt.pivot     = new Vector2(0.5f, 0f);
            rt.anchoredPosition = new Vector2(0f, 20f);
            rt.sizeDelta = new Vector2(0f, 140f);

            var spkGO = new GameObject("Speaker");
            spkGO.transform.SetParent(dialoguePanel.transform, false);
            speakerText = spkGO.AddComponent<TextMeshProUGUI>();
            speakerText.fontSize  = 22f;
            speakerText.fontStyle = FontStyles.Bold;
            speakerText.color     = new Color(1f, 0.85f, 0.15f);
            var spkRT = spkGO.GetComponent<RectTransform>();
            spkRT.anchorMin = new Vector2(0f, 1f);
            spkRT.anchorMax = new Vector2(1f, 1f);
            spkRT.pivot     = new Vector2(0.5f, 1f);
            spkRT.anchoredPosition = new Vector2(0f, -8f);
            spkRT.sizeDelta = new Vector2(-40f, 30f);

            var bodyGO = new GameObject("Body");
            bodyGO.transform.SetParent(dialoguePanel.transform, false);
            bodyText = bodyGO.AddComponent<TextMeshProUGUI>();
            bodyText.fontSize = 20f;
            bodyText.color    = Color.white;
            var bodyRT = bodyGO.GetComponent<RectTransform>();
            bodyRT.anchorMin = Vector2.zero;
            bodyRT.anchorMax = Vector2.one;
            bodyRT.offsetMin = new Vector2(20f, 10f);
            bodyRT.offsetMax = new Vector2(-20f, -40f);
        }

        void Update()
        {
            if (!IsActive) return;
            if (UnityEngine.Input.GetKeyDown(KeyCode.E) ||
                UnityEngine.Input.GetKeyDown(KeyCode.Return) ||
                UnityEngine.Input.GetKeyDown(KeyCode.Space))
                Advance();
        }
    }
}
