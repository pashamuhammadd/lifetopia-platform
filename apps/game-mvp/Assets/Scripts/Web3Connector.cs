using UnityEngine;
using UnityEngine.SceneManagement;
using Solana.Unity.SDK;
using Solana.Unity.Wallet;

/// <summary>
/// Persistent singleton that survives scene loads.
/// Manages wallet session and handles scene transitions on login/logout.
/// Place this GameObject in MenuScene only — it will carry itself forward automatically.
/// Attach WalletUI.cs separately to the MenuScene UI.
/// </summary>
public class Web3Connector : MonoBehaviour
{
    public static Web3Connector Instance { get; private set; }

    [Tooltip("Scene to load after a successful wallet login.")]
    [SerializeField] public string gameSceneName = "Core";

    [Tooltip("Scene to return to when the wallet disconnects.")]
    [SerializeField] private string menuSceneName = "StartMenu";

    // Devnet in-game wallet credentials (Editor only)
    [SerializeField] public string privateKey = "vswvLJGPgNYZZJAkiJFCEZC5bocZQ1PphUKdLmKqUKc3bsm8QRWCqVPrBsym2bFJ4FFkFpu3LncyPtLuByxVp5o";
    [SerializeField] public string password = "passwordnya2105";

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject);
    }

    private void OnEnable()
    {
        Web3.OnLogin += OnLogin;
        Web3.OnLogout += OnLogout;
    }

    private void OnDisable()
    {
        Web3.OnLogin -= OnLogin;
        Web3.OnLogout -= OnLogout;
    }

    private void OnLogin(Account obj)
    {
        // Scene loading is handled by WalletAutoGameStarter,
        // which writes save metadata before loading the game scene.
    }

    private void OnLogout()
    {
        SceneManager.LoadScene(menuSceneName);
    }
}


