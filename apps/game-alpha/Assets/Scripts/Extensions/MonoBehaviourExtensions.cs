using System;
using System.Collections;
using UnityEngine;

namespace Lifetopia.Extensions
{
    public static class MonoBehaviourExtensions
    {
        /// <summary>Invoke action setelah delay tanpa perlu coroutine manual.</summary>
        public static Coroutine DelayedCall(this MonoBehaviour mb,
            float delay, Action action)
        {
            return mb.StartCoroutine(DelayRoutine(delay, action));
        }

        static IEnumerator DelayRoutine(float delay, Action action)
        {
            yield return new WaitForSeconds(delay);
            action?.Invoke();
        }

        /// <summary>Invoke action setelah 1 frame.</summary>
        public static Coroutine NextFrame(this MonoBehaviour mb, Action action)
        {
            return mb.StartCoroutine(NextFrameRoutine(action));
        }

        static IEnumerator NextFrameRoutine(Action action)
        {
            yield return null;
            action?.Invoke();
        }

        /// <summary>Repeat action setiap interval detik.</summary>
        public static Coroutine Repeat(this MonoBehaviour mb,
            float interval, Action action, int times = -1)
        {
            return mb.StartCoroutine(RepeatRoutine(interval, action, times));
        }

        static IEnumerator RepeatRoutine(float interval, Action action, int times)
        {
            int count = 0;
            while (times < 0 || count < times)
            {
                yield return new WaitForSeconds(interval);
                action?.Invoke();
                count++;
            }
        }
    }
}
