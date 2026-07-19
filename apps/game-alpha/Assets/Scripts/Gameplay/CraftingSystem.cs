using System;
using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Models;
using Lifetopia.Managers;
using Lifetopia.Events;

namespace Lifetopia.Gameplay
{
    [Serializable]
    public class CraftingRecipe
    {
        public string              RecipeId    = "";
        public string              OutputItemId= "";
        public int                 OutputQty   = 1;
        public List<CraftIngredient> Ingredients = new List<CraftIngredient>();
        public int                 GoldCost    = 0;
        public float               CraftTime   = 0f;
    }

    [Serializable]
    public class CraftIngredient
    {
        public string ItemId = "";
        public int    Qty    = 1;
    }

    /// <summary>
    /// Crafting system — combine items untuk buat item baru.
    /// </summary>
    public class CraftingSystem : MonoBehaviour
    {
        public static CraftingSystem Instance { get; private set; }

        readonly List<CraftingRecipe> _recipes = new List<CraftingRecipe>();

        public event Action<string> OnCraftSuccess;
        public event Action<string> OnCraftFailed;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        void Start() => RegisterDefaultRecipes();

        void RegisterDefaultRecipes()
        {
            _recipes.Add(new CraftingRecipe
            {
                RecipeId     = "recipe_fertilizer",
                OutputItemId = "item_fertilizer",
                OutputQty    = 1,
                Ingredients  = new List<CraftIngredient>
                {
                    new CraftIngredient { ItemId = "crop_wheat",  Qty = 3 },
                    new CraftIngredient { ItemId = "crop_carrot", Qty = 2 },
                },
                GoldCost = 5,
            });
        }

        public void AddRecipe(CraftingRecipe recipe)
        {
            if (recipe != null) _recipes.Add(recipe);
        }

        public bool CanCraft(string recipeId)
        {
            var recipe = GetRecipe(recipeId);
            if (recipe == null) return false;

            var inv = InventoryManager.Instance;
            if (inv == null) return false;

            foreach (var ing in recipe.Ingredients)
                if (!inv.Has(ing.ItemId, ing.Qty)) return false;

            if (recipe.GoldCost > 0)
                if (!Currency.CurrencyService.Instance?.CanAfford(recipe.GoldCost) ?? true)
                    return false;

            return true;
        }

        public bool Craft(string recipeId)
        {
            if (!CanCraft(recipeId))
            {
                OnCraftFailed?.Invoke(recipeId);
                Systems.NotificationSystem.Instance?.ShowError("Cannot craft — missing ingredients!");
                return false;
            }

            var recipe = GetRecipe(recipeId);
            var inv    = InventoryManager.Instance;

            foreach (var ing in recipe.Ingredients)
                inv.Remove(ing.ItemId, ing.Qty);

            if (recipe.GoldCost > 0)
                Currency.CurrencyService.Instance?.Spend(recipe.GoldCost, "crafting");

            inv.Add(recipe.OutputItemId, recipe.OutputQty);
            OnCraftSuccess?.Invoke(recipeId);
            Systems.NotificationSystem.Instance?.ShowSuccess($"Crafted {recipe.OutputItemId}!");
            return true;
        }

        public CraftingRecipe GetRecipe(string id) =>
            _recipes.Find(r => r.RecipeId == id);

        public List<CraftingRecipe> GetAllRecipes() =>
            new List<CraftingRecipe>(_recipes);

        public List<CraftingRecipe> GetCraftableRecipes()
        {
            var result = new List<CraftingRecipe>();
            foreach (var r in _recipes)
                if (CanCraft(r.RecipeId)) result.Add(r);
            return result;
        }
    }
}
