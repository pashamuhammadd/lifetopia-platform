using System;
using System.Collections;
using UnityEngine;
using Lifetopia.Events;
using Lifetopia.Rewards;

namespace Lifetopia.Gameplay
{
    public enum FishingState { Idle, Casting, Waiting, Biting, Reeling, Success, Failed }

    /// <summary>
    /// Fishing mechanic untuk scene Fishing Cove.
    /// Press R to cast, press R again when fish bites.
    /// </summary>
    public class FishingMechanic : MonoBehaviour
    {
        public static FishingMechanic Instance { get; private set; }

        [Header("Settings")]
        public float minWaitTime   = 2f;
        public float maxWaitTime   = 8f;
        public float biteWindow    = 1.5f;
        public float reelTime      = 1.0f;
        public KeyCode fishKey     = KeyCode.R;

        [Header("Rewards")]
        public int   goldPerFish   = 15;
        public int   xpPerFish     = 20;

        public FishingState State  { get; private set; } = FishingState.Idle;

        public event Action<FishingState> OnStateChanged;
        public event Action<string>       OnFishCaught;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
        }

        void Update()
        {
            if (UnityEngine.Input.GetKeyDown(fishKey))
                HandleInput();
        }

        void HandleInput()
        {
            switch (State)
            {
                case FishingState.Idle:    StartCasting(); break;
                case FishingState.Biting:  StartReeling(); break;
                case FishingState.Waiting: CancelFishing(); break;
            }
        }

        void StartCasting()
        {
            SetState(FishingState.Casting);
            StartCoroutine(CastRoutine());
        }

        IEnumerator CastRoutine()
        {
            yield return new WaitForSeconds(0.5f);
            SetState(FishingState.Waiting);
            float wait = UnityEngine.Random.Range(minWaitTime, maxWaitTime);
            yield return new WaitForSeconds(wait);
            SetState(FishingState.Biting);
            Systems.NotificationSystem.Instance?.Show("Fish is biting! Press R! 🎣");
            yield return new WaitForSeconds(biteWindow);
            if (State == FishingState.Biting)
            {
                SetState(FishingState.Failed);
                Systems.NotificationSystem.Instance?.Show("Fish got away... 😔");
                yield return new WaitForSeconds(1f);
                SetState(FishingState.Idle);
            }
        }

        void StartReeling()
        {
            StopAllCoroutines();
            SetState(FishingState.Reeling);
            StartCoroutine(ReelRoutine());
        }

        IEnumerator ReelRoutine()
        {
            yield return new WaitForSeconds(reelTime);
            string fishId = GetRandomFish();
            SetState(FishingState.Success);
            OnFishCaught?.Invoke(fishId);

            RewardService.Instance?.Grant(new Rewards.RewardPackage
            {
                Gold    = goldPerFish,
                XP      = xpPerFish,
                ItemId  = fishId,
                ItemQty = 1,
                Message = $"Caught a {fishId.Replace("fish_", "")}! 🐟",
            });

            GameEventBus.Publish(new ItemPickedUpEvent { ItemId = fishId, Qty = 1 });

            yield return new WaitForSeconds(1.5f);
            SetState(FishingState.Idle);
        }

        void CancelFishing()
        {
            StopAllCoroutines();
            SetState(FishingState.Idle);
        }

        void SetState(FishingState s)
        {
            State = s;
            OnStateChanged?.Invoke(s);
        }

        string GetRandomFish()
        {
            string[] fish = { "fish_salmon", "fish_tuna", "fish_bass", "fish_carp", "fish_rare_golden" };
            float[] weights = { 0.3f, 0.25f, 0.25f, 0.15f, 0.05f };
            float r = UnityEngine.Random.value;
            float cumulative = 0f;
            for (int i = 0; i < fish.Length; i++)
            {
                cumulative += weights[i];
                if (r <= cumulative) return fish[i];
            }
            return fish[0];
        }
    }
}
