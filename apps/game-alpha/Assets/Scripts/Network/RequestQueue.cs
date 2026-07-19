using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Lifetopia.Network
{
    /// <summary>
    /// Antrian request HTTP — mencegah spam request ke server.
    /// Request diproses satu per satu dengan delay opsional.
    /// </summary>
    public class RequestQueue : MonoBehaviour
    {
        public static RequestQueue Instance { get; private set; }

        [Header("Settings")]
        public float delayBetweenRequests = 0.1f;
        public int   maxRetries           = 3;

        readonly Queue<Func<IEnumerator>> _queue = new Queue<Func<IEnumerator>>();
        bool _isProcessing = false;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public void Enqueue(Func<IEnumerator> request)
        {
            _queue.Enqueue(request);
            if (!_isProcessing)
                StartCoroutine(ProcessQueue());
        }

        IEnumerator ProcessQueue()
        {
            _isProcessing = true;
            while (_queue.Count > 0)
            {
                var req = _queue.Dequeue();
                yield return StartCoroutine(req());
                if (delayBetweenRequests > 0f)
                    yield return new WaitForSeconds(delayBetweenRequests);
            }
            _isProcessing = false;
        }

        public void ClearQueue()
        {
            _queue.Clear();
            StopAllCoroutines();
            _isProcessing = false;
        }

        public int PendingCount => _queue.Count;
    }
}
