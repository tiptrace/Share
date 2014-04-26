using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Web.Models
{
    public class Hotmail
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        string ClientId = "00000000480E8F37";
        string ClientSecret = "m2ZeyJ98Ld-o3pSLc2itVlzDC3jqCwAa";

        string RedirectUrl = System.Configuration.ConfigurationManager.AppSettings["Hotmail.RedirectUrl"];

        string AuthorizationUrl = "https://login.live.com/oauth20_authorize.srf?client_id={0}&scope={1}&response_type={2}&redirect_uri={3}";

        string AuthenticationUrl = "https://login.live.com/oauth20_token.srf";
        string RequestAccessTokenParameters = "client_id={0}&redirect_uri={1}&client_secret={2}&code={3}&grant_type=authorization_code";

        string ContactsUrl = "https://apis.live.net/v5.0/me/contacts?access_token={0}";
        string MeUrl = "https://apis.live.net/v5.0/me?access_token={0}";


        public string getRedirectUrl()
        {
            return string.Format(AuthorizationUrl, this.ClientId, "wl.basic wl.contacts_emails", "code", HttpUtility.UrlEncode(this.RedirectUrl));
        }

        public AccesTokenRespons GetAccessToken(string Code)
        {
            string respons = Utility.Web.WebRequest(Utility.Web.Method.POST, AuthenticationUrl, string.Format(RequestAccessTokenParameters, this.ClientId, HttpUtility.UrlEncode(this.RedirectUrl), this.ClientSecret, Code));

            return JsonConvert.DeserializeObject<AccesTokenRespons>(respons);
        }

        public string GetAccessTokenFromDatabase(string UserHash)
        {
            Db.UserSource usersource = (from item in db.UserSources where item.User.Hash == UserHash && item.SourceTypeId == 4 select item).FirstOrDefault();
            return usersource.Token;
        }

        public ContactResponsUser getPerson(string AccessToken)
        {
            String Result = Utility.Web.WebRequest(Utility.Web.Method.GET, string.Format(MeUrl, AccessToken), string.Empty);

            ContactResponsUser ResponsUser = JsonConvert.DeserializeObject<ContactResponsUser>(Result);

            return ResponsUser;
        }

        public List<Target> getContacts(string UserHash)
        {
            List<Target> output = new List<Target>();

            String Result = Utility.Web.WebRequest(Utility.Web.Method.GET, string.Format(ContactsUrl, this.GetAccessTokenFromDatabase(UserHash)), string.Empty);

            ContactRespons Contacts = JsonConvert.DeserializeObject<ContactRespons>(Result);

            foreach (ContactResponsUser item in Contacts.data)
            {
                if (!string.IsNullOrEmpty(item.emails.preferred))
                    output.Add(new Target { Identifier = item.emails.preferred, Name = item.name, ProfilePicure = string.Empty, SourceType = 4, Network = "Hotmail" });
            }

            return output;
        }

        public class AccesTokenRespons
        {
            public string access_token { get; set; }
            public string token_type { get; set; }
            public string Bearer { get; set; }
            public int expires_in { get; set; }
            public string authentication_token { get; set; }
            public string scope { get; set; }
        }

        public class ContactRespons
        {
            public List<ContactResponsUser> data { get; set; }
        }

        public class ContactResponsUser
        {
            public string id { get; set; }
            public string first_name { get; set; }
            public string last_name { get; set; }
            public string name { get; set; }
            public ContactResponsUserEmail emails { get; set; }
        }

        public class ContactResponsUserEmail
        {
            public string preferred { get; set; }
            public object account { get; set; }
            public string personal { get; set; }
            public object business { get; set; }
            public object other { get; set; }
        }
    }
}