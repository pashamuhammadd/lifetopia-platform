namespace Lifetopia.Interfaces
{
    public interface IUIScreen
    {
        string ScreenId { get; }
        void Show();
        void Hide();
        bool IsVisible { get; }
    }
}
