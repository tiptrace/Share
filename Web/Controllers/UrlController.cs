using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Controllers
{
    public class UrlController : Controller
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        public ActionResult Index(String Url)
        {
            if (string.IsNullOrEmpty(Url))
                return HttpNotFound();

            string ClientHash = string.Empty;
            Db.Client client = null;
            int? clientid = null;

            if (!string.IsNullOrEmpty(Request.QueryString["cid"]))
                ClientHash = Request.QueryString["cid"].ToString();

            if (!string.IsNullOrEmpty(ClientHash))
                client = (from item in db.Clients where item.Hash == ClientHash select item).FirstOrDefault();

            if (client != null)
                clientid = client.ClientId;

            //check the database for the url
            Db.Url CheckUrl = db.GetUrlByValue(Url, clientid).FirstOrDefault(); //(from item in db.Urls where item.Value.Equals(Url) select item).FirstOrDefault();

            bool UpdateUrl = false;

            if (CheckUrl != null)
            {
                UpdateUrl  = CheckUrl.DateUpdated <= DateTime.Now.AddDays(-7);
            }

           if (CheckUrl == null || UpdateUrl)
            {
                if (!UpdateUrl)
                    CheckUrl = new Db.Url();

                //get the site..& parse the content
                Utility.UrlInfo UrlInfo = Utility.ParseUrl.getUrlInfo(Url);

                CheckUrl.Value = UrlInfo.URL;
                CheckUrl.Title = UrlInfo.Title;
                CheckUrl.Description = UrlInfo.Description;
                CheckUrl.DateUpdated = DateTime.Now;

                //save the content
                if (!UpdateUrl)
                {
                    CheckUrl.ViewCount = 1;
                    CheckUrl.DateAdded = DateTime.Now;

                    Db.UrlView FirstView = new Db.UrlView();
                    FirstView.DateAdded = DateTime.Now;
                    FirstView.ClientId = clientid;
                    CheckUrl.UrlViews.Add(FirstView);

                    db.Urls.AddObject(CheckUrl);
                }

                db.SaveChanges();
            }

            Models.Url output = new Models.Url();
            output.Id = CheckUrl.UrlId;
            output.Value = CheckUrl.Value;
            output.Title = HttpUtility.HtmlDecode(CheckUrl.Title); //wellicht deze regel alleen bij sharen van linkedin?
            output.Description = HttpUtility.HtmlDecode(CheckUrl.Description);

            //System.Threading.Thread.Sleep(1000);

            //output the correct
            return Json(output, JsonRequestBehavior.AllowGet);
        }
    }
}
