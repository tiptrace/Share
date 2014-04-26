using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Web.Models
{
    public class Google
    {

        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        string ClientId = "195639156171.apps.googleusercontent.com";
        string ClientSecret = "vWBIjkcJwXGnFZ-UxAQwwOOD";

        string RedirectUrl = System.Configuration.ConfigurationManager.AppSettings["Google.RedirectUrl"];

        string AuthorizationUrl = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id={0}&redirect_uri={1}&scope={2}";
        string AuthenticationUrl = "https://accounts.google.com/o/oauth2/token?";

        string ContactsUrl = "https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token={0}";

        string RequestAccessTokenParameters = "code={0}&client_id={1}&client_secret={2}&redirect_uri={3}&grant_type=authorization_code";
        
        public string GetAccessTokenFromDatabase(string UserHash)
        {
            Db.UserSource usersource = (from item in db.UserSources where item.User.Hash == UserHash && item.SourceTypeId == 3 select item).FirstOrDefault();
            return usersource.Token;
        }

        public string getRedirectUrl()
        {
            return string.Format(AuthorizationUrl, this.ClientId, HttpUtility.UrlEncode(this.RedirectUrl), HttpUtility.UrlEncode("https://www.google.com/m8/feeds"));
        }

        public AccesTokenRespons GetAccessToken(string code)
        {
            string respons = Utility.Web.WebRequest(Utility.Web.Method.POST, string.Format(AuthenticationUrl), string.Format(RequestAccessTokenParameters,code,this.ClientId,this.ClientSecret,this.RedirectUrl));

            return JsonConvert.DeserializeObject<AccesTokenRespons>(respons);
        }


        public ContactResponsAuthor getPerson(string AccessToken)
        {
            String Result = Utility.Web.WebRequest(Utility.Web.Method.GET, string.Format(ContactsUrl, AccessToken), string.Empty);
            ContactRespons Contacts = JsonConvert.DeserializeObject<ContactRespons>(Result.Replace("$", "_"));
            return Contacts.feed.author[0];
        }

        //public ContactRespons getContacts(string UserHash)
        public List<Target> getContacts(string UserHash)
        {
            List<Target> output = new List<Target>();

            String Result = Utility.Web.WebRequest(Utility.Web.Method.GET, string.Format(ContactsUrl, this.GetAccessTokenFromDatabase(UserHash)), string.Empty);

            ContactRespons Contacts = JsonConvert.DeserializeObject<ContactRespons>(Result.Replace("$","_"));

            foreach (ContactResponsEntry item in Contacts.feed.entry)
            {
                string email = item.gd_email.FirstOrDefault().address;
                string name = item.title._t;

                if (string.IsNullOrEmpty(name))
                    name = email;

                if (!string.IsNullOrEmpty(email))
                    output.Add(new Target { Identifier = email, Name = name, ProfilePicure = string.Empty, SourceType = 3, Network = "Google" });
            }

            return output;
        }

    }

    public class ContactRespons
    {
        public string version { get; set; }
        public string encoding { get; set; }
        public ContactResponsFeed feed { get; set; }
    }
    public class ContactResponsFeed
    {
        public List<ContactResponsEntry> entry { get; set; }
        public List<ContactResponsAuthor> author { get; set; }
    }

    public class ContactResponsAuthor
    {
        public ContactResponsName name { get; set; }
        public ContactResponsEmail email { get; set; }
    }

    public class ContactResponsName
    {
        public string _t { get; set; }
    }

    public class ContactResponsEmail
    {
        public string _t { get; set; }
    }

    public class ContactResponsEntry
    {
        public ContactResponsEntryTitle title { get; set; }
        public List<ContactResponsEntryEmail> gd_email { get; set; }
    }

    public class ContactResponsEntryTitle
    {
        public string type { get; set; }
        public string _t { get; set; }
    }

    public class ContactResponsEntryEmail
    {
        public string rel { get; set; }
        public string address { get; set; }
        public string primary { get; set; }
    }

    public class AccesTokenRespons
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public string Bearer { get; set; }
        public int expires_in { get; set; }
        public string id_token { get; set; }
    }
}