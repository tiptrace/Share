using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Net;
using System.IO;
using System.Collections.Specialized;
using System.Runtime.Remoting.Messaging;
using System.Text;

namespace Utility
{
    namespace oAuth
    {
        public class oAuthLinkedIn : oAuthBase1
        {
            public const string REQUEST_TOKEN = "https://api.linkedin.com/uas/oauth/requestToken";
            public const string AUTHORIZE = "https://api.linkedin.com/uas/oauth/authorize";
            public const string ACCESS_TOKEN = "https://api.linkedin.com/uas/oauth/accessToken";

            private string _consumerKey = "";
            private string _consumerSecret = "";
            private string _token = "";
            private string _tokenSecret = "";

            #region Properties
            public string ConsumerKey
            {
                get
                {
                    if (_consumerKey.Length == 0)
                    {
                        _consumerKey = "avspcx8y32db"; //ConfigurationManager.AppSettings["LiApiKey"];
                    }
                    return _consumerKey;
                }
                set { _consumerKey = value; }
            }

            public string ConsumerSecret
            {
                get
                {
                    if (_consumerSecret.Length == 0)
                    {
                        _consumerSecret = "3GjMLwMj9Ecw9ePb"; //ConfigurationManager.AppSettings["LiSecretKey"];
                    }
                    return _consumerSecret;
                }
                set { _consumerSecret = value; }
            }

            public string Token { get { return _token; } set { _token = value; } }
            public string TokenSecret { get { return _tokenSecret; } set { _tokenSecret = value; } }
            #endregion

            /// <summary>
            /// Get the link to Twitter's authorization page for this application.
            /// </summary>
            /// <returns>The url with a valid request token, or a null string.</returns>
            public string AuthorizationLinkGet(string permissions)
            {
                string ret = null;

                string response = oAuthWebRequest(Web.Method.POST, REQUEST_TOKEN + permissions, String.Empty);
                if (response.Length > 0)
                {
                    //response contains token and token secret.  We only need the token.
                    //oauth_token=36d1871d-5315-499f-a256-7231fdb6a1e0&oauth_token_secret=34a6cb8e-4279-4a0b-b840-085234678ab4&oauth_callback_confirmed=true
                    NameValueCollection qs = HttpUtility.ParseQueryString(response);
                    if (qs["oauth_token"] != null)
                    {
                        this.Token = qs["oauth_token"];
                        this.TokenSecret = qs["oauth_token_secret"];
                        ret = AUTHORIZE + "?oauth_token=" + this.Token;
                    }
                }
                return ret;
            }

            /// <summary>
            /// Exchange the request token for an access token.
            /// </summary>
            /// <param name="authToken">The oauth_token is supplied by Twitter's authorization page following the callback.</param>
            public void AccessTokenGet(string authToken)
            {
                this.Token = authToken;

                string response = oAuthWebRequest(Web.Method.POST, ACCESS_TOKEN, string.Empty);

                if (response.Length > 0)
                {
                    //Store the Token and Token Secret
                    NameValueCollection qs = HttpUtility.ParseQueryString(response);
                    if (qs["oauth_token"] != null)
                    {
                        this.Token = qs["oauth_token"];
                    }
                    if (qs["oauth_token_secret"] != null)
                    {
                        this.TokenSecret = qs["oauth_token_secret"];
                    }
                }
            }

