using System;
using UnityEngine;

namespace Lifetopia.Systems
{
    /// <summary>
    /// Day/night cycle system — mengatur warna ambient dan waktu in-game.
    /// Tidak butuh plugin. Pakai Camera.backgroundColor + light color.
    /// </summary>
    public class DayNightSystem : MonoBehaviour
    {
        public static DayNightSystem Instance { get; private set; }

        [Header("Time Settings")]
        [Tooltip("Durasi 1 hari in-game dalam detik real.")]
        public float dayDurationSeconds = 600f;
        [Range(0f, 1f)]
        public float currentTime = 0.25f;  // 0=midnight, 0.25=dawn, 0.5=noon, 0.75=dusk

        [Header("Sky Colors")]
        public Color colorDawn    = new Color(0.9f, 0.6f, 0.4f);
        public Color colorNoon    = new Color(0.5f, 0.7f, 1.0f);
        public Color colorDusk    = new Color(0.8f, 0.4f, 0.2f);
        public Color colorNight   = new Color(0.05f, 0.05f, 0.15f);

        [Header("Ambient Light")]
        public Light2D ambientLight;
        public float   minAmbient = 0.3f;
        public float   maxAmbient = 1.0f;

        public bool  IsDaytime  => currentTime > 0.2f && currentTime < 0.8f;
        public bool  IsNight    => !IsDaytime;
        public float HourOfDay  => currentTime * 24f;

        public event Action OnDawnStarted;
        public event Action OnNoonStarted;
        public event Action OnDuskStarted;
        public event Action OnNightStarted;

        bool _wasDaytime;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
        }

        void Update()
        {
            currentTime = (currentTime + Time.deltaTime / dayDurationSeconds) % 1f;
            ApplySkyColor();
            CheckTransitions();
        }

        void ApplySkyColor()
        {
            Color sky;
            if      (currentTime < 0.25f) sky = Color.Lerp(colorNight, colorDawn,  currentTime / 0.25f);
            else if (currentTime < 0.5f)  sky = Color.Lerp(colorDawn,  colorNoon,  (currentTime - 0.25f) / 0.25f);
            else if (currentTime < 0.75f) sky = Color.Lerp(colorNoon,  colorDusk,  (currentTime - 0.5f)  / 0.25f);
            else                          sky = Color.Lerp(colorDusk,  colorNight, (currentTime - 0.75f) / 0.25f);

            if (UnityEngine.Camera.main != null)
                UnityEngine.Camera.main.backgroundColor = sky;
        }

        void CheckTransitions()
        {
            bool nowDay = IsDaytime;
            if (nowDay != _wasDaytime)
            {
                _wasDaytime = nowDay;
                if (nowDay) OnDawnStarted?.Invoke();
                else        OnNightStarted?.Invoke();
            }
        }

        public void SetTime(float t) => currentTime = Mathf.Clamp01(t);
        public void SetToNoon()  => SetTime(0.5f);
        public void SetToDawn()  => SetTime(0.25f);
        public void SetToNight() => SetTime(0f);

        public string GetTimeString()
        {
            int hour = (int)HourOfDay;
            int min  = (int)((HourOfDay - hour) * 60);
            return $"{hour:00}:{min:00}";
        }
    }

    // Stub untuk Light2D kalau tidak pakai URP
    [Serializable]
    public class Light2D : MonoBehaviour
    {
        public float intensity = 1f;
        public Color color     = Color.white;
    }
}
