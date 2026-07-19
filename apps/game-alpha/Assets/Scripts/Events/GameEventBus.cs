using System;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Interfaces;

namespace Lifetopia.Events
{
    /// <summary>
    /// Type-safe event bus — publish/subscribe tanpa direct reference.
    /// Semua sistem game komunikasi lewat sini.
    ///
    /// CARA PAKAI:
    ///   // Subscribe
    ///   GameEventBus.Subscribe<GoldChangedEvent>(OnGoldChanged);
    ///
    ///   // Publish
    ///   GameEventBus.Publish(new GoldChangedEvent { Amount = 10 });
    ///
    ///   // Unsubscribe
    ///   GameEventBus.Unsubscribe<GoldChangedEvent>(OnGoldChanged);
    /// </summary>
    public static class GameEventBus
    {
        static readonly Dictionary<Type, List<Delegate>> _handlers =
            new Dictionary<Type, List<Delegate>>();

        public static void Subscribe<T>(Action<T> handler)
        {
            var type = typeof(T);
            if (!_handlers.ContainsKey(type))
                _handlers[type] = new List<Delegate>();
            _handlers[type].Add(handler);
        }

        public static void Unsubscribe<T>(Action<T> handler)
        {
            var type = typeof(T);
            if (_handlers.ContainsKey(type))
                _handlers[type].Remove(handler);
        }

        public static void Publish<T>(T eventData)
        {
            var type = typeof(T);
            if (!_handlers.ContainsKey(type)) return;
            var list = new List<Delegate>(_handlers[type]);
            foreach (var h in list)
                (h as Action<T>)?.Invoke(eventData);
        }

        public static void Clear<T>()
        {
            var type = typeof(T);
            if (_handlers.ContainsKey(type))
                _handlers[type].Clear();
        }

        public static void ClearAll() => _handlers.Clear();
    }

    // ── Game Events ───────────────────────────────────────────────────────────

    public struct GoldChangedEvent      { public int OldValue; public int NewValue; public int Delta; }
    public struct XpGainedEvent         { public int Amount; public int NewTotal; }
    public struct LevelUpEvent          { public int OldLevel; public int NewLevel; }
    public struct WalletConnectedEvent  { public string PublicKey; public string Provider; }
    public struct WalletDisconnectedEvent { }
    public struct NftStatusChangedEvent { public bool HasNft; }
    public struct SceneChangedEvent     { public string SceneName; public string Biome; }
    public struct ItemPickedUpEvent     { public string ItemId; public int Qty; }
    public struct ItemUsedEvent         { public string ItemId; }
    public struct CropPlantedEvent      { public string SeedId; public int PlotIndex; }
    public struct CropHarvestedEvent    { public string CropId; public int GoldEarned; }
    public struct QuestProgressEvent    { public string QuestId; public int Current; public int Target; }
    public struct QuestCompletedEvent   { public string QuestId; public int GoldReward; }
    public struct PlayerDiedEvent       { }
    public struct GamePausedEvent       { public bool IsPaused; }
    public struct ShopOpenedEvent       { public string ShopId; }
    public struct DialogueStartedEvent  { public string NpcId; public string DialogueId; }
    public struct DialogueEndedEvent    { public string NpcId; }
    public struct BiomeChangedEvent     { public string OldBiome; public string NewBiome; }
}
