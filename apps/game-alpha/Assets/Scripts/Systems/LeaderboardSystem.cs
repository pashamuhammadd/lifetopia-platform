using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.API;
using Lifetopia.DTO;

namespace Lifetopia.Systems
{
    /// <summary>Leaderboard system — fetch, cache, display.</summary>
    public class LeaderboardSystem : MonoBehaviour
    {
        public static LeaderboardSystem Instance { get; private set; }

        public List<LeaderboardEntryDTO> Entries { get; private set; } =
            new List<LeaderboardEntryDTO>();

        public bool  IsLoading  { get; private set; }
        public float LastFetch  { get; private set; }
        public float CacheTTL   = 60f;  // seconds

        public event Action<List<LeaderboardEntryDTO>> OnLeaderboardUpdated;
        public event Action<string>                    OnFetchError;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public void Fetch(bool forceRefresh = false)
        {
            if (IsLoading) return;
            if (!forceRefresh && Time.realtimeSinceStartup - LastFetch < CacheTTL
                && Entries.Count > 0)
            {
                OnLeaderboardUpdated?.Invoke(Entries);
                return;
            }
            StartCoroutine(FetchRoutine());
        }

        IEnumerator FetchRoutine()
        {
            IsLoading = true;
            yield return PlayerApiService.Instance?.GetLeaderboard(
                entries =>
                {
                    Entries   = new List<LeaderboardEntryDTO>(entries ?? new LeaderboardEntryDTO[0]);
                    LastFetch = Time.realtimeSinceStartup;
                    OnLeaderboardUpdated?.Invoke(Entries);
                },
                err => OnFetchError?.Invoke(err));
            IsLoading = false;
        }

        public int GetPlayerRank(string walletShort)
        {
            for (int i = 0; i < Entries.Count; i++)
                if (Entries[i].walletShort == walletShort) return i + 1;
            return -1;
        }
    }
}
