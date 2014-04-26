using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class HotmailController : BaseController
    {

        private Db.TipTraceEntities db = new Db.TipTraceEntities();
        private Hotmail Hotmail = new Hotmail();

        public ActionResult Index()
        {
            return Redirect(Hotmail.getRedirectUrl());
        }

        public ActionResult Authenticate()
        {
            string Error = Request.QueryString["error"];

            if (!string.IsNullOrEmpty(Error))
                return View("Fail");

            Hotmail.AccesTokenRespons AccessTokenRespons = Hotmail.GetAccessToken(Request.QueryString["code"].ToString());

            Hotmail.ContactResponsUser ResponsUser = Hotmail.getPerson(AccessTokenRespons.access_token);
            Db.User User = db.ProcessToken(this.UserHash, 4, ResponsUser.emails.preferred, ResponsUser.name, AccessTokenRespons.access_token, string.Empty, string.Empty, string.Empty).FirstOrDefault();

            //waardes voor de bronframe setten
            this.UserHash = User.Hash;
            Response.Cookies.Add(new HttpCookie("NetworkConnected", "hotmail"));

            return View();
            //return Content(AccessTokenRespons.access_token);
        }

        [OutputCache(Duration = 900, VaryByParam = "Hash")]
        public ActionResult FriendList()
        {
            List<Target> Friends = Hotmail.getContacts(this.UserHash);
            return Json(Friends, JsonRequestBehavior.AllowGet);
        }


    }
}
