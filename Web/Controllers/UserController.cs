using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class UserController : Controller
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        public ActionResult Get(string id)
        {
            var User = (from item in db.Users where item.Hash == id select new {UserId = item.UserID, Email = item.Email, ConnectedNetworks = (from networks in item.UserSources select new {Id = networks.SourceType.Name.ToLower(), Name = networks.Name, Identifier = networks.Identifier}) }).FirstOrDefault();


            if (User != null)
                return Json(User, JsonRequestBehavior.AllowGet);
            else
                return HttpNotFound();

        }
    }
}
