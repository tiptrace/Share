using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class BaseController : Controller
    {
        protected string UserHash {
            get {
                if (Request.Cookies["TipTraceHash"] != null) {
                    return Request.Cookies["TipTraceHash"].Value;
                }
                return string.Empty;
            }
            set {
                Response.Cookies.Add(new HttpCookie("TipTraceHash", value));

            }
        }
    }
}
