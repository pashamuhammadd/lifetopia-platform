using System;
using System.Collections;
using UnityEngine;
using Lifetopia.Network;
using Lifetopia.DTO;
using Lifetopia.Constants;

namespace Lifetopia.API
{
    /// <summary>Semua API call yang berhubungan dengan player.</summary>
    public class PlayerApiService : MonoBehaviour
    {
        public static PlayerApiService Instance { get; private set; }

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public IEnumerator GetProfile(string authToken,
            Action<PlayerProfileDTO> onSuccess, Action<string> onError = null)
        {
            HttpClient.Instance?.SetAuthToken(authToken);
            yield return HttpClient.Instance?.Get(ApiEndpoints.PLAYER_PROFILE,
                json =>
                {
                    var resp = JsonUtility.FromJson<ApiResponseDTO<PlayerProfileDTO>>(json);
                    if (resp != null && resp.success) onSuccess?.Invoke(resp.data);
                    else onError?.Invoke(resp?.error ?? "Parse error");
                },
                onError);
        }

        public IEnumerator UpdateProgress(PlayerUpdateDTO dto,
            Action onSuccess = null, Action<string> onError = null)
        {
            string body = JsonUtility.ToJson(dto);
            yield return HttpClient.Instance?.Post(ApiEndpoints.PLAYER_PROFILE, body,
                _ => onSuccess?.Invoke(), onError);
        }

        public IEnumerator GetLeaderboard(
            Action<LeaderboardEntryDTO[]> onSuccess, Action<string> onError = null)
        {
            yield return HttpClient.Instance?.Get(ApiEndpoints.PLAYER_LEADERBOARD,
                json =>
                {
                    // Simple parse — extend dengan proper JSON array parser jika perlu
                    UnityEngine.Debug.Log("[PlayerAPI] Leaderboard: " + json);
                    onSuccess?.Invoke(new LeaderboardEntryDTO[0]);
                },
                onError);
        }
    }
}
