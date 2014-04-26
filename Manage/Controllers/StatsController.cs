using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Linq;

namespace Manage.Controllers
{
    [Authorize]
    public class StatsController : BaseController
    {

        public ActionResult Index()
        {
            return IndexOutput(new Models.PeriodModel());
        }

        [HttpPost]
        public ActionResult Index(Models.PeriodModel model)
        {
            return IndexOutput(model);
        }
        public ActionResult IndexOutput(Models.PeriodModel model)
        {

            using (var db = new Db.TipTraceEntities())
            {
                ViewBag.ViewsTotal = db.StatsViewsTotal(CurrentClientId, model.StartDate, model.EndDate, 0).FirstOrDefault();
                ViewBag.SharesTotal = db.StatsSharesTotal(CurrentClientId, model.StartDate, model.EndDate, 0).FirstOrDefault();
                ViewBag.ClicksTotal = db.StatsClicksTotal(CurrentClientId, model.StartDate, model.EndDate, 0).FirstOrDefault();

                ViewBag.ViewsTop = db.StatsViewsTop(10, CurrentClientId, model.StartDate, model.EndDate).ToList();
                ViewBag.SharesTop = db.StatsSharesTop(10, CurrentClientId, model.StartDate, model.EndDate).ToList();
                ViewBag.ClicksTop = db.StatsClicksTop(10, CurrentClientId, model.StartDate, model.EndDate).ToList();
            }
            return View(model);
        }

        [HttpPost]
        public ActionResult ViewsJson(Models.PeriodModel model)
        {
            using (var db = new Db.TipTraceEntities())
            {
                return Json((from item in FillDateGaps(db.StatsViewsPerDay(CurrentClientId, model.StartDate, model.EndDate).ToList(), model.StartDate, model.EndDate) orderby item.Date select new { Year = item.Date.Value.Year, Month = item.Date.Value.Month, Day = item.Date.Value.Day, Count = item.Count }));
            }
        }

        [HttpPost]
        public ActionResult SharesJson(Models.PeriodModel model)
        {
            using (var db = new Db.TipTraceEntities())
            {
                return Json((from item in FillDateGaps(db.StatsSharesPerDay(CurrentClientId, model.StartDate, model.EndDate).ToList(), model.StartDate, model.EndDate) orderby item.Date select new { Year = item.Date.Value.Year, Month = item.Date.Value.Month, Day = item.Date.Value.Day, Count = item.Count }));
            }
        }

        [HttpPost]
        public ActionResult ClicksJson(Models.PeriodModel model)
        {
            using (var db = new Db.TipTraceEntities())
            {
                return Json((from item in FillDateGaps(db.StatsClicksPerDay(CurrentClientId, model.StartDate, model.EndDate).ToList(), model.StartDate, model.EndDate) orderby item.Date select new { Year = item.Date.Value.Year, Month = item.Date.Value.Month, Day = item.Date.Value.Day, Count = item.Count }));
            }
        }


        public List<Db.StatsResultDate> FillDateGaps(List<Db.StatsResultDate> List, DateTime StartDate, DateTime EndDate)
        {
            if (StartDate == null)
                StartDate = List.FirstOrDefault().Date.Value;
            if (EndDate == null)
                EndDate = List.Last().Date.Value;
            DateTime ExpectedDate = StartDate;
            foreach (var item in List.OrderBy(item => item.Date)) {
                while (item.Date.Value.Date != ExpectedDate.Date) {
                    List.Add(new Db.StatsResultDate { Date = ExpectedDate, Count = 0 });
                    ExpectedDate = ExpectedDate.AddDays(1);
                }
                ExpectedDate = ExpectedDate.AddDays(1);
            }
            while (ExpectedDate.Date <= EndDate.Date) {
                List.Add(new Db.StatsResultDate { Date = ExpectedDate, Count = 0 });
                ExpectedDate = ExpectedDate.AddDays(1);
            }
            return List;
        }



        public ActionResult Url(int id)
        {

            using (var db = new Db.TipTraceEntities())
            {
                ViewBag.Url = (from item in db.Urls where item.UrlId == id select item).FirstOrDefault();


                ViewBag.ViewCount = db.StatsViewsTotal(CurrentClientId, null, null, id).FirstOrDefault();
                ViewBag.ShareCount = db.StatsSharesTotal(CurrentClientId, null, null, id).FirstOrDefault();
                ViewBag.ClickCount = db.StatsClicksTotal(CurrentClientId, null, null, id).FirstOrDefault();
            }
            return View();
        }
    }
}
