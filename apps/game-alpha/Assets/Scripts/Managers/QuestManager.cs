using System;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Models;
using Lifetopia.Events;

namespace Lifetopia.Managers
{
    /// <summary>Manages daily quests — progress, complete, reward.</summary>
    public class QuestManager : MonoBehaviour
    {
        public static QuestManager Instance { get; private set; }

        readonly Dictionary<string, QuestModel> _quests = new Dictionary<string, QuestModel>();

        public event Action<QuestModel> OnQuestUpdated;
        public event Action<QuestModel> OnQuestCompleted;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start()
        {
            InitDefaultQuests();
            GameEventBus.Subscribe<CropPlantedEvent>(e  => Progress("quest_plant",   1));
            GameEventBus.Subscribe<CropHarvestedEvent>(e => Progress("quest_harvest", 1));
            GameEventBus.Subscribe<GoldChangedEvent>(e  =>
            {
                if (e.Delta > 0) Progress("quest_gold", e.Delta);
            });
        }

        void OnDestroy()
        {
            GameEventBus.Unsubscribe<CropPlantedEvent>(e  => Progress("quest_plant",   1));
            GameEventBus.Unsubscribe<CropHarvestedEvent>(e => Progress("quest_harvest", 1));
        }

        void InitDefaultQuests()
        {
            AddQuest(new QuestModel
            {
                QuestId = "quest_harvest", Title = "Harvest Crops",
                Description = "Harvest 5 crops today.",
                Target = 5, GoldReward = 20, XpReward = 50,
            });
            AddQuest(new QuestModel
            {
                QuestId = "quest_plant", Title = "Plant Seeds",
                Description = "Plant 10 seeds today.",
                Target = 10, GoldReward = 15, XpReward = 30,
            });
            AddQuest(new QuestModel
            {
                QuestId = "quest_gold", Title = "Earn Gold",
                Description = "Earn 20 GOLD today.",
                Target = 20, GoldReward = 10, XpReward = 25,
            });
        }

        public void AddQuest(QuestModel quest)
        {
            _quests[quest.QuestId] = quest;
        }

        public void Progress(string questId, int amount = 1)
        {
            if (!_quests.TryGetValue(questId, out var q)) return;
            if (q.Status != QuestStatus.Active) return;

            q.Increment(amount);
            OnQuestUpdated?.Invoke(q);
            GameEventBus.Publish(new QuestProgressEvent
                { QuestId = questId, Current = q.Current, Target = q.Target });

            if (q.IsComplete)
            {
                OnQuestCompleted?.Invoke(q);
                GameEventBus.Publish(new QuestCompletedEvent
                    { QuestId = questId, GoldReward = q.GoldReward });
            }
        }

        public QuestModel GetQuest(string id) =>
            _quests.TryGetValue(id, out var q) ? q : null;

        public List<QuestModel> GetAll() => new List<QuestModel>(_quests.Values);

        public int CompletedCount()
        {
            int n = 0;
            foreach (var q in _quests.Values)
                if (q.Status == QuestStatus.Completed || q.Status == QuestStatus.Claimed) n++;
            return n;
        }
    }
}
