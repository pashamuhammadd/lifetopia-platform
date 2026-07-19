using UnityEngine;

public enum PlotState { Empty, Growing, Ready }

/// <summary>Single tile farming: plant → grow → harvest matching GDD timings (scaled for testing).</summary>
public class FarmPlot : MonoBehaviour
{
    [Header("Grow time seconds (120 = wheat in GDD)")]
    public float wheatGrowSeconds = 120f;
    public float tomatoGrowSeconds = 180f;
    public float carrotGrowSeconds = 150f;
    public float pumpkinGrowSeconds = 240f;

    public string PlantedCropId { get; private set; }
    public PlotState State { get; private set; } = PlotState.Empty;
    float _plantedAtRealtime;
    SpriteRenderer _sr;

    void Awake()
    {
        _sr = GetComponent<SpriteRenderer>();
        if (_sr == null) _sr = gameObject.AddComponent<SpriteRenderer>();
        _sr.sortingOrder = 5;
    }

    void Update()
    {
        if (State != PlotState.Growing || string.IsNullOrEmpty(PlantedCropId)) return;

        float need = GrowTimeFor(PlantedCropId) / Mathf.Max(0.01f, GetSpeedMult());
        if (Time.realtimeSinceStartup - _plantedAtRealtime >= need)
        {
            State = PlotState.Ready;
            RefreshVisual();
        }
    }

    float GetSpeedMult()
    {
        var gs = LifetopiaGameState.Instance;
        return gs != null ? gs.FarmingSpeedMultiplier : 1f;
    }

    float GrowTimeFor(string seedId)
    {
        switch (seedId)
        {
            case "seed_tomato": return tomatoGrowSeconds;
            case "seed_carrot": return carrotGrowSeconds;
            case "seed_pumpkin": return pumpkinGrowSeconds;
            default: return wheatGrowSeconds;
        }
    }

    public bool TryPlant(string seedId)
    {
        if (State != PlotState.Empty) return false;

        var gs = LifetopiaGameState.Instance;
        if (gs == null) return false;
        if (!gs.InventoryTrySpend(seedId, 1))
            return false;

        PlantedCropId = seedId;
        State = PlotState.Growing;
        _plantedAtRealtime = Time.realtimeSinceStartup;
        gs.IncPlantQuest();
        RefreshVisual();
        return true;
    }

    public bool TryHarvest(out int goldEarned)
    {
        goldEarned = 0;
        if (State != PlotState.Ready || string.IsNullOrEmpty(PlantedCropId)) return false;

        string cropKey = CropKeyFromSeed(PlantedCropId);
        float yieldMul = LifetopiaGameState.Instance != null ? LifetopiaGameState.Instance.HarvestYieldMultiplier : 1f;

        goldEarned = Mathf.RoundToInt(BaseGoldReward(PlantedCropId) * yieldMul);

        LifetopiaGameState.Instance?.GrantGold(goldEarned);
        int cropStacks = Mathf.Max(1, Mathf.RoundToInt(yieldMul));
        LifetopiaGameState.Instance?.InventoryAdd(cropKey, cropStacks);
        LifetopiaGameState.Instance?.IncHarvestQuest();

        PlantedCropId = null;
        State = PlotState.Empty;
        RefreshVisual();
        return true;
    }

    static int BaseGoldReward(string seedId)
    {
        switch (seedId)
        {
            case "seed_tomato": return 8;
            case "seed_carrot": return 6;
            case "seed_pumpkin": return 12;
            default: return 5;
        }
    }

    static string CropKeyFromSeed(string seedId)
    {
        if (seedId == "seed_tomato") return "crop_tomato";
        if (seedId == "seed_carrot") return "crop_carrot";
        if (seedId == "seed_pumpkin") return "crop_pumpkin";
        return "crop_wheat";
    }

    void RefreshVisual()
    {
        if (_sr == null) return;

        if (State == PlotState.Empty)
            _sr.color = new Color(0.35f, 0.22f, 0.11f);
        else if (State == PlotState.Growing)
            _sr.color = new Color(0.35f, 0.52f, 0.18f);
        else
            _sr.color = new Color(0.93f, 0.79f, 0.22f);
    }
}
