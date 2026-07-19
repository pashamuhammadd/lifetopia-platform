using System;
using UnityEngine;

namespace Lifetopia.Utils
{
    public static class TimeUtils
    {
        public static string FormatCountdown(float seconds)
        {
            if (seconds <= 0f) return "00:00";
            int m = (int)(seconds / 60);
            int s = (int)(seconds % 60);
            return $"{m:00}:{s:00}";
        }

        public static string FormatDuration(float seconds)
        {
            if (seconds < 60f)   return $"{(int)seconds}s";
            if (seconds < 3600f) return $"{(int)(seconds / 60)}m {(int)(seconds % 60)}s";
            return $"{(int)(seconds / 3600)}h {(int)((seconds % 3600) / 60)}m";
        }

        public static long ToUnixTimestamp(DateTime dt) =>
            (long)(dt - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds;

        public static DateTime FromUnixTimestamp(long ts) =>
            new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(ts);

        public static bool IsToday(DateTime dt) =>
            dt.Date == DateTime.UtcNow.Date;

        public static float GetRealTimeSince(DateTime dt) =>
            (float)(DateTime.UtcNow - dt).TotalSeconds;

        public static string GetGreeting()
        {
            int hour = DateTime.Now.Hour;
            if (hour < 12) return "Good Morning";
            if (hour < 17) return "Good Afternoon";
            if (hour < 21) return "Good Evening";
            return "Good Night";
        }
    }
}
