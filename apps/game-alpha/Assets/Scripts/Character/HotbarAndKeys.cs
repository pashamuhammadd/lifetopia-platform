using UnityEngine;
using UnityEngine.UI;

public static class HotbarAndKeys
{
    static readonly string[] SeedIds =
    {
        "",
        "",
        "",
        "",
        "seed_wheat",
        "seed_tomato",
        "seed_carrot",
        "seed_pumpkin",
    };

    public static void TickKeyboardSeeds(PlayerFarmInteractor p)
    {
        if (p == null) return;
        if (UnityEngine.Input.GetKeyDown(KeyCode.Alpha5) || UnityEngine.Input.GetKeyDown(KeyCode.Keypad5))
            p.SelectedSeedId = "seed_wheat";
        if (UnityEngine.Input.GetKeyDown(KeyCode.Alpha6) || UnityEngine.Input.GetKeyDown(KeyCode.Keypad6))
            p.SelectedSeedId = "seed_tomato";
        if (UnityEngine.Input.GetKeyDown(KeyCode.Alpha7) || UnityEngine.Input.GetKeyDown(KeyCode.Keypad7))
            p.SelectedSeedId = "seed_carrot";
        if (UnityEngine.Input.GetKeyDown(KeyCode.Alpha8) || UnityEngine.Input.GetKeyDown(KeyCode.Keypad8))
            p.SelectedSeedId = "seed_pumpkin";
    }

    public static void WireBottomHotbar(Transform canvasRoot, PlayerFarmInteractor p)
    {
        Transform hub = canvasRoot.Find("BottomHud");
        if (hub == null) return;

        int ix = 0;
        for (int i = 0; i < hub.childCount; i++)
        {
            Transform ch = hub.GetChild(i);
            if (!ch.name.EndsWith("_BTN")) continue;
            Button btn = ch.GetComponent<Button>();
            if (btn == null) continue;

            int slot = ix;
            ix++;

            btn.onClick.RemoveAllListeners();
            btn.onClick.AddListener(() =>
            {
                if (p == null || slot < 4) return;
                if (slot < SeedIds.Length && !string.IsNullOrEmpty(SeedIds[slot]))
                    p.SelectedSeedId = SeedIds[slot];
            });
        }
    }
}
