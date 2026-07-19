namespace Lifetopia.Interfaces
{
    public interface IInitializable
    {
        void Initialize();
        bool IsInitialized { get; }
    }
}
