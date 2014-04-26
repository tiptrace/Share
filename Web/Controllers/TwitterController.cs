using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class TwitterController : BaseController
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        private Twitter Twitter = new Twitter();

        public ActionResult Index()
        {
            string Url = Twitter.getRedirectUrl();
            return Redirect(Url);
        }

        public ActionResult Authenticate()
        {
            String Error = Request.QueryString["denied"];
            if (!string.IsNullOrEmpty(Error))
                return View("Fail");
            
            Twitter.GetAccessToken(Request["oauth_token"], Request["oauth_verifier"]);

            Twitter.ResponsUser UserResponse = Twitter.getPerson(Twitter.Token, Twitter.TokenSecret, Twitter.Verifier);

            Db.User User = db.ProcessToken(this.UserHash, 5, UserResponse.id.ToString(), UserResponse.name, Twitter.Token, Twitter.TokenSecret, Twitter.Verifier, string.Empty).FirstOrDefault();

            this.UserHash = User.Hash;
            Response.Cookies.Add(new HttpCookie("NetworkConnected", "twitter"));

            return View();
        }

        [OutputCache(Duration = 900, VaryByParam = "Hash")]
        public ActionResult FriendList()
        {
            List<Target> Friends = Twitter.getContacts(this.UserHash);
            return Json(Friends, JsonRequestBehavior.AllowGet);
        }

    }
}
