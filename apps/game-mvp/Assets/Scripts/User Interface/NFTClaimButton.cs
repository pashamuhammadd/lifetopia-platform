using Item;
using Item.Inventory;
using Referencing.Scriptable_Reference;
using Solana_Integration;
using UnityEngine;
using UnityEngine.UI;
using Solana.Unity.SDK;

namespace User_Interface
{
    /// <summary>
    /// Demonstrates a dynamic claim flow:
    /// 1. Mints an NFT via Solana.
    /// 2. Receives Metadata ID from the NFT.
    /// 3. Looks up ItemData in the Registry.
    /// 4. Adds item to Player Inventory.
    /// </summary>
    public class NFTClaimButton : MonoBehaviour
    {
        [Header("References")]
        [SerializeField] private ScriptableReference playerReference;
        [SerializeField] private ItemMetadataRegistry itemRegistry;

        [Header("Config")]
        [SerializeField, Tooltip("A key to pass to the service (e.g., 'starter')")]
        private string packKey = "starter";

        private Button button;
        private Text buttonText;

        private void Awake()
        {
            button = GetComponent<Button>();
            buttonText = GetComponentInChildren<Text>();
            if (button != null)
            {
                button.onClick.AddListener(OnClaimRequest);
            }
            
            // Listen for wallet connection to check status
            Web3.OnLogin += OnWalletConnected;
        }

        private void Start()
        {
            // Set inactive initially as requested
            gameObject.SetActive(false);
            
            // If already logged in, check immediately
            if (Web3.Account != null)
            {
                OnWalletConnected(Web3.Account);
            }
        }

        private void OnDestroy()
        {
            Web3.OnLogin -= OnWalletConnected;
        }

        private async void OnWalletConnected(Solana.Unity.Wallet.Account account)
        {
            Debug.Log($"[NFTClaimButton] Wallet connected: {account.PublicKey}. Checking mint status...");
            bool alreadyMinted = await SolanaNFTService.CheckIfMintedAsync();
            
            Debug.Log($"[NFTClaimButton] Already minted: {alreadyMinted}");
            
            // Show only if NOT minted
            if (this != null && gameObject != null)
            {
                gameObject.SetActive(!alreadyMinted);
            }
        }

        private async void OnClaimRequest()
        {
            if (button != null) button.interactable = false;
            if (buttonText != null) buttonText.text = "Minting...";

            Debug.Log($"[NFTClaimButton] Requesting Solana mint for: {packKey}...");

            // 1. Perform Real Minting (Async)
            var result = await SolanaNFTService.MintNFTAsync(packKey);

            if (!result.success)
            {
                Debug.LogError("[NFTClaimButton] Minting failed: " + result.error);
                if (buttonText != null) buttonText.text = "Claim NFT";
                if (button != null) button.interactable = true;
                return;
            }

            Debug.Log($"[NFTClaimButton] Mint Success! TX: {result.transactionHash}");

            // 2. Resolve Item ID from Metadata
            // string itemId = await SolanaNFTService.ResolveItemIdFromMint(result.mintAddress); // skip this, need to lot debug on prodc
            string itemId = "starter_box_base";
            ItemData item = itemRegistry.GetItemByMetadataID(itemId);

            if (item == null)
            {
                Debug.LogWarning($"[NFTClaimButton] No Item found for mintAddress: {result.mintAddress}");
                if (buttonText != null) buttonText.text = "Claim NFT";
                if (button != null) button.interactable = true;
                return;
            }

            // 3. Add to Inventory
            if (playerReference != null && playerReference.Reference != null)
            {
                Inventory inventory = playerReference.Reference.GetComponent<Inventory>();
                if (inventory != null)
                {
                    bool added = inventory.AddItem(item, 1);
                    if (added)
                    {
                        Debug.Log($"[NFTClaimButton] Successfully claimed {item.ItemName} via NFT!");
                        this.gameObject.SetActive(false); // Hide button after success
                    }
                    else
                    {
                        Debug.LogWarning("[NFTClaimButton] Inventory full!");
                        if (buttonText != null) buttonText.text = "Claim NFT (Inventory Full)";
                        if (button != null) button.interactable = true;
                    }
                }
            }
            else
            {
                Debug.LogError("[NFTClaimButton] Player reference missing!");
                if (buttonText != null) buttonText.text = "Claim NFT";
                if (button != null) button.interactable = true;
            }
        }
    }
}
