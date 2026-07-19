using UnityEngine;
using UnityEngine.SceneManagement;
using Solana.Unity.SDK;

/// <summary>
/// Attach this to any scene that requires a connected wallet.
/// If the wallet is not connected on scene load, or disconnects mid-scene,
/// the player is automatically sent back to the MenuScene.
/// </summary>
public class WalletGuard : MonoBehaviour
{
    [Tooltip("Exact scene name to redirect to when wallet is disconnected.")]
    [SerializeField] private string menuSceneName = "MenuScene";

    private void Start()
    {
        // If we arrived here without a connected wallet, go back immediately
        if (Web3.Wallet == null)
        {
            RedirectToMenu();
            return;
        }

        Web3.OnLogout += OnLogout;
    }

    private void OnDestroy()
    {
        Web3.OnLogout -= OnLogout;
    }

    private void OnLogout()
    {
        RedirectToMenu();
    }

    private void RedirectToMenu()
    {
        Web3.OnLogout -= OnLogout;
        SceneManager.LoadScene(menuSceneName);
    }

    public void DisconnectWallet()
    {
        Web3.Instance.Logout();
    }
}
