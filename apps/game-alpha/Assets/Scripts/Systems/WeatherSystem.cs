using System;
using System.Collections;
using UnityEngine;

namespace Lifetopia.Systems
{
    public enum WeatherType { Sunny, Cloudy, Rainy, Stormy, Foggy }

    /// <summary>
    /// Weather system — random weather transitions dengan efek visual.
    /// Mempengaruhi farming speed dan mood NPC.
    /// </summary>
    public class WeatherSystem : MonoBehaviour
    {
        public static WeatherSystem Instance { get; private set; }

        [Header("Settings")]
        public WeatherType currentWeather = WeatherType.Sunny;
        public float       minDuration    = 120f;
        public float       maxDuration    = 600f;

        [Header("Farming Modifiers")]
        public float rainFarmBoost  = 1.2f;
        public float stormFarmPenalty = 0.7f;

        public float FarmingModifier => currentWeather switch
        {
            WeatherType.Rainy  => rainFarmBoost,
            WeatherType.Stormy => stormFarmPenalty,
            _                  => 1f,
        };

        public event Action<WeatherType, WeatherType> OnWeatherChanged;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start() => StartCoroutine(WeatherCycle());

        IEnumerator WeatherCycle()
        {
            while (true)
            {
                float duration = UnityEngine.Random.Range(minDuration, maxDuration);
                yield return new WaitForSeconds(duration);
                TransitionToRandom();
            }
        }

        public void TransitionToRandom()
        {
            var values = (WeatherType[])Enum.GetValues(typeof(WeatherType));
            var next   = values[UnityEngine.Random.Range(0, values.Length)];
            SetWeather(next);
        }

        public void SetWeather(WeatherType weather)
        {
            if (weather == currentWeather) return;
            var prev = currentWeather;
            currentWeather = weather;
            OnWeatherChanged?.Invoke(prev, weather);
            NotificationSystem.Instance?.Show($"Weather: {weather} ☁");
        }

        public bool IsRaining() =>
            currentWeather == WeatherType.Rainy || currentWeather == WeatherType.Stormy;

        public string GetWeatherEmoji() => currentWeather switch
        {
            WeatherType.Sunny  => "☀️",
            WeatherType.Cloudy => "⛅",
            WeatherType.Rainy  => "🌧️",
            WeatherType.Stormy => "⛈️",
            WeatherType.Foggy  => "🌫️",
            _                  => "☀️",
        };
    }
}
