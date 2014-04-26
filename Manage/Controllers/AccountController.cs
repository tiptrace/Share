using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;


namespace Manage.Controllers
{
    [Authorize]
    public class AccountController : BaseController
    {

        //
        // GET: /Account/Login

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Models.LoginModel model, string returnUrl)
        {

            using (var db = new Db.TipTraceEntities())
            {
                if (ModelState.IsValid && Membership.ValidateUser(model.Email, model.Password))
                {
                    if ((from item in db.Clients where item.Email.Equals(model.Email) && item.IsValidated select item).Count() > 0)
                    {
                        FormsAuthentication.RedirectFromLoginPage(model.Email, model.RememberMe);
                    }
                    else
                    {
                        ModelState.AddModelError("", "Your account has not been activated yet; click the link you recieved in your email");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "The user name or password provided is incorrect.");
                }
            }

            return View(model);
        }

        //
        // GET: /Account/Logout
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return RedirectToAction("Index", "Default");
        }

        //
        // GET: /Account/SignUp

        [AllowAnonymous]
        public ActionResult SignUp()
        {
            return View(new Models.SignUpModel());
        }

        //
        // GET: /Account/SignUpFinished

        [AllowAnonymous]
        public ActionResult SignUpFinished()
        {
            return View();
        }

        //
        // POST: /Account/SignUp

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult SignUp(Models.SignUpModel model)
        {
            using (var db = new Db.TipTraceEntities())
            {
                if (ModelState.IsValid)
                {
                    //double email check
                    if ((from item in db.Clients where item.Email.Equals(model.Email) select item.Email).Count() > 0)
                    {
                        ModelState.AddModelError("", "This email you provided is already known");
                    }
                    else
                    {
                        //save the client
                        string ValidateHash = db.SaveClient(1, model.Name, model.Url, model.Email, model.Password).FirstOrDefault();

                        //send email

                        string EmailBody = (from setting in db.Settings where setting.Name == "template_email_admin" select setting.Value).FirstOrDefault();
                        //string EmailBody = "Welcome to tiptrace,<br/><br/>You are almost set up!<br/><br/>Click on the following link to activate your account:<br/>";

                        EmailBody = EmailBody.Replace("{Link}", string.Format("http://{0}/Account/Validate/{1}", Request.Url.DnsSafeHost, ValidateHash));

                        //EmailBody += string.Format("http://{0}/Account/Validate/{1}", Request.Url.DnsSafeHost, ValidateHash);
                        Utility.Email.SendEmail("no-reply@tiptrace.com", "TipTrace", model.Email, model.Name, "Welcome to TipTrace", EmailBody);

                        return RedirectToAction("SignUpFinished");
                    }

                }
            }
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult Validate(string id)
        {

            using (var db = new Db.TipTraceEntities())
            {
                Db.Client client = (from item in db.Clients where item.ValidateHash.Equals(id) select item).FirstOrDefault();

                if (client == null)
                {
                    //verkeerde code, niks doen, maar wel melding geven
                    ViewData["ErrorMessage"] = "Message";
                }
                else
                {
                    //goede code, updaten
                    client.IsValidated = true;
                    client.DateEdited = DateTime.Now;

                    db.SaveChanges();
                }
            }
            return View();
        }

        public ActionResult Manage()
        {
            using (var db = new Db.TipTraceEntities())
            {
                Models.PersonalModel client = (from item in db.Clients
                                               where item.ClientId.Equals(CurrentClient.ClientId)
                                               select new Models.PersonalModel
                                          {
                                              ClientId = item.ClientId,
                                              Name = item.Name,
                                              Url = item.WebsiteUrl
                                          }).FirstOrDefault();
            return View(client);
            }
        }

        //
        // POST: /Manage/
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Manage(Models.PersonalModel model)
        {
            using (var db = new Db.TipTraceEntities())
            {
                if (ModelState.IsValid)
                {
                    Db.Client client = (from item in db.Clients where item.ClientId.Equals(CurrentClient.ClientId) select item).FirstOrDefault();
                    client.Name = model.Name;
                    client.WebsiteUrl = model.Url;

                    db.SaveChanges();

                    ViewData["Message"] = "Saved";
                }
            }
            return View(model);
        }

    }
}
