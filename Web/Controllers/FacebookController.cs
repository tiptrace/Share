using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class FacebookController : BaseController
    {

        private Db.TipTraceEntities db = new Db.TipTraceEntities();
        private Facebook Facebook = new Facebook();

        public ActionResult Index(string Url)
        {
            return Redirect(Facebook.getRedirectUrl());
        }

        public ActionResult Authenticate()
        {
            string Error = Request.QueryString["error"];

            if (!string.IsNullOrEmpty(Error))
                return View("Fail");
            
            string FacebookAccessToken = Facebook.GetAccessToken(Request.QueryString["code"]);

            //check if the user had given us the correct permissions
            if (!Facebook.hasPermission(FacebookAccessToken, "xmpp_login"))
                return View("NeedPermission");

            FacebookObject Person = Facebook.getPerson(FacebookAccessToken);
            Db.User User = db.ProcessToken(this.UserHash, 1, Person.id, Person.name, FacebookAccessToken, string.Empty, string.Empty, string.Empty).FirstOrDefault();

            //waardes voor de bronframe setten
            this.UserHash = User.Hash;
            Response.Cookies.Add(new HttpCookie("NetworkConnected", "facebook"));

            return View() ;
        }

        [OutputCache(Duration = 900, VaryByParam = "Hash")]
        public ActionResult FriendList(string Hash)
        {
            List<Target> Friends = Facebook.getContacts(this.UserHash);
            return Json(Friends, JsonRequestBehavior.AllowGet);
        }


        //public ActionResult Test(string Hash)
        //{
        //    FacebookXmpp.Dashboard dash;
            
        //    string ApplicationId = System.Configuration.ConfigurationManager.AppSettings["Facebook.ApplicationId"];
        //    string ApplicationSecret = System.Configuration.ConfigurationManager.AppSettings["Facebook.ApplicationSecret"];
        //    //string FacebookAccessToken = Facebook.GetAccessToken(Request.QueryString["code"]);

        //    string AccessToken = Facebook.GetAccessTokenFromDatabase(this.UserHash);



        //    //try
        //    //{

        //        dash = new FacebookXmpp.Dashboard(ApplicationId, ApplicationSecret, AccessToken);

        //        //FacebookXmpp.Person target = new FacebookXmpp.Person();
        //        //target.Id = string.Format("-{0}@chat.facebook.com", 643987570);

        //        dash.Authenticate();


        //        return Content(dash.IsAuthenticated.ToString());

        //        //dash.SendMessage(target, "iets");

        //        return Content("Jahaa");
        //    //}
        //    //catch (Exception ex)
        //    //{

        //    //    return Content("ERROR: " + ex.Message);
        //    //}


        //}
    }
}
