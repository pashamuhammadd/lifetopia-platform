using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using Lifetopia.Constants;

namespace Lifetopia.Network
{
    /// <summary>
    /// Generic HTTP client — semua request game lewat sini.
    /// Zero plugin, pakai UnityWebRequest saja.
    /// </summary>
    public class HttpClient : MonoBehaviour
    {
        public static HttpClient Instance { get; private set; }

        [Header("Config")]
        public string baseUrl    = GameConstants.API_BASE_URL;
        public int    timeoutSec = GameConstants.API_TIMEOUT_SEC;

        string _authToken = "";

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public void SetAuthToken(string token) => _authToken = token ?? "";

        // ── GET ───────────────────────────────────────────────────────────────

        public IEnumerator Get(string endpoint,
            Action<string> onSuccess, Action<string> onError = null)
        {
            string url = endpoint.StartsWith("http") ? endpoint : baseUrl + endpoint;
            using var req = UnityWebRequest.Get(url);
            ApplyHeaders(req);
            req.timeout = timeoutSec;
            yield return req.SendWebRequest();
            HandleResponse(req, onSuccess, onError);
        }

        // ── POST ──────────────────────────────────────────────────────────────

        public IEnumerator Post(string endpoint, string jsonBody,
            Action<string> onSuccess, Action<string> onError = null)
        {
            string url = endpoint.StartsWith("http") ? endpoint : baseUrl + endpoint;
            using var req = new UnityWebRequest(url, "POST");
            byte[] raw = Encoding.UTF8.GetBytes(jsonBody ?? "{}");
            req.uploadHandler   = new UploadHandlerRaw(raw);
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");
            ApplyHeaders(req);
            req.timeout = timeoutSec;
            yield return req.SendWebRequest();
            HandleResponse(req, onSuccess, onError);
        }

        // ── PUT ───────────────────────────────────────────────────────────────

        public IEnumerator Put(string endpoint, string jsonBody,
            Action<string> onSuccess, Action<string> onError = null)
        {
            string url = endpoint.StartsWith("http") ? endpoint : baseUrl + endpoint;
            using var req = new UnityWebRequest(url, "PUT");
            byte[] raw = Encoding.UTF8.GetBytes(jsonBody ?? "{}");
            req.uploadHandler   = new UploadHandlerRaw(raw);
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");
            ApplyHeaders(req);
            req.timeout = timeoutSec;
            yield return req.SendWebRequest();
            HandleResponse(req, onSuccess, onError);
        }

        // ── DELETE ────────────────────────────────────────────────────────────

        public IEnumerator Delete(string endpoint,
            Action<string> onSuccess, Action<string> onError = null)
        {
            string url = endpoint.StartsWith("http") ? endpoint : baseUrl + endpoint;
            using var req = UnityWebRequest.Delete(url);
            req.downloadHandler = new DownloadHandlerBuffer();
            ApplyHeaders(req);
            req.timeout = timeoutSec;
            yield return req.SendWebRequest();
            HandleResponse(req, onSuccess, onError);
        }

        // ── Helpers ───────────────────────────────────────────────────────────

        void ApplyHeaders(UnityWebRequest req)
        {
            req.SetRequestHeader("Accept", "application/json");
            req.SetRequestHeader("X-Client", "LifetopiaUnity/1.0");
            if (!string.IsNullOrEmpty(_authToken))
                req.SetRequestHeader("Authorization", "Bearer " + _authToken);
        }

        void HandleResponse(UnityWebRequest req,
            Action<string> onSuccess, Action<string> onError)
        {
#if UNITY_2020_1_OR_NEWER
            bool isError = req.result != UnityWebRequest.Result.Success;
#else
            bool isError = req.isNetworkError || req.isHttpError;
#endif
            if (isError)
            {
                string err = $"[HTTP {req.responseCode}] {req.error}";
                UnityEngine.Debug.LogWarning("[HttpClient] " + err);
                onError?.Invoke(err);
            }
            else
            {
                onSuccess?.Invoke(req.downloadHandler.text);
            }
        }
    }
}
