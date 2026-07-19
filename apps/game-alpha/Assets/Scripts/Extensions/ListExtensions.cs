using System;
using System.Collections.Generic;
using UnityEngine;

namespace Lifetopia.Extensions
{
    public static class ListExtensions
    {
        public static T Random<T>(this List<T> list)
        {
            if (list == null || list.Count == 0) return default;
            return list[UnityEngine.Random.Range(0, list.Count)];
        }

        public static void Shuffle<T>(this List<T> list)
        {
            for (int i = list.Count - 1; i > 0; i--)
            {
                int j = UnityEngine.Random.Range(0, i + 1);
                (list[i], list[j]) = (list[j], list[i]);
            }
        }

        public static bool IsNullOrEmpty<T>(this List<T> list) =>
            list == null || list.Count == 0;

        public static T FirstOrDefault<T>(this List<T> list, Func<T, bool> predicate)
        {
            foreach (var item in list)
                if (predicate(item)) return item;
            return default;
        }

        public static List<T> Where<T>(this List<T> list, Func<T, bool> predicate)
        {
            var result = new List<T>();
            foreach (var item in list)
                if (predicate(item)) result.Add(item);
            return result;
        }

        public static void AddIfNotNull<T>(this List<T> list, T item) where T : class
        {
            if (item != null) list.Add(item);
        }
    }
}
