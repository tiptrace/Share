using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Web.Models
{
    public class LinkedIn
    {
        private Utility.oAuth.oAuthLinkedIn _oauth = new Utility.oAuth.oAuthLinkedIn();

        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        public string TokenSecret { get; set; }
        public string Verifier { get; set; }
        public string Token { get; set; }

        public string getRedirectUrl()
        {
            string authLink = _oauth.AuthorizationLinkGet("?scope=w_messages r_network");
            TokenSecret = _oauth.TokenSecret;
            return authLink;
        }

        public void GetAccessToken(string Token)
        {
            _oauth.TokenSecret = TokenSecret;
            _oauth.Verifier = Verifier;
            _oauth.AccessTokenGet(Token);

            this.Token = _oauth.Token;
            this.TokenSecret = _oauth.TokenSecret;
            this.Verifier = _oauth.Verifier;
        }

        public void LoadUser(string UserHash)
        {
            Db.UserSource usersource = (from item in db.UserSources where item.User.Hash == UserHash && item.SourceTypeId == 2 select item).FirstOrDefault();
            _oauth.Token = usersource.Token;
            _oauth.TokenSecret = usersource.TokenSecret;
            _oauth.Verifier = usersource.Verifier;
        }

        public LinkedInObject getPerson(string Token, string TokenSecret, string Verifier)
        {
            string Result = _oauth.APIWebRequest(Utility.Web.Method.GET, "http://api.linkedin.com/v1/people/~?format=json", null);

            LinkedInObject output = JsonConvert.DeserializeObject<LinkedInObject>(Result);

            return output;
        }

        public List<Target> getContacts(string UserHash)
        {
            this.LoadUser(UserHash);
            List<Target> output = new List<Target>();

            string Result = _oauth.APIWebRequest(Utility.Web.Method.GET, "http://api.linkedin.com/v1/people/~/connections?format=json", null);

            LinkedInObjects Friends = JsonConvert.DeserializeObject<LinkedInObjects>(Result);
            
            foreach (LinkedInObject item in Friends.values)
            {
                if (item.firstName != "private")
                    output.Add(new Target { Identifier = item.id, Name = String.Format("{0} {1}", item.firstName, item.lastName), ProfilePicure = item.pictureUrl, SourceType = 2, Network = "LinkedIn" });
            }
            return output;
        }


        public string Postmessage(string UserHash, string Target, string Message, Url url, string ShortUrl)
        {
            this.LoadUser(UserHash);

            string postXML = "<?xml version='1.0' encoding='UTF-8'?>";
            postXML += "<mailbox-item>";
            postXML += "  <recipients>";
            //postXML += "    <recipient>";
            //postXML += "      <person path='/people/~'/>";
            //postXML += "    </recipient>";
            postXML += "    <recipient>";
            postXML += "      <person path='/people/" + Target + "'/>";
            postXML += "    </recipient>";
            postXML += "  </recipients>";
            postXML += "  <subject><![CDATA[" + url.Title + "]]></subject>";
            postXML += "  <body><![CDATA[" + Message + "\n\n" + url.Title + "\n" + ShortUrl + "\n\nTipped with: http://www.tiptrace.com]]></body>";
            postXML += "</mailbox-item>";

            string Result = _oauth.APIWebRequest(Utility.Web.Method.POST, "http://api.linkedin.com/v1/people/~/mailbox", postXML);

            return string.Empty;
        }

    }

    public class LinkedInObjects
    {
        public List<LinkedInObject> values { get; set; }
    }

    public class LinkedInObject
    {
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string pictureUrl { get; set; }
    }
}