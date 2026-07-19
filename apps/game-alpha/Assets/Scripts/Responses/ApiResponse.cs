using System;
using UnityEngine;

namespace Lifetopia.Responses
{
    /// <summary>
    /// Typed API response wrapper dengan parse helper.
    /// </summary>
    public class ApiResponse<T>
    {
        public bool   IsSuccess { get; private set; }
        public T      Data      { get; private set; }
        public string Error     { get; private set; }
        public int    StatusCode{ get; private set; }
        public string RawJson   { get; private set; }

        public static ApiResponse<T> Success(T data, string raw = "") =>
            new ApiResponse<T> { IsSuccess = true, Data = data, RawJson = raw };

        public static ApiResponse<T> Fail(string error, int code = 0) =>
            new ApiResponse<T> { IsSuccess = false, Error = error, StatusCode = code };

        public static ApiResponse<T> Parse(string json)
        {
            if (string.IsNullOrEmpty(json))
                return Fail("Empty response");
            try
            {
                var data = JsonUtility.FromJson<T>(json);
                return Success(data, json);
            }
            catch (Exception e)
            {
                return Fail($"Parse error: {e.Message}");
            }
        }

        public override string ToString() =>
            IsSuccess ? $"OK: {Data}" : $"Error: {Error}";
    }
}
