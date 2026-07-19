using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Interfaces;

namespace Lifetopia.Audio
{
    /// <summary>
    /// Audio manager — SFX pool + music layer.
    /// Tidak butuh plugin. Pakai AudioSource pool.
    /// </summary>
    public class AudioManager : MonoBehaviour, IAudioService
    {
        public static AudioManager Instance { get; private set; }

        [Header("Settings")]
        public int    sfxPoolSize    = 8;
        public float  masterVolume   = 1f;
        public float  musicVolume    = 0.7f;
        public float  sfxVolume      = 1f;

        AudioSource   _musicSource;
        AudioSource[] _sfxPool;
        int           _sfxIndex;

        readonly Dictionary<string, AudioClip> _clips = new Dictionary<string, AudioClip>();

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            BuildPool();
        }

        void BuildPool()
        {
            _musicSource = gameObject.AddComponent<AudioSource>();
            _musicSource.loop   = true;
            _musicSource.volume = musicVolume * masterVolume;

            _sfxPool = new AudioSource[sfxPoolSize];
            for (int i = 0; i < sfxPoolSize; i++)
            {
                _sfxPool[i] = gameObject.AddComponent<AudioSource>();
                _sfxPool[i].playOnAwake = false;
            }
        }

        // ── IAudioService ─────────────────────────────────────────────────────

        public void PlaySFX(string clipId, float volume = 1f)
        {
            if (!_clips.TryGetValue(clipId, out var clip)) return;
            var src = _sfxPool[_sfxIndex % sfxPoolSize];
            _sfxIndex++;
            src.clip   = clip;
            src.volume = volume * sfxVolume * masterVolume;
            src.Play();
        }

        public void PlayMusic(string clipId, bool loop = true)
        {
            if (!_clips.TryGetValue(clipId, out var clip)) return;
            _musicSource.clip   = clip;
            _musicSource.loop   = loop;
            _musicSource.volume = musicVolume * masterVolume;
            _musicSource.Play();
        }

        public void StopMusic() => _musicSource.Stop();

        public void SetMasterVolume(float volume)
        {
            masterVolume = Mathf.Clamp01(volume);
            _musicSource.volume = musicVolume * masterVolume;
        }

        // ── Clip Registry ─────────────────────────────────────────────────────

        public void RegisterClip(string id, AudioClip clip)
        {
            if (clip != null) _clips[id] = clip;
        }

        public void UnregisterClip(string id) => _clips.Remove(id);

        public void SetMusicVolume(float v)
        {
            musicVolume = Mathf.Clamp01(v);
            _musicSource.volume = musicVolume * masterVolume;
        }

        public void SetSfxVolume(float v) =>
            sfxVolume = Mathf.Clamp01(v);
    }
}
