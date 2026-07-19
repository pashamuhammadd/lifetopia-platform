namespace Lifetopia.Interfaces
{
    public interface IService
    {
        void StartService();
        void StopService();
        bool IsRunning { get; }
    }
}
