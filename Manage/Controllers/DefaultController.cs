using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Manage.Controllers
{
    [Authorize]
    public class DefaultController : BaseController
    {
        //
        // GET: /Default/
        
        public ActionResult Index()
        {
            return View(); //Content(CurrentClientId.ToString());
        }

    }
}
