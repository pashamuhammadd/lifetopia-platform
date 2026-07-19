using System.Collections.Generic;
using UnityEngine;
using Lifetopia.Interfaces;

namespace Lifetopia.Managers
{
    /// <summary>
    /// Manages semua UI screens — show/hide dengan stack navigation.
    /// </summary>
    public class UIManager : MonoBehaviour
    {
        public static UIManager Instance { get; private set; }

        readonly Dictionary<string, IUIScreen> _screens = new Dictionary<string, IUIScreen>();
        readonly Stack<string> _history = new Stack<string>();

        string _current = "";

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public void Register(IUIScreen screen)
        {
            if (!_screens.ContainsKey(screen.ScreenId))
                _screens[screen.ScreenId] = screen;
        }

        public void Unregister(string screenId) =>
            _screens.Remove(screenId);

        public void Show(string screenId, bool addToHistory = true)
        {
            if (!_screens.TryGetValue(screenId, out var screen)) return;

            if (!string.IsNullOrEmpty(_current) && addToHistory)
                _history.Push(_current);

            _current = screenId;
            screen.Show();
        }

        public void Hide(string screenId)
        {
            if (_screens.TryGetValue(screenId, out var screen))
                screen.Hide();
            if (_current == screenId) _current = "";
        }

        public void HideAll()
        {
            foreach (var s in _screens.Values) s.Hide();
            _current = "";
            _history.Clear();
        }

        public void Back()
        {
            if (_history.Count == 0) return;
            Hide(_current);
            Show(_history.Pop(), false);
        }

        public bool IsVisible(string screenId) =>
            _screens.TryGetValue(screenId, out var s) && s.IsVisible;
    }
}
