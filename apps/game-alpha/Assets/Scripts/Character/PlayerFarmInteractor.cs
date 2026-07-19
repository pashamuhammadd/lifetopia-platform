using UnityEngine;

/// <summary>Uses selected hotbar seed + E to plant / harvest nearest plot.</summary>
public class PlayerFarmInteractor : MonoBehaviour
{
    public float interactRadius = 1.8f;
    public string SelectedSeedId = "seed_wheat";

    void Update()
    {
        HotbarAndKeys.TickKeyboardSeeds(this);

        if (!UnityEngine.Input.GetKeyDown(KeyCode.E)) return;

        FarmPlot plot = FindNearestPlot();
        if (plot == null) return;

        if (plot.State == PlotState.Empty)
        {
            if (LifetopiaGameState.Instance != null &&
                LifetopiaGameState.Instance.InventoryGet(SelectedSeedId, out int q) && q > 0)
            {
                plot.TryPlant(SelectedSeedId);
            }
        }
        else if (plot.State == PlotState.Ready)
        {
            plot.TryHarvest(out _);
        }
    }

    FarmPlot FindNearestPlot()
    {
        FarmPlot[] plots = FindObjectsOfType<FarmPlot>();
        FarmPlot best = null;
        float bestD = interactRadius;
        Vector2 p = transform.position;
        foreach (var plot in plots)
        {
            float d = Vector2.Distance(p, plot.transform.position);
            if (d < bestD)
            {
                bestD = d;
                best = plot;
            }
        }
        return best;
    }
}
