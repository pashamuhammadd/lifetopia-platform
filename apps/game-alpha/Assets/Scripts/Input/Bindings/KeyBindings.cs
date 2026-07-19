using UnityEngine;
using Lifetopia.SaveSystem;

namespace Lifetopia.Input.Bindings
{
    /// <summary>
    /// Rebindable key bindings — semua key bisa diubah dari settings.
    /// Disimpan ke PlayerPrefs.
    /// </summary>
    [System.Serializable]
    public class KeyBindings
    {
        public KeyCode MoveLeft    = KeyCode.A;
        public KeyCode MoveRight   = KeyCode.D;
        public KeyCode MoveUp      = KeyCode.W;
        public KeyCode MoveDown    = KeyCode.S;
        public KeyCode Jump        = KeyCode.Space;
        public KeyCode Run         = KeyCode.LeftShift;
        public KeyCode Interact    = KeyCode.E;
        public KeyCode Attack      = KeyCode.Mouse0;
        public KeyCode Pause       = KeyCode.Escape;
        public KeyCode Inventory   = KeyCode.I;
        public KeyCode Map         = KeyCode.M;
        public KeyCode Boost       = KeyCode.B;
        public KeyCode Fish        = KeyCode.R;
        public KeyCode PickUp      = KeyCode.F;
        public KeyCode Throw       = KeyCode.G;

        const string SAVE_KEY = "lf_keybindings";

        public static KeyBindings Load()
        {
            string json = PlayerPrefs.GetString(SAVE_KEY, "");
            if (string.IsNullOrEmpty(json)) return new KeyBindings();
            try { return JsonUtility.FromJson<KeyBindings>(json); }
            catch { return new KeyBindings(); }
        }

        public void Save()
        {
            PlayerPrefs.SetString(SAVE_KEY, JsonUtility.ToJson(this));
            PlayerPrefs.Save();
        }

        public void ResetToDefaults()
        {
            var defaults = new KeyBindings();
            MoveLeft  = defaults.MoveLeft;
            MoveRight = defaults.MoveRight;
            MoveUp    = defaults.MoveUp;
            MoveDown  = defaults.MoveDown;
            Jump      = defaults.Jump;
            Run       = defaults.Run;
            Interact  = defaults.Interact;
            Save();
        }
    }
}
