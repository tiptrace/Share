using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Utility.Extensions;

namespace Web.Models
{
    public class Twitter
    {
        private Utility.oAuth.oAuthTwitter oAuth = new Utility.oAuth.oAuthTwitter();
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        string VerifyCredentialsUrl = "https://api.twitter.com/1.1/account/verify_credentials.json";
        string DirectMessageUrl = "https://api.twitter.com/1.1/direct_messages/new.json";

        string ListFriendsUrl = "https://api.twitter.com/1.1/followers/ids.json";
        string UserLookupUrl = "https://api.twitter.com/1.1/users/lookup.json";
        
        public string TokenSecret { get; set; }
        public string Verifier { get; set; }
        public string Token { get; set; }

        public string getRedirectUrl()
        {
            oAuth.CallBackUrl = System.Configuration.ConfigurationManager.AppSettings["Twitter.RedirectUrl"];
            return oAuth.AuthorizationLinkGet();
        }

        public void GetAccessToken(string Token, string Verifier)
        {
            oAuth.AccessTokenGet(Token, Verifier);

            this.Token = oAuth.Token;
            this.TokenSecret = oAuth.TokenSecret;
            this.Verifier = oAuth.Verifier;
        }

        public void LoadUser(string UserHash)
        {
            Db.UserSource usersource = (from item in db.UserSources where item.User.Hash == UserHash && item.SourceTypeId == 5 select item).FirstOrDefault();
            oAuth.Token = usersource.Token;
            oAuth.TokenSecret = usersource.TokenSecret;
            oAuth.Verifier = usersource.Verifier;
        }

        public ResponsUser getPerson(string Token, string TokenSecret, string Verifier)
        {
            string Result = oAuth.oAuthWebRequest(Utility.Web.Method.GET, VerifyCredentialsUrl, null);
            ResponsUser output = JsonConvert.DeserializeObject<ResponsUser>(Result);
            return output;
        }


        public List<Target> getContacts(string UserHash)
        {
            this.LoadUser(UserHash);
            List<Target> output = new List<Target>();

            string ResultIdList = oAuth.oAuthWebRequest(Utility.Web.Method.GET, ListFriendsUrl, String.Empty);


            ListRespons Ids = JsonConvert.DeserializeObject<ListRespons>(ResultIdList);


            String UserIds = string.Empty;
            UserIds = String.Join(",", Ids.ids.Take(100));

            String verhaal = string.Empty;

            for (int i = 0; i < (Math.Ceiling((double)Ids.ids.Count/100)); i++)
            {
                UserIds = String.Join(",", Ids.ids.Skip(i * 100).Take(100));
                string ResultList = oAuth.oAuthWebRequest(Utility.Web.Method.POST, UserLookupUrl, string.Format("include_entities=false&skip_status=true&user_id={0}", HttpUtility.UrlEncode(UserIds)));
                List<ResponsUser> Contacts = JsonConvert.DeserializeObject<List<ResponsUser>>(ResultList);

                foreach (ResponsUser item in Contacts)
                {
                    output.Add(new Target { Identifier = item.screen_name, Name = item.name, ProfilePicure = item.profile_image_url, SourceType = 5, Network = "Twitter" }); //item.profile_image_url
                }
            }
            return output;
        }


        public string Postmessage(string UserHash, string Target, string Message, Url url, string ShortUrl)
        {
            this.LoadUser(UserHash);

            string postdata = string.Format("screen_name={0}", Target);
            postdata += string.Format("&text={0}", HttpUtility.UrlEncode(Message.Cut(90) + " " + ShortUrl + " via @TipTrace"));
            //postdata += string.Format("&text={0}", HttpUtility.UrlEncode(Message.Cut(90) + " " + HttpUtility.UrlEncode("www.iex.nl") + " " + "via @TipTrace"));

            return oAuth.oAuthWebRequest(Utility.Web.Method.POST, DirectMessageUrl, postdata);
        }

        public class ListRespons
        {
            public List<Int64> ids { get; set; }
        }

        public class Respons
        {
            public List<ResponsUser> users { get; set; }
        }

        public class ResponsUser
        {
            public Int64 id { get; set; }
            public string name { get; set; }
            public string screen_name { get; set; }
            public string profile_image_url { get; set; }
            
        }

    }
}