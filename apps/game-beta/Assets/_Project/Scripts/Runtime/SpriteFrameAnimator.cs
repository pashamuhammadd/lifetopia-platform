using System;
using UnityEngine;

namespace Lifetopia.Gameplay
{
    /// <summary>
    /// Animator sprite ringan berbasis array Sprite (bukan Mecanim/Animator
    /// Controller). Dipilih karena lebih ringan buat device low-end dan lebih
    /// gampang di-debug (tinggal lihat array-nya di Inspector), sekaligus
    /// reusable untuk karakter apapun (player, NPC, dst) - bukan cuma Farmer.
    /// </summary>
    [RequireComponent(typeof(SpriteRenderer))]
    public class SpriteFrameAnimator : MonoBehaviour
    {
        [SerializeField] private float defaultFramesPerSecond = 8f;

        private SpriteRenderer _renderer;
        private Sprite[] _currentFrames;
        private int _frameIndex;
        private float _frameTimer;
        private float _fps;
        private bool _looping;
        private Action _onComplete;
        private bool _isPlaying;

        private void Awake()
        {
            _renderer = GetComponent<SpriteRenderer>();
        }

        /// <summary>Tampilkan satu sprite statis (dipakai untuk idle pose).</summary>
        public void ShowStatic(Sprite sprite)
        {
            _isPlaying = false;
            _currentFrames = null;
            if (sprite != null) _renderer.sprite = sprite;
        }

        /// <summary>
        /// Mainkan animasi looping (mis. jalan). Kalau frames yang sama
        /// sudah jalan, gak di-restart dari frame 0 (biar gak "kedip" tiap
        /// frame Update saat tetap gerak ke arah yang sama).
        /// </summary>
        public void PlayLoop(Sprite[] frames, float fps = -1f)
        {
            if (frames == null || frames.Length == 0) return;
            if (_isPlaying && _looping && _currentFrames == frames) return;

            _currentFrames = frames;
            _fps = fps > 0 ? fps : defaultFramesPerSecond;
            _looping = true;
            _isPlaying = true;
            _frameIndex = 0;
            _frameTimer = 0f;
            _onComplete = null;
            _renderer.sprite = frames[0];
        }

        /// <summary>Mainkan animasi sekali jalan (mis. aksi tool), lalu panggil onComplete.</summary>
        public void PlayOnce(Sprite[] frames, Action onComplete, float fps = -1f)
        {
            if (frames == null || frames.Length == 0)
            {
                onComplete?.Invoke();
                return;
            }

            _currentFrames = frames;
            _fps = fps > 0 ? fps : defaultFramesPerSecond;
            _looping = false;
            _isPlaying = true;
            _frameIndex = 0;
            _frameTimer = 0f;
            _onComplete = onComplete;
            _renderer.sprite = frames[0];
        }

        public bool IsPlayingOneShot => _isPlaying && !_looping;

        private void Update()
        {
            if (!_isPlaying || _currentFrames == null || _currentFrames.Length == 0) return;

            _frameTimer += Time.deltaTime;
            float frameDuration = 1f / Mathf.Max(1f, _fps);

            if (_frameTimer < frameDuration) return;
            _frameTimer -= frameDuration;

            _frameIndex++;
            if (_frameIndex >= _currentFrames.Length)
            {
                if (_looping)
                {
                    // Frame index 0 dipakai juga sebagai pose Idle (lihat
                    // FarmerAnimationSet.IdleDown/Up/Side). Kalau tiap
                    // putaran loop balik ke index 0, pose idle itu keulang
                    // muncul di tengah jalan kayak "kedip" - jadi abis
                    // putaran pertama, loop berikutnya lewatin index 0 dan
                    // mulai dari index 1. Index 0 cuma muncul di awal gerak
                    // dan pas berhenti (lihat PlayLoop/ShowStatic).
                    _frameIndex = _currentFrames.Length > 1 ? 1 : 0;
                }
                else
                {
                    _isPlaying = false;
                    _frameIndex = _currentFrames.Length - 1;
                    _renderer.sprite = _currentFrames[_frameIndex];
                    var callback = _onComplete;
                    _onComplete = null;
                    callback?.Invoke();
                    return;
                }
            }

            _renderer.sprite = _currentFrames[_frameIndex];
        }

        public void SetFlipX(bool flip) => _renderer.flipX = flip;
    }
}
