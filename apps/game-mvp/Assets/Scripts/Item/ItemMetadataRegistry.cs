using System.Collections.Generic;
using UnityEngine;

namespace Item
{
    [CreateAssetMenu(fileName = "Item Metadata Registry", menuName = "Items/Item Metadata Registry")]
    public class ItemMetadataRegistry : ScriptableObject
    {
        [System.Serializable]
        public struct MetadataEntry
        {
            public string metadataID;
            public ItemData item;
        }

        [SerializeField]
        private List<MetadataEntry> entries = new List<MetadataEntry>();

        public ItemData GetItemByMetadataID(string metadataID)
        {
            if (string.IsNullOrEmpty(metadataID)) return null;

            foreach (var entry in entries)
            {
                if (entry.metadataID == metadataID)
                {
                    return entry.item;
                }
            }

            return null;
        }

        // Helper for editor setup
        public void AddEntry(string metadataID, ItemData item)
        {
            entries.Add(new MetadataEntry { metadataID = metadataID, item = item });
        }
    }
}
