using System;
using System.Collections;
using UnityEngine;
using Lifetopia.Network;

namespace Lifetopia.Requests
{
    public enum RequestMethod { GET, POST, PUT, DELETE }

    /// <summary>
    /// Wrapper untuk satu API request — method, endpoint, body, callbacks.
    /// </summary>
    public class ApiRequest
    {
        public RequestMethod Method   { get; set; } = RequestMethod.GET;
        public string        Endpoint { get; set; } = "";
        public string        Body     { get; set; } = "{}";
        public int           Retries  { get; set; } = 1;

        Action<string> _onSuccess;
        Action<string> _onError;

        public ApiRequest OnSuccess(Action<string> cb) { _onSuccess = cb; return this; }
        public ApiRequest OnError(Action<string> cb)   { _onError   = cb; return this; }

        public IEnumerator Execute()
        {
            int attempts = 0;
            while (attempts < Retries)
            {
                attempts++;
                bool done  = false;
                bool error = false;
                string result = "";

                IEnumerator req = Method switch
                {
                    RequestMethod.POST   => HttpClient.Instance?.Post(Endpoint, Body,
                        r => { result = r; done = true; },
                        e => { result = e; error = true; done = true; }),
                    RequestMethod.PUT    => HttpClient.Instance?.Put(Endpoint, Body,
                        r => { result = r; done = true; },
                        e => { result = e; error = true; done = true; }),
                    RequestMethod.DELETE => HttpClient.Instance?.Delete(Endpoint,
                        r => { result = r; done = true; },
                        e => { result = e; error = true; done = true; }),
                    _                   => HttpClient.Instance?.Get(Endpoint,
                        r => { result = r; done = true; },
                        e => { result = e; error = true; done = true; }),
                };

                if (req != null) yield return req;

                if (!error) { _onSuccess?.Invoke(result); yield break; }
                if (attempts < Retries) yield return new WaitForSeconds(1f);
                else _onError?.Invoke(result);
            }
        }
    }
}
