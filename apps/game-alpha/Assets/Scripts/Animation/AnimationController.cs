using System.Collections;
using UnityEngine;

namespace Lifetopia.Animation
{
    /// <summary>
    /// Generic sprite animation controller.
    /// Tidak butuh Animator component — pakai SpriteRenderer + coroutine.
    /// </summary>
    [RequireComponent(typeof(SpriteRenderer))]
    public class AnimationController : MonoBehaviour
    {
        [System.Serializable]
        public class AnimClip
        {
            public string   Name   = "";
            public Sprite[] Frames = new Sprite[0];
            public float    FPS    = 8f;
            public bool     Loop   = true;
        }

        [Header("Clips")]
        public AnimClip[] clips = new AnimClip[0];

        [Header("Default")]
        public string defaultClip = "idle";

        SpriteRenderer _sr;
        Coroutine      _current;
        string         _playing = "";

        void Awake() => _sr = GetComponent<SpriteRenderer>();

        void Start()
        {
            if (!string.IsNullOrEmpty(defaultClip))
                Play(defaultClip);
        }

        public void Play(string clipName, bool forceRestart = false)
        {
            if (_playing == clipName && !forceRestart) return;

            AnimClip clip = FindClip(clipName);
            if (clip == null) return;

            if (_current != null) StopCoroutine(_current);
            _playing = clipName;
            _current = StartCoroutine(RunClip(clip));
        }

        public void Stop()
        {
            if (_current != null) StopCoroutine(_current);
            _playing = "";
        }

        public bool IsPlaying(string clipName) => _playing == clipName;

        IEnumerator RunClip(AnimClip clip)
        {
            if (clip.Frames == null || clip.Frames.Length == 0) yield break;
            float delay = clip.FPS > 0f ? 1f / clip.FPS : 0.1f;
            int   index = 0;

            do
            {
                if (clip.Frames[index] != null)
                    _sr.sprite = clip.Frames[index];
                index = (index + 1) % clip.Frames.Length;
                yield return new WaitForSeconds(delay);
            }
            while (clip.Loop);

            // One-shot: show last frame
            if (clip.Frames.Length > 0 && clip.Frames[^1] != null)
                _sr.sprite = clip.Frames[^1];

            _playing = "";
            if (!string.IsNullOrEmpty(defaultClip))
                Play(defaultClip);
        }

        AnimClip FindClip(string name)
        {
            foreach (var c in clips)
                if (c.Name == name) return c;
            return null;
        }

        public void FlipX(bool flip) => _sr.flipX = flip;
    }
}
