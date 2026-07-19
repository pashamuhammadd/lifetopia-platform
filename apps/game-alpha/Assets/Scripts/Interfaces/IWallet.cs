using System;

namespace Lifetopia.Interfaces
{
    public interface IWallet
    {
        string PublicKey    { get; }
        bool   IsConnected  { get; }
        void   Connect(Action<string> onSuccess, Action<string> onError);
        void   Disconnect();
    }
}
