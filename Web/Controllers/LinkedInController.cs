using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class LinkedInController : BaseController
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        private LinkedIn LinkedIn = new LinkedIn();

        public ActionResult Index()
        {
            string Url = LinkedIn.getRedirectUrl();
            TempData["TokenSecret"] = LinkedIn.TokenSecret;
            return Redirect(Url);
        }

        public ActionResult Authenticate()
        {
            String Error = Request.QueryString["oauth_problem"];
            if (!string.IsNullOrEmpty(Error))
                return View("Fail");

            string Verifier = Request.QueryString["oauth_verifier"];
            string Token = Request.QueryString["oauth_token"];
            string TokenSecret = (string)TempData["TokenSecret"];

            LinkedIn.TokenSecret = TokenSecret;
            LinkedIn.Verifier = Verifier;
            LinkedIn.GetAccessToken(Token);

            LinkedInObject Person = LinkedIn.getPerson(LinkedIn.Token, LinkedIn.TokenSecret, LinkedIn.Verifier);

            Db.User User = db.ProcessToken(this.UserHash, 2, (Person.id == null ? string.Empty : Person.id), Person.firstName  + ' ' + Person.lastName, LinkedIn.Token, LinkedIn.TokenSecret, LinkedIn.Verifier, string.Empty).FirstOrDefault();
            
            this.UserHash = User.Hash;
            Response.Cookies.Add(new HttpCookie("NetworkConnected", "linkedin"));

            return View();
        }

        [OutputCache(Duration = 900, VaryByParam = "Hash")]
        public ActionResult FriendList()
        {
            List<Target> Friends = LinkedIn.getContacts(this.UserHash);
            return Json(Friends, JsonRequestBehavior.AllowGet);
        }

    }
}
