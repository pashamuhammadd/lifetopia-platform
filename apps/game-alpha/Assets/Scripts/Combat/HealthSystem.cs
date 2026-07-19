using System;
using UnityEngine;
using Lifetopia.Events;

namespace Lifetopia.Combat
{
    /// <summary>
    /// Health system — HP, damage, heal, death.
    /// Attach ke player atau enemy.
    /// </summary>
    public class HealthSystem : MonoBehaviour
    {
        [Header("Stats")]
        public int maxHp      = 100;
        public int currentHp  = 100;
        public bool isInvincible = false;

        [Header("Invincibility Frames")]
        public float iFrameDuration = 0.5f;

        public bool  IsAlive  => currentHp > 0;
        public float HpRatio  => maxHp > 0 ? (float)currentHp / maxHp : 0f;

        public event Action<int, int> OnHpChanged;   // (current, max)
        public event Action<int>      OnDamaged;      // amount
        public event Action<int>      OnHealed;       // amount
        public event Action           OnDied;

        float _iFrameTimer;

        void Update()
        {
            if (_iFrameTimer > 0f) _iFrameTimer -= Time.deltaTime;
        }

        // ── Damage ────────────────────────────────────────────────────────────

        public bool TakeDamage(int amount)
        {
            if (!IsAlive || isInvincible || _iFrameTimer > 0f) return false;
            if (amount <= 0) return false;

            currentHp = Mathf.Max(0, currentHp - amount);
            _iFrameTimer = iFrameDuration;

            OnDamaged?.Invoke(amount);
            OnHpChanged?.Invoke(currentHp, maxHp);

            if (currentHp <= 0)
            {
                OnDied?.Invoke();
                GameEventBus.Publish(new PlayerDiedEvent());
            }

            return true;
        }

        // ── Heal ──────────────────────────────────────────────────────────────

        public void Heal(int amount)
        {
            if (!IsAlive || amount <= 0) return;
            int old = currentHp;
            currentHp = Mathf.Min(maxHp, currentHp + amount);
            int actual = currentHp - old;
            if (actual > 0)
            {
                OnHealed?.Invoke(actual);
                OnHpChanged?.Invoke(currentHp, maxHp);
            }
        }

        public void HealFull() => Heal(maxHp);

        // ── Utility ───────────────────────────────────────────────────────────

        public void SetMaxHp(int max, bool healToFull = false)
        {
            maxHp = Mathf.Max(1, max);
            if (healToFull) currentHp = maxHp;
            currentHp = Mathf.Min(currentHp, maxHp);
            OnHpChanged?.Invoke(currentHp, maxHp);
        }

        public void Revive(int hp = -1)
        {
            currentHp = hp < 0 ? maxHp : Mathf.Clamp(hp, 1, maxHp);
            OnHpChanged?.Invoke(currentHp, maxHp);
        }
    }
}
