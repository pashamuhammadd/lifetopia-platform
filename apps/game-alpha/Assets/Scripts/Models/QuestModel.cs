using System;

namespace Lifetopia.Models
{
    public enum QuestStatus { Locked, Active, Completed, Claimed }

    [Serializable]
    public class QuestModel
    {
        public string      QuestId     = "";
        public string      Title       = "";
        public string      Description = "";
        public QuestStatus Status      = QuestStatus.Active;
        public int         Current     = 0;
        public int         Target      = 1;
        public int         GoldReward  = 0;
        public int         XpReward    = 0;
        public string      ItemReward  = "";
        public DateTime    ExpiresAt   = DateTime.UtcNow.AddDays(1);

        public float Progress => Target > 0 ? (float)Current / Target : 0f;
        public bool  IsComplete => Current >= Target;
        public bool  IsExpired  => DateTime.UtcNow > ExpiresAt;

        public void Increment(int amount = 1)
        {
            Current = Math.Min(Current + amount, Target);
            if (IsComplete && Status == QuestStatus.Active)
                Status = QuestStatus.Completed;
        }
    }
}
