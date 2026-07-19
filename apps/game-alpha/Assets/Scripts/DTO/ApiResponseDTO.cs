using System;

namespace Lifetopia.DTO
{
    [Serializable]
    public class ApiResponseDTO<T>
    {
        public bool   success = false;
        public string message = "";
        public T      data    = default;
        public int    code    = 200;
        public string error   = "";
    }

    [Serializable]
    public class ApiResponseDTO
    {
        public bool   success = false;
        public string message = "";
        public int    code    = 200;
        public string error   = "";
    }
}
