using Solana.Unity.SDK;
using TMPro;
using UnityEngine;

/// <summary>
/// Attach directly to the GameObject that has a TMP_Text component.
/// Reads player name and farm name from PlayerSession (set by WalletAutoGameStarter
/// before the scene loads — no async IO, always available immediately).
/// </summary>
public class UserInfo : MonoBehaviour
{
    private TMP_Text _text;
    private string _balance = "...";

    private void Awake()
    {
        _text = gameObject.GetComponent<TMP_Text>();
    }

    private void Start()
    {
        Web3.OnBalanceChange += OnBalanceChange;
        Refresh();
    }

    private void OnDestroy()
    {
        Web3.OnBalanceChange -= OnBalanceChange;
    }

    private void OnBalanceChange(double balance)
    {
        _balance = balance.ToString("F4") + " SOL";
        Refresh();
    }

    private void Refresh()
    {
        if (_text != null)
            _text.text = $"{PlayerSession.PlayerName}\n{PlayerSession.FarmName}\n{_balance}";
    }
}
