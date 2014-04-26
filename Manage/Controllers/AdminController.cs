using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Manage.Controllers
{
    [ValidateInput(false)]
    [Authorize(Roles="admin")]
    public class AdminController : BaseController
    {
        //
        // GET: /Admin/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Parameters()
        {
            using (var db = new Db.TipTraceEntities())
            {
                return View((from item in db.Settings select item).ToList());
            }
        }

        public ActionResult Parameter(int id)
        {
            using (var db = new Db.TipTraceEntities())
            {
                return View((from item in db.Settings where item.SettingId.Equals(id) select new Models.AdminSettings { SettingId = item.SettingId, Name = item.Name, Value = item.Value }).FirstOrDefault());
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Parameter(Models.AdminSettings model)
        {

            using (var db = new Db.TipTraceEntities())
            {
                if (ModelState.IsValid)
                {
                    Db.Setting setting = (from item in db.Settings where item.SettingId.Equals(model.SettingId) select item).FirstOrDefault();
                    setting.Name = model.Name;
                    setting.Value = model.Value;

                    db.SaveChanges();

                    ViewData["Message"] = "Saved";
                }
            }

            return View(model);
        }

        public ActionResult Clients()
        {
            return ClientsOuput(new Manage.Models.ClientFilter());
        }

        [HttpPost]
        public ActionResult Clients(Manage.Models.ClientFilter model)
        {
            return ClientsOuput(model);
        }


        public ActionResult ClientsOuput(Manage.Models.ClientFilter model)
        {   
            using (var db = new Db.TipTraceEntities())
            {

                if (string.IsNullOrEmpty(model.Filter))
                    ViewBag.Clients = (from item in db.Clients.Include("ClientType").Include("UrlViews") select item).ToList();
                else
                    ViewBag.Clients = (from item in db.Clients.Include("ClientType").Include("UrlViews") where item.Name.Contains(model.Filter) select item).ToList();

            }

            return View(model);
        }

        public ActionResult Client(int id)
        {
            Db.Client client;
            
            using (var db = new Db.TipTraceEntities())
            {
                client = (from item in db.Clients.Include("ClientType") where item.ClientId == id select item).FirstOrDefault();


                var ClientTypeList = (from d in db.ClientTypes
                                     orderby d.Level
                                     select d).ToList();
                ViewBag.ClientTypeList = new SelectList(ClientTypeList, "ClientTypeId", "Name", client.TypeId);

            }

            if (client == null)
                return HttpNotFound();

            return View(client);

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Client(Db.Client model)
        {

            Db.Client client = new Db.Client() ;

            using (var db = new Db.TipTraceEntities())
            {
                if (ModelState.IsValid)
                {
                    client = (from item in db.Clients where item.ClientId.Equals(model.ClientId) select item).FirstOrDefault();
                    client.TypeId = model.TypeId;

                    db.SaveChanges();


                    var ClientTypeList = (from d in db.ClientTypes
                                          orderby d.Level
                                          select d).ToList();
                    ViewBag.ClientTypeList = new SelectList(ClientTypeList, "ClientTypeId", "Name", client.TypeId);


                    ViewData["Message"] = "Saved";
                }
            }

            return View(client);
        }



    }
}
