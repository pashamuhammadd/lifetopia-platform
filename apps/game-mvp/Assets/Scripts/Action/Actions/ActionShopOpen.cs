using UnityEngine;

namespace Action.Actions
{
    [CreateAssetMenu(menuName = "Actions/Shop Open")]
    public class ActionShopOpen : ScriptableObject
    {
        public static event System.Action OnShopOpen;

        public void Execute(bool state)
        {
            Debug.Log("[ActionShopOpen] Execute called!");
            if (state)
                OnShopOpen?.Invoke();
        }
    }
}
