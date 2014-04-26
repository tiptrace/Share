using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using Newtonsoft.Json;

namespace Web.Models
{
    public class Facebook
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        string ApplicationId = System.Configuration.ConfigurationManager.AppSettings["Facebook.ApplicationId"];
        string ApplicationSecret = System.Configuration.ConfigurationManager.AppSettings["Facebook.ApplicationSecret"];
        string RedirectUrl = System.Configuration.ConfigurationManager.AppSettings["Facebook.RedirectUrl"];

        string AuthenticationDialogUrl = "https://www.facebook.com/dialog/oauth?client_id={0}&redirect_uri={1}&scope={2}&state={3}&display=popup";
        string AuthAccessTokenUrl = "https://graph.facebook.com/oauth/access_token?client_id={0}&redirect_uri={1}&client_secret={3}&code={2}";

        string GraphUrl_Me = "https://graph.facebook.com/me?access_token={0}";
        string GraphUrl_MeFriends = "https://graph.facebook.com/me/friends?access_token={0}";
        string GraphUrl_MePermissions = "https://graph.facebook.com/me/permissions?access_token={0}";

        public string getRedirectUrl()
        {
            return string.Format(AuthenticationDialogUrl, this.ApplicationId, HttpUtility.UrlEncode(RedirectUrl), "xmpp_login", string.Empty); //publish_actions,publish_stream
        }

        public string GetAccessToken(string code)
        {
            //Getting the AccessToken
            String FacebookCode = code;
            String FacebookAccessTokenQuerystring = Utility.Web.WebRequest(Utility.Web.Method.GET, string.Format(AuthAccessTokenUrl, this.ApplicationId, HttpUtility.UrlEncode(RedirectUrl), FacebookCode, this.ApplicationSecret), string.Empty);
            return HttpUtility.ParseQueryString(FacebookAccessTokenQuerystring)["access_token"];
        }

        public string GetAccessTokenFromDatabase(string UserHash)
        {
            Db.UserSource usersource = (from item in db.UserSources where item.User.Hash == UserHash && item.SourceTypeId == 1 select item).FirstOrDefault();
            return usersource.Token;
        }

        public FacebookObject getPerson(string AccesToken)
        {

            FacebookObject output = new FacebookObject();

            String Result = Utility.Web.WebRequest(Utility.Web.Method.GET, string.Format(GraphUrl_Me, AccesToken), string.Empty);

            output = JsonConvert.DeserializeObject<FacebookObject>(Result);

            return output;
        }

        public List<Target> getContacts(string UserHash)
        {
            List<Target> output = new List<Target>();

            String Result = Utility.Web.WebRequest(Utility.Web.Method.GET, string.Format(GraphUrl_MeFriends, this.GetAccessTokenFromDatabase(UserHash)), string.Empty);

            FacebookObjects Friends = JsonConvert.DeserializeObject<FacebookObjects>(Result);

            foreach (FacebookObject item in Friends.data) {
                output.Add(new Target { Identifier = item.id, Name = item.name, ProfilePicure = string.Format("http://graph.facebook.com/{0}/picture", item.id), SourceType = 1, Network = "Facebook" });
            }

            return output;
        }

        public bool hasPermission(string AccesToken, string Permission)
        {
            String Result = Utility.Web.WebRequest(Utility.Web.Method.GET, string.Format(GraphUrl_MePermissions, AccesToken), string.Empty);

            FacebookPermissions PermissionObject = JsonConvert.DeserializeObject<FacebookPermissions>(Result);

            if (PermissionObject != null)
            {
                switch (Permission)
                {
                    case "installed":
                        return (PermissionObject.data[0].installed == 1 ? true : false);
                    case "xmpp_login":
                        return (PermissionObject.data[0].xmpp_login == 1 ? true : false);
                    default:
                        return false;
                }
            }
            return false;
        }

        FacebookXmpp.Dashboard dash;
        private void OpenChatConnection(string AccessToken)
        {
            dash = new FacebookXmpp.Dashboard(this.ApplicationId, this.ApplicationSecret, AccessToken);
        }

        public void Postmessage(string UserHash, string Target, string Message, Url url, string ShortUrl)
        {
            string AccessToken = GetAccessTokenFromDatabase(UserHash);

            StringBuilder TotalMessage = new StringBuilder();
           
            if (string.IsNullOrEmpty(url.Title))
                TotalMessage.Append(ShortUrl);
            else
                TotalMessage.Append(string.Format("{0} - {1}", HttpUtility.HtmlEncode(url.Title), ShortUrl));

            TotalMessage.Append(string.Format("\n{0}", HttpUtility.HtmlEncode(Message)));

            if (dash == null)
                OpenChatConnection(AccessToken);

            FacebookXmpp.Person target = new FacebookXmpp.Person();
            target.Id = string.Format("-{0}@chat.facebook.com", Target);

            dash.SendMessage(target, TotalMessage.ToString());
        }

        public void CloseChatConnection()
        {
            dash.Dispose();
        }
    }

    public class FacebookObjects
    {
        public List<FacebookObject> data { get; set; }
    }

    public class FacebookObject
    {
        public string id { get; set; }
        public string name { get; set; }
    }


    public class FacebookPermissions
    {
        public List<FacebookPermissionData> data { get; set; }
    }

    public class FacebookPermissionData
    {
        public int installed { get; set; }
        public int xmpp_login { get; set; }
    }

}