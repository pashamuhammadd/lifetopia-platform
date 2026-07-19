using UnityEngine;
using Lifetopia.Events;
using Lifetopia.Systems;
using Lifetopia.Currency;
using Lifetopia.Rewards;

namespace Lifetopia.Testing
{
    /// <summary>
    /// In-game test runner — tekan hotkey untuk test fitur.
    /// F1=Debug overlay, F2=+Gold, F3=+XP, F4=GameOver,
    /// F5=Notification, F6=Wallet, F7=Quests, F8=Status
    /// </summary>
    public class GameTester : MonoBehaviour
    {
#if UNITY_EDITOR || DEVELOPMENT_BUILD

        void Update()
        {
            if (UnityEngine.Input.GetKeyDown(KeyCode.F2))
            {
                CurrencyService.Instance?.Earn(100, "cheat");
                UnityEngine.Debug.Log("[Test] +100 GOLD");
            }

            if (UnityEngine.Input.GetKeyDown(KeyCode.F3))
            {
                EconomySystem.Instance?.AddXP(500);
                UnityEngine.Debug.Log("[Test] +500 XP");
            }

            if (UnityEngine.Input.GetKeyDown(KeyCode.F4))
            {
                GameEventBus.Publish(new PlayerDiedEvent());
                UnityEngine.Debug.Log("[Test] Player died");
            }

            if (UnityEngine.Input.GetKeyDown(KeyCode.F5))
            {
                NotificationSystem.Instance?.ShowSuccess("Test notification!");
                UnityEngine.Debug.Log("[Test] Notification shown");
            }

            if (UnityEngine.Input.GetKeyDown(KeyCode.F6))
            {
                Wallet.WalletManager.Instance?.ConnectPhantom();
                UnityEngine.Debug.Log("[Test] Mock wallet connect");
            }

            if (UnityEngine.Input.GetKeyDown(KeyCode.F7))
            {
                var qm = Managers.QuestManager.Instance;
                if (qm != null)
                    foreach (var q in qm.GetAll())
                        qm.Progress(q.QuestId, q.Target);
                UnityEngine.Debug.Log("[Test] All quests completed");
            }

            if (UnityEngine.Input.GetKeyDown(KeyCode.F8))
                PrintSystemStatus();
        }

        void PrintSystemStatus()
        {
            UnityEngine.Debug.Log("=== SYSTEM STATUS ===");
            UnityEngine.Debug.Log($"GameManager:      {Managers.GameManager.Instance?.IsReady}");
            UnityEngine.Debug.Log($"EconomySystem:    Gold={EconomySystem.Instance?.Gold} Level={EconomySystem.Instance?.Level}");
            UnityEngine.Debug.Log($"InventoryManager: {Managers.InventoryManager.Instance?.GetAll().Count} item types");
            UnityEngine.Debug.Log($"QuestManager:     {Managers.QuestManager.Instance?.CompletedCount()} completed");
            UnityEngine.Debug.Log($"WalletManager:    Connected={Wallet.WalletManager.Instance?.IsConnected}");
            UnityEngine.Debug.Log($"Web3Service:      {Web3.Web3Service.Instance?.CurrentWallet?.Provider}");
            UnityEngine.Debug.Log($"FlowFSM:          {LifetopiaGameFlowFsm.Instance?.Current}");
            UnityEngine.Debug.Log($"LevelFSM:         {LifetopiaLevelGameplayFsm.Instance?.State}");
            UnityEngine.Debug.Log("=====================");
        }

#endif
    }
}
