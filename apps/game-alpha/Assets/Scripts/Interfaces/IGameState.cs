namespace Lifetopia.Interfaces
{
    public interface IGameState
    {
        string StateName { get; }
        void OnEnter();
        void OnExit();
        void OnUpdate();
    }
}
