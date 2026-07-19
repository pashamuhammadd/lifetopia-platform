using UnityEngine;
using Lifetopia.Events;
using Lifetopia.Managers;
using Lifetopia.Rewards;

namespace Lifetopia.Mechanics
{
    /// <summary>
    /// Farming mechanic — plant, grow, harvest.
    /// Koordinasi antara FarmPlot, InventoryManager, RewardService.
    /// </summary>
    public class FarmingMechanic : MonoBehaviour
    {
        public static FarmingMechanic Instance { get; private set; }

        [Header("Grow Time Multiplier")]
        [Tooltip("1 = normal, 0.5 = 2x faster")]
        public float growTimeMultiplier = 1f;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
        }

        // ── Plant ─────────────────────────────────────────────────────────────

        public bool TryPlant(FarmPlot plot, string seedId)
        {
            if (plot == null || plot.State != PlotState.Empty) return false;

            var inv = InventoryManager.Instance;
            if (inv == null || !inv.Has(seedId, 1))
            {
                Systems.NotificationSystem.Instance?.ShowError("No seeds!");
                return false;
            }

            inv.Remove(seedId, 1);
            plot.TryPlant(seedId);

            GameEventBus.Publish(new CropPlantedEvent
            {
                SeedId    = seedId,
                PlotIndex = plot.transform.GetSiblingIndex(),
            });

            Systems.NotificationSystem.Instance?.Show($"Planted {seedId.Replace("seed_", "")}! 🌱");
            return true;
        }

        // ── Harvest ───────────────────────────────────────────────────────────

        public bool TryHarvest(FarmPlot plot)
        {
            if (plot == null || plot.State != PlotState.Ready) return false;

            float yieldMult = GetYieldMultiplier();
            bool ok = plot.TryHarvest(out int gold);

            if (ok)
            {
                string cropId = "crop_" + (plot.PlantedCropId ?? "wheat").Replace("seed_", "");
                RewardService.Instance?.GrantHarvestReward(cropId, yieldMult);

                GameEventBus.Publish(new CropHarvestedEvent
                {
                    CropId     = cropId,
                    GoldEarned = gold,
                });
            }

            return ok;
        }

        // ── Helpers ───────────────────────────────────────────────────────────

        float GetYieldMultiplier()
        {
            // NFT boost dari Web3Service
            var wallet = Web3.Web3Service.Instance?.CurrentWallet;
            return wallet != null && wallet.IsChainVerified ? 1.1f : 1f;
        }

        public float GetGrowTimeMultiplier()
        {
            var wallet = Web3.Web3Service.Instance?.CurrentWallet;
            float nftBoost = wallet != null && wallet.IsChainVerified ? 0.88f : 1f;
            return growTimeMultiplier * nftBoost;
        }
    }
}
