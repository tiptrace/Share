using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Button.Controllers
{
    public class ScriptController : Controller
    {
        //
        // GET: /Script/

        public ActionResult Index()
        {
            Response.ContentType = "text/javascript";
            return View();
        }

        public ActionResult Plugin()
        {
            Response.ContentType = "text/javascript";
            return View();
        }

        public ActionResult Lib()
        {
            //System.Threading.Thread.Sleep(2000);

            string type = string.Empty;

            if (!String.IsNullOrEmpty(Request.QueryString["type"]))
                type = Request.QueryString["type"].ToString().ToLower();

            ViewBag.Type = type;

            Response.ContentType = "text/javascript";
            return View();
        }

    }
}
