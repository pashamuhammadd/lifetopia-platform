using UnityEngine;
using Lifetopia.Gameplay;
using Lifetopia.Mechanics;

namespace Lifetopia.Controllers
{
    /// <summary>
    /// Shop trigger — player mendekat dan tekan E untuk buka toko.
    /// Attach ke shop sign atau NPC.
    /// </summary>
    public class ShopController : MonoBehaviour, IInteractable
    {
        [Header("Shop")]
        public string shopId   = "shop_main";
        public string shopName = "General Store";

        [Header("Interact")]
        public string promptText = "Press E to open shop";

        ShopSystem _shop;

        public bool   CanInteract    => true;
        public string InteractPrompt => promptText;

        void Awake()
        {
            _shop = GetComponent<ShopSystem>() ?? gameObject.AddComponent<ShopSystem>();
            _shop.ShopId   = shopId;
            _shop.ShopName = shopName;
        }

        public void Interact(GameObject interactor)
        {
            _shop.OpenShop();
            Systems.NotificationSystem.Instance?.Show($"Welcome to {shopName}!");
        }
    }
}
