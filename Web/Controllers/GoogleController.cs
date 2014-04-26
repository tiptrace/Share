using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class GoogleController : BaseController
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();
        private Google Google = new Google();

        public ActionResult Index(string Url)
        {
            return Redirect(Google.getRedirectUrl());
        }

        public ActionResult Authenticate()
        {
            string Error = Request.QueryString["error"];

            if (!string.IsNullOrEmpty(Error))
                return View("Fail");

            AccesTokenRespons AccessTokenRespons = Google.GetAccessToken(Request.QueryString["code"].ToString());

            ContactResponsAuthor ResponsUser = Google.getPerson(AccessTokenRespons.access_token);
            Db.User User = db.ProcessToken(this.UserHash, 3, ResponsUser.email._t, ResponsUser.name._t, AccessTokenRespons.access_token, string.Empty, string.Empty, string.Empty).FirstOrDefault();

            //waardes voor de bronframe setten
            this.UserHash = User.Hash;
            Response.Cookies.Add(new HttpCookie("NetworkConnected", "google"));

            return View();
        }

        [OutputCache(Duration = 900, VaryByParam = "Hash")]
        public ActionResult FriendList()
        {
            List<Target> Friends = Google.getContacts(this.UserHash);
            return Json(Friends, JsonRequestBehavior.AllowGet);
        }


        //public ActionResult getContact()
        //{
        //    return Json(Google.getPerson(this.UserHash), JsonRequestBehavior.AllowGet);
        //    //return Content(Google.getPersonstring(this.UserHash));
        //}
    }
}
