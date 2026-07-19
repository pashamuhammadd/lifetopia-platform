using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using Solana.Unity.SDK;
using Solana.Unity.Wallet;
using TMPro;

/// <summary>
/// Persistent wallet UI prefab — place in MenuScene only, carries to all scenes.
/// Also persists the EventSystem so buttons remain clickable after scene transitions.
/// </summary>
public class WalletConnect : MonoBehaviour
{
    [SerializeField] private Button btnConnect;

    private void Awake()
    {
        btnConnect = GameObject.Find("ConnectButton").GetComponent<Button>();
    }

    private void Start()
    {
        var label = btnConnect.GetComponentInChildren<TextMeshProUGUI>();

        if (Web3.Wallet != null)
        {
            // Already connected — show "Play" and go straight to game on click
            if (label != null) label.text = "Play";
            btnConnect.onClick.AddListener(() =>
            {
                SceneManager.LoadScene(Web3Connector.Instance.gameSceneName);
            });
            return;
        }

        // Not connected — normal connect flow
        if (label != null) label.text = "Connect Wallet";

#if UNITY_EDITOR
        btnConnect.onClick.AddListener(() =>
        {
            Web3.Instance.CreateAccount(
                Web3Connector.Instance.privateKey,
                Web3Connector.Instance.password
            );
        });
#else
        btnConnect.onClick.AddListener(() => { Web3.Instance.LoginWithWalletAdapter(); });
#endif
        btnConnect.onClick.AddListener(() =>
        {
            btnConnect.GetComponentInChildren<TextMeshProUGUI>().text = "Connecting ...";
        });
    }

    
}
