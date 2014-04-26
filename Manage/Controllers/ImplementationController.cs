using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Manage.Controllers
{
    [Authorize]
    public class ImplementationController : BaseController
    {
        //
        // GET: /Implementation/
            
        public ActionResult Index()
        {
            using (var db = new Db.TipTraceEntities())
            {
                ViewBag.ClientHash = (from item in db.Clients where item.ClientId.Equals(CurrentClient.ClientId) select item.Hash).FirstOrDefault();
            }
            return View();
        }

    }
}
