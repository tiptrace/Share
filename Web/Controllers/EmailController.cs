using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class EmailController : BaseController
    {

        private Email Email = new Email();

        [OutputCache(Duration = 900, VaryByParam = "Hash")]
        public ActionResult FriendList(string Hash)
        {
            List<Target> Friends = Email.getContacts(this.UserHash);
            return Json(Friends, JsonRequestBehavior.AllowGet);
        }

    }
}
