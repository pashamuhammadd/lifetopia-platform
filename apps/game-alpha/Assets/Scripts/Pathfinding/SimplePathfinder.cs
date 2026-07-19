using System.Collections.Generic;
using UnityEngine;

namespace Lifetopia.Pathfinding
{
    /// <summary>
    /// Simple waypoint-based pathfinder untuk 2D.
    /// Tidak butuh NavMesh. Cocok untuk NPC di side-scroller.
    /// </summary>
    public class SimplePathfinder : MonoBehaviour
    {
        [Header("Path")]
        public List<Transform> waypoints = new List<Transform>();
        public float           speed     = 2f;
        public bool            loop      = true;
        public bool            pingPong  = false;

        int  _index     = 0;
        int  _direction = 1;
        bool _reached   = false;

        public bool IsMoving => !_reached && waypoints.Count > 0;

        void Update()
        {
            if (waypoints.Count == 0) return;
            MoveToNext();
        }

        void MoveToNext()
        {
            if (_index >= waypoints.Count || waypoints[_index] == null) return;

            Vector3 target = waypoints[_index].position;
            transform.position = Vector3.MoveTowards(
                transform.position, target, speed * Time.deltaTime);

            if (Vector3.Distance(transform.position, target) < 0.05f)
                AdvanceIndex();
        }

        void AdvanceIndex()
        {
            if (pingPong)
            {
                _index += _direction;
                if (_index >= waypoints.Count - 1 || _index <= 0)
                    _direction *= -1;
            }
            else
            {
                _index++;
                if (_index >= waypoints.Count)
                {
                    if (loop) _index = 0;
                    else { _index = waypoints.Count - 1; _reached = true; }
                }
            }
        }

        public void SetPath(List<Transform> path)
        {
            waypoints = path;
            _index    = 0;
            _reached  = false;
        }

        public void Stop()  => _reached = true;
        public void Resume()=> _reached = false;
    }
}
