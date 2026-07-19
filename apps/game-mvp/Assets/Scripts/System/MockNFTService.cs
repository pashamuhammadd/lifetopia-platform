using System;
using System.Collections;
using System.Threading.Tasks;
using UnityEngine;

namespace System_Mock
{
    /// <summary>
    /// A mockup service to simulate NFT minting and metadata retrieval.
    /// In a real scenario, this would interface with a Web3 SDK.
    /// </summary>
    public static class MockNFTService
    {
        public struct MintResult
        {
            public bool success;
            public string metadataID; // e.g., "starter_pack_v1"
            public string transactionHash;
        }

        /// <summary>
        /// Simulates the minting process and returns a metadata ID based on a key.
        /// </summary>
        public static async Task<MintResult> MintNFTAsync(string packKey)
        {
            // Simulate network delay
            await Task.Delay(1500);

            // Mock logic: return a metadata ID based on what we "minted"
            string metadataID = "";
            
            switch (packKey.ToLower())
            {
                case "starter":
                    metadataID = "starter_box_base";
                    break;
                case "premium":
                    metadataID = "premium_box_gold";
                    break;
                default:
                    metadataID = "unknown_item";
                    break;
            }

            return new MintResult
            {
                success = true,
                metadataID = metadataID,
                transactionHash = "0x" + Guid.NewGuid().ToString("N")
            };
        }
    }
}
