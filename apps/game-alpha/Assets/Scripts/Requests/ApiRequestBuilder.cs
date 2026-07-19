using Lifetopia.Constants;

namespace Lifetopia.Requests
{
    /// <summary>Fluent builder untuk ApiRequest.</summary>
    public class ApiRequestBuilder
    {
        readonly ApiRequest _req = new ApiRequest();

        public ApiRequestBuilder Get(string endpoint)
        {
            _req.Method   = RequestMethod.GET;
            _req.Endpoint = endpoint;
            return this;
        }

        public ApiRequestBuilder Post(string endpoint, string body = "{}")
        {
            _req.Method   = RequestMethod.POST;
            _req.Endpoint = endpoint;
            _req.Body     = body;
            return this;
        }

        public ApiRequestBuilder Put(string endpoint, string body = "{}")
        {
            _req.Method   = RequestMethod.PUT;
            _req.Endpoint = endpoint;
            _req.Body     = body;
            return this;
        }

        public ApiRequestBuilder Delete(string endpoint)
        {
            _req.Method   = RequestMethod.DELETE;
            _req.Endpoint = endpoint;
            return this;
        }

        public ApiRequestBuilder WithRetries(int n)  { _req.Retries = n; return this; }

        public ApiRequestBuilder OnSuccess(System.Action<string> cb)
        {
            _req.OnSuccess(cb);
            return this;
        }

        public ApiRequestBuilder OnError(System.Action<string> cb)
        {
            _req.OnError(cb);
            return this;
        }

        public ApiRequest Build() => _req;

        // Shorthand
        public static ApiRequestBuilder New() => new ApiRequestBuilder();
    }
}
