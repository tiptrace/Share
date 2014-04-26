using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Utility.Extensions;

namespace Web.Controllers
{
    public class StatsController : Controller
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        public ActionResult Index()
        {


            ViewBag.UserCount = db.Users.Count();
            ViewBag.UserSourceCount =  db.UserSources.Count();
            ViewBag.ShareSessionCount = db.ShareSessions.Count();
            ViewBag.ShareCount = db.Shares.Count();

            ViewBag.NewUsers = (from item in db.UserSources.Include("SourceType")
                                orderby item.DateAdded descending
                                select item).Take(30).ToList();

            ViewBag.NewShares = (from item in db.Shares.Include("SourceType").Include("ShareSession")
                                 orderby item.DateAdded descending
                                 select item).Take(30).ToList();

            //ViewBag.NewShares = (from item in db.Shares
            //                     orderby item.DateAdded descending
            //                     select item).Take(30).ToList();

            //return Content("123tefgsdfvsdfvs58df09vidusf09gsdf".Cut(10));


            return View();
        }

    }
}
