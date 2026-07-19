using System;
using UnityEngine;
using Lifetopia.Encryption;

namespace Lifetopia.SaveSystem
{
    /// <summary>
    /// Save/load semua data game ke PlayerPrefs dengan enkripsi opsional.
    /// </summary>
    public class SaveManager : MonoBehaviour
    {
        public static SaveManager Instance { get; private set; }

        [Header("Settings")]
        public bool encryptData = true;

        const string SAVE_VERSION_KEY = "lf_save_version";
        const string SAVE_VERSION     = "1.0";

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        // ── Write ─────────────────────────────────────────────────────────────

        public void SaveString(string key, string value)
        {
            string data = encryptData ? DataEncryptor.Encrypt(value) : value;
            PlayerPrefs.SetString(key, data);
        }

        public void SaveInt(string key, int value)     => PlayerPrefs.SetInt(key, value);
        public void SaveFloat(string key, float value) => PlayerPrefs.SetFloat(key, value);
        public void SaveBool(string key, bool value)   => PlayerPrefs.SetInt(key, value ? 1 : 0);

        public void SaveJson<T>(string key, T obj)
        {
            string json = JsonUtility.ToJson(obj);
            SaveString(key, json);
        }

        // ── Read ──────────────────────────────────────────────────────────────

        public string LoadString(string key, string defaultVal = "")
        {
            string raw = PlayerPrefs.GetString(key, "");
            if (string.IsNullOrEmpty(raw)) return defaultVal;
            return encryptData ? DataEncryptor.Decrypt(raw) : raw;
        }

        public int   LoadInt(string key, int defaultVal = 0)     => PlayerPrefs.GetInt(key, defaultVal);
        public float LoadFloat(string key, float defaultVal = 0f) => PlayerPrefs.GetFloat(key, defaultVal);
        public bool  LoadBool(string key, bool defaultVal = false) => PlayerPrefs.GetInt(key, defaultVal ? 1 : 0) == 1;

        public T LoadJson<T>(string key, T defaultVal = default)
        {
            string json = LoadString(key, "");
            if (string.IsNullOrEmpty(json)) return defaultVal;
            try { return JsonUtility.FromJson<T>(json); }
            catch { return defaultVal; }
        }

        // ── Utility ───────────────────────────────────────────────────────────

        public bool   HasKey(string key)    => PlayerPrefs.HasKey(key);
        public void   DeleteKey(string key) => PlayerPrefs.DeleteKey(key);
        public void   Flush()               => PlayerPrefs.Save();

        public void DeleteAll()
        {
            PlayerPrefs.DeleteAll();
            UnityEngine.Debug.Log("[SaveManager] All save data deleted.");
        }

        public string GetSaveVersion() => PlayerPrefs.GetString(SAVE_VERSION_KEY, "none");
        public void   WriteSaveVersion() => PlayerPrefs.SetString(SAVE_VERSION_KEY, SAVE_VERSION);
    }
}
