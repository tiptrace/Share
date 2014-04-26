using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Manage.Controllers
{
    public class BaseController : Controller
    {

        //protected Db.TipTraceEntities db = new Db.TipTraceEntities();

        private bool ClientIsLoaded = false;
        private Db.Client _CurrentClient;
        private Int32? _CurrentClientId;

        protected Db.Client CurrentClient { 
            get {
                using (var db = new Db.TipTraceEntities())
                {
                    if (!ClientIsLoaded && User.Identity.IsAuthenticated)
                    {
                        _CurrentClient = (from item in db.Clients.Include("ClientType") where item.Email.Equals(User.Identity.Name) select item).FirstOrDefault();
                    }
                }
                ClientIsLoaded = true;
                return _CurrentClient;
            } 
        }

        protected Int32? CurrentClientId { 
            get { 
                if (CurrentClient != null) {
                    _CurrentClientId = CurrentClient.ClientId;
                    if (User.IsInRole("admin"))
                        _CurrentClientId = null;
                }
                return _CurrentClientId;
            }
        }

        [ChildActionOnly]
        public ActionResult HeaderLoginData()
        {

            ViewBag.ClientType = CurrentClient.ClientType.Name.ToString();

            return PartialView(); //Content(CurrentClientId.ToString());
        }

    }
}
