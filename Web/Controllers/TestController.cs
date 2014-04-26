using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using agsXMPP;
//using agsXMPP.protocol.client;
//using agsXMPP.Collections;

using System.Threading;
using agsXMPP.Sasl;
using agsXMPP.Sasl.Facebook;
using agsXMPP.protocol.sasl;


namespace Web.Controllers
{
    public class TestController : BaseController
    {

        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ButtonLeft()
        {
            return View();
        }

        public ActionResult Amp()
        {
            return Content(("hahaa & haha"));
        }

        private string FB_AccessToken = "AAAFHHdFHdZBUBANLa6JS7IPoG12yTyWck4LxgYPz9mUoCO37BGh2p4W2ZCj8garOdTSFVcq5Syp5lJbuFGEptOcKzsfpe69iGN1A1IcAZDZD";
        private string FB_APIKey = System.Configuration.ConfigurationManager.AppSettings["Facebook.ApplicationId"];
        private string FB_APISecret =  System.Configuration.ConfigurationManager.AppSettings["Facebook.ApplicationSecret"];

        private string output = "";

        //private int counter = 0;


        public string GetAccessTokenFromDatabase(string UserHash)
        {
            Db.UserSource usersource = (from item in db.UserSources where item.User.Hash == UserHash && item.SourceTypeId == 1 select item).FirstOrDefault();
            return usersource.Token;
        }

        public ActionResult Chat()
        {

            string FB_AccessToken = GetAccessTokenFromDatabase(this.UserHash);


            FacebookXmpp.Dashboard dash = new FacebookXmpp.Dashboard(FB_APIKey, FB_APISecret, FB_AccessToken);
            dash.Authenticate();

            //foreach (FacebookXmpp.Person item in dash.Friends)
            //{
            //    output += item.Name + " - " + item.Id + "<br/>";
            //}

            FacebookXmpp.Person target = new FacebookXmpp.Person();
            target.Id = "-1814856838@chat.facebook.com";

            output += dash.Debug.ToString();

            //dash.SendMessage(target, "Testing the api");

            return Content(output);
        }

    }
}