            /// <summary>
            /// Submit a web request using oAuth.
            /// </summary>
            /// <param name="method">GET or POST</param>
            /// <param name="url">The full url, including the querystring.</param>
            /// <param name="postData">Data to post (querystring format)</param>
            /// <returns>The web server response.</returns>
            public string oAuthWebRequest(Web.Method method, string url, string postData)
            {
                string outUrl = "";
                string querystring = "";
                string ret = "";


                //Setup postData for signing.
                //Add the postData to the querystring.
                if (method == Web.Method.POST)
                {
                    if (postData.Length > 0)
                    {
                        //Decode the parameters and re-encode using the oAuth UrlEncode method.
                        NameValueCollection qs = HttpUtility.ParseQueryString(postData);
                        postData = "";
                        foreach (string key in qs.AllKeys)
                        {
                            if (postData.Length > 0)
                            {
                                postData += "&";
                            }
                            qs[key] = HttpUtility.UrlDecode(qs[key]);
                            qs[key] = this.UrlEncode(qs[key]);
                            postData += key + "=" + qs[key];

                        }
                        if (url.IndexOf("?") > 0)
                        {
                            url += "&";
                        }
                        else
                        {
                            url += "?";
                        }
                        url += postData;
                    }
                }

                Uri uri = new Uri(url);

                string nonce = this.GenerateNonce();
                string timeStamp = this.GenerateTimeStamp();

                //Generate Signature
                string sig = this.GenerateSignature(uri,
                    this.ConsumerKey,
                    this.ConsumerSecret,
                    this.Token,
                    this.TokenSecret,
                    method.ToString(),
                    timeStamp,
                    nonce,
                    out outUrl,
                    out querystring);


                querystring += "&oauth_signature=" + HttpUtility.UrlEncode(sig);

                //Convert the querystring to postData
                if (method == Web.Method.POST)
                {
                    postData = querystring;
                    querystring = "";
                }

                if (querystring.Length > 0)
                {
                    outUrl += "?";
                }

                if (method == Web.Method.POST || method == Web.Method.GET)
                    ret = Web.WebRequest(method, outUrl + querystring, postData);
                //else if (method == Method.PUT)
                //ret = WebRequestWithPut(outUrl + querystring, postData);
                return ret;
            }



            /// <summary>
            /// WebRequestWithPut
            /// </summary>
            /// <param name="method">WebRequestWithPut</param>
            /// <param name="url"></param>
            /// <param name="postData"></param>
            /// <returns></returns>
            public string APIWebRequest(Web.Method method, string url, string postData)
            {
                Uri uri = new Uri(url);
                string nonce = this.GenerateNonce();
                string timeStamp = this.GenerateTimeStamp();

                string outUrl, querystring;

                //Generate Signature
                string sig = this.GenerateSignature(uri,
                    this.ConsumerKey,
                    this.ConsumerSecret,
                    this.Token,
                    this.TokenSecret,
                    method.ToString(),
                    timeStamp,
                    nonce,
                    out outUrl,
                    out querystring);

                //querystring += "&oauth_signature=" + HttpUtility.UrlEncode(sig);
                //NameValueCollection qs = HttpUtility.ParseQueryString(querystring);

                //string finalGetUrl = outUrl + "?" + querystring;

                HttpWebRequest webRequest = null;

                //webRequest = System.Net.WebRequest.Create(finalGetUrl) as HttpWebRequest;
                webRequest = System.Net.WebRequest.Create(url) as HttpWebRequest;
                //webRequest.ContentType = "text/xml";
                webRequest.Method = method.ToString();
                webRequest.Credentials = CredentialCache.DefaultCredentials;
                webRequest.AllowWriteStreamBuffering = true;

                webRequest.PreAuthenticate = true;
                webRequest.ServicePoint.Expect100Continue = false;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Ssl3;

                webRequest.Headers.Add("Authorization", "OAuth realm=\"http://api.linkedin.com/\",oauth_consumer_key=\"" + this.ConsumerKey + "\",oauth_token=\"" + this.Token + "\",oauth_signature_method=\"HMAC-SHA1\",oauth_signature=\"" + HttpUtility.UrlEncode(sig) + "\",oauth_timestamp=\"" + timeStamp + "\",oauth_nonce=\"" + nonce + "\",oauth_verifier=\"" + this.Verifier + "\", oauth_version=\"1.0\"");
                //webRequest.Headers.Add("Authorization", "OAuth oauth_nonce=\"" + nonce + "\", oauth_signature_method=\"HMAC-SHA1\", oauth_timestamp=\"" + timeStamp + "\", oauth_consumer_key=\"" + this.ConsumerKey + "\", oauth_token=\"" + this.Token + "\", oauth_signature=\"" + HttpUtility.UrlEncode(sig) + "\", oauth_version=\"1.0\"");
                if (postData != null)
                {
                    byte[] fileToSend = Encoding.UTF8.GetBytes(postData);
                    webRequest.ContentLength = fileToSend.Length;

                    Stream reqStream = webRequest.GetRequestStream();

                    reqStream.Write(fileToSend, 0, fileToSend.Length);
                    reqStream.Close();
                }

                string returned = Web.WebResponseGet(webRequest);

                return returned;
            }


        
        }

    }
}