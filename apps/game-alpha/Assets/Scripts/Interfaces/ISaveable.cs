namespace Lifetopia.Interfaces
{
    public interface ISaveable
    {
        string GetSaveKey();
        string Serialize();
        void   Deserialize(string json);
    }
}
