using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

namespace Lifetopia.Network
{
    /// <summary>Monitor koneksi internet secara berkala.</summary>
    public class ConnectionMonitor : MonoBehaviour
    {
        public static ConnectionMonitor Instance { get; private set; }

        [Header("Settings")]
        public float checkInterval = 15f;
        public string pingUrl      = "https://www.google.com";

        public bool  IsOnline      { get; private set; } = true;
        public event Action<bool>  OnConnectionChanged;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start() => StartCoroutine(MonitorLoop());

        IEnumerator MonitorLoop()
        {
            while (true)
            {
                yield return new WaitForSeconds(checkInterval);
                yield return CheckConnection();
            }
        }

        public IEnumerator CheckConnection()
        {
            using var req = UnityWebRequest.Head(pingUrl);
            req.timeout = 5;
            yield return req.SendWebRequest();
#if UNITY_2020_1_OR_NEWER
            bool online = req.result == UnityWebRequest.Result.Success;
#else
            bool online = !req.isNetworkError && !req.isHttpError;
#endif
            if (online != IsOnline)
            {
                IsOnline = online;
                OnConnectionChanged?.Invoke(IsOnline);
                UnityEngine.Debug.Log($"[ConnectionMonitor] Status: {(IsOnline ? "ONLINE" : "OFFLINE")}");
            }
        }
    }
}
