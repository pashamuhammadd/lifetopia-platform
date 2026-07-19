using UnityEngine;

namespace Lifetopia.Interfaces
{
    public interface IPlayer
    {
        string PlayerId   { get; }
        string PlayerName { get; }
        int    Level      { get; }
        int    Gold       { get; }
        Vector3 Position  { get; }
        void Move(Vector2 direction);
        void TakeDamage(int amount);
    }
}
