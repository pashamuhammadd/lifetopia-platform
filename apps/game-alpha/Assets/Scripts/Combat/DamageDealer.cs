using UnityEngine;

namespace Lifetopia.Combat
{
    /// <summary>
    /// Deals damage on trigger/collision.
    /// Attach ke projectile atau melee hitbox.
    /// </summary>
    public class DamageDealer : MonoBehaviour
    {
        [Header("Damage")]
        public int   damage        = 10;
        public float knockbackForce= 3f;
        public bool  destroyOnHit  = true;
        public bool  hitPlayer     = false;
        public bool  hitEnemy      = true;

        [Header("Tags")]
        public string playerTag = "Player";
        public string enemyTag  = "Enemy";

        public System.Action<GameObject, int> OnHit;

        void OnTriggerEnter2D(Collider2D other)
        {
            bool isPlayer = other.CompareTag(playerTag);
            bool isEnemy  = other.CompareTag(enemyTag);

            if ((!hitPlayer && isPlayer) || (!hitEnemy && isEnemy)) return;
            if (!isPlayer && !isEnemy) return;

            var health = other.GetComponent<HealthSystem>();
            if (health == null) return;

            health.TakeDamage(damage);
            OnHit?.Invoke(other.gameObject, damage);

            // Knockback
            var rb = other.GetComponent<Rigidbody2D>();
            if (rb != null)
            {
                Vector2 dir = (other.transform.position - transform.position).normalized;
                rb.AddForce(dir * knockbackForce, ForceMode2D.Impulse);
            }

            if (destroyOnHit) Destroy(gameObject);
        }
    }
}
