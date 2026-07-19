using System;
using System.Collections.Generic;

namespace Lifetopia.Responses
{
    /// <summary>Paginated API response wrapper.</summary>
    [Serializable]
    public class PaginatedResponse<T>
    {
        public List<T> items      = new List<T>();
        public int     total      = 0;
        public int     page       = 1;
        public int     pageSize   = 20;
        public bool    hasMore    => (page * pageSize) < total;
        public int     totalPages => pageSize > 0 ? (int)Math.Ceiling((double)total / pageSize) : 0;
    }
}
