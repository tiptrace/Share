using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Manage.Controllers
{
    [Authorize]
    [ValidateInput(false)]
    public class SettingsController : BaseController
    {

        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        //
        // GET: /Settings/

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult CustomEmail()
        {
            Models.Settings client = (from item in db.Clients
                                      where item.ClientId.Equals(CurrentClient.ClientId)
                                      select new Models.Settings
                                      {
                                          ClientId = item.ClientId,
                                          CustomEmailTemplate = item.CustomEmailTemplate
                                      }).FirstOrDefault();
            return View(client);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CustomEmail(Models.Settings model)
        {
            if (ModelState.IsValid)
            {
                Db.Client client = (from item in db.Clients where item.ClientId.Equals(CurrentClient.ClientId) select item).FirstOrDefault();
                client.CustomEmailTemplate = model.CustomEmailTemplate;
                db.SaveChanges();
                ViewData["Message"] = "Saved";
            }
            return View(model);
        }

        public ActionResult CustomMessages()
        {
            Models.Settings client = (from item in db.Clients
                                      where item.ClientId.Equals(CurrentClient.ClientId)
                                      select new Models.Settings
                                      {
                                          ClientId = item.ClientId,
                                          DefaultTipMessage = item.DefaultTipMessage
                                      }).FirstOrDefault();
            return View(client);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CustomMessages(Models.Settings model)
        {
            if (ModelState.IsValid)
            {
                Db.Client client = (from item in db.Clients where item.ClientId.Equals(CurrentClient.ClientId) select item).FirstOrDefault();

                client.DefaultTipMessage = model.DefaultTipMessage;
                db.SaveChanges();
                ViewData["Message"] = "Saved";
            }
            return View(model);
        }

        public ActionResult RewardOptions()
        {
            Models.Settings client = (from item in db.Clients
                                      where item.ClientId.Equals(CurrentClient.ClientId)
                                      select new Models.Settings
                                      {
                                          ClientId = item.ClientId,
                                          WithEmailReward = item.WithEmailReward,
                                          WithEmailUpdate = item.WithEmailUpdate
                                      }).FirstOrDefault();
            return View(client);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RewardOptions(Models.Settings model)
        {
            if (ModelState.IsValid)
            {
                Db.Client client = (from item in db.Clients where item.ClientId.Equals(CurrentClient.ClientId) select item).FirstOrDefault();
                client.WithEmailReward = model.WithEmailReward;
                client.WithEmailUpdate = model.WithEmailUpdate;
                db.SaveChanges();
                ViewData["Message"] = "Saved";
            }
            return View(model);
        }

        public ActionResult Design()
        {
            Models.Settings client = (from item in db.Clients
                                      where item.ClientId.Equals(CurrentClient.ClientId)
                                      select new Models.Settings
                                      {
                                          ClientId = item.ClientId,
                                          CustomColor1 = item.CustomColor1,
                                          CustomColor2 = item.CustomColor2,
                                          CustomColor3 = item.CustomColor3,
                                          CustomColor4 = item.CustomColor4,
                                          CustomStatus1 = item.CustomStatus1
                                      }).FirstOrDefault();
            return View(client);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Design(Models.Settings model)
        {
            if (ModelState.IsValid)
            {
                Db.Client client = (from item in db.Clients where item.ClientId.Equals(CurrentClient.ClientId) select item).FirstOrDefault();
                client.CustomColor1 = model.CustomColor1;
                client.CustomColor2 = model.CustomColor2;
                client.CustomColor3 = model.CustomColor3;
                client.CustomColor4 = model.CustomColor4;
                client.CustomStatus1 = model.CustomStatus1;
                db.SaveChanges();
                ViewData["Message"] = "Saved";
            }
            return View(model);
        }

        public ActionResult Advanced()
        {
            Models.Settings client = (from item in db.Clients
                                      where item.ClientId.Equals(CurrentClient.ClientId)
                                      select new Models.Settings
                                      {
                                          ClientId = item.ClientId,
                                          CallbackUrl = item.CallbackUrl
                                      }).FirstOrDefault();
            return View(client);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Advanced(Models.Settings model)
        {
            if (ModelState.IsValid)
            {
                Db.Client client = (from item in db.Clients where item.ClientId.Equals(CurrentClient.ClientId) select item).FirstOrDefault();
                client.CallbackUrl = model.CallbackUrl;
                db.SaveChanges();
                ViewData["Message"] = "Saved";
            }
            return View(model);
        }



    }
}
