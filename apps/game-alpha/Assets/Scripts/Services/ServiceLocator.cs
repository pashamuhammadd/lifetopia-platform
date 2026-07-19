using System;
using System.Collections.Generic;
using UnityEngine;

namespace Lifetopia.Services
{
    /// <summary>
    /// Service locator pattern — register dan resolve services.
    /// </summary>
    public static class ServiceLocator
    {
        static readonly Dictionary<Type, object> _services = new Dictionary<Type, object>();

        public static void Register<T>(T service) where T : class =>
            _services[typeof(T)] = service;

        public static T Get<T>() where T : class
        {
            _services.TryGetValue(typeof(T), out var service);
            return service as T;
        }

        public static bool Has<T>() where T : class => _services.ContainsKey(typeof(T));

        public static void Unregister<T>() where T : class => _services.Remove(typeof(T));

        public static void Clear() => _services.Clear();

        public static void RegisterAll()
        {
            var http = UnityEngine.Object.FindObjectOfType<Network.HttpClient>();
            if (http != null) Register(http);

            var eco = UnityEngine.Object.FindObjectOfType<Systems.EconomySystem>();
            if (eco != null) Register(eco);

            var inv = UnityEngine.Object.FindObjectOfType<Managers.InventoryManager>();
            if (inv != null) Register(inv);

            var audio = UnityEngine.Object.FindObjectOfType<Audio.AudioManager>();
            if (audio != null) Register(audio);

            UnityEngine.Debug.Log($"[ServiceLocator] {_services.Count} services registered.");
        }
    }
}
