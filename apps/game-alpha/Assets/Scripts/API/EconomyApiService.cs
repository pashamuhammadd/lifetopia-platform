using System;
using System.Collections;
using UnityEngine;
using Lifetopia.Network;
using Lifetopia.Constants;

namespace Lifetopia.API
{
    /// <summary>Economy API — harga, shop, trade.</summary>
    public class EconomyApiService : MonoBehaviour
    {
        public static EconomyApiService Instance { get; private set; }

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public IEnumerator GetShopItems(
            Action<string> onSuccess, Action<string> onError = null)
        {
            yield return HttpClient.Instance?.Get(ApiEndpoints.ECONOMY_SHOP,
                onSuccess, onError);
        }

        public IEnumerator BuyItem(string itemId, int qty, string authToken,
            Action<bool> onResult, Action<string> onError = null)
        {
            HttpClient.Instance?.SetAuthToken(authToken);
            string body = $"{{\"itemId\":\"{itemId}\",\"qty\":{qty}}}";
            yield return HttpClient.Instance?.Post(ApiEndpoints.ECONOMY_TRADE, body,
                json => onResult?.Invoke(json.Contains("\"success\":true")),
                err => { onResult?.Invoke(false); onError?.Invoke(err); });
        }

        public IEnumerator GetPrices(
            Action<string> onSuccess, Action<string> onError = null)
        {
            yield return HttpClient.Instance?.Get(ApiEndpoints.ECONOMY_PRICES,
                onSuccess, onError);
        }
    }
}
