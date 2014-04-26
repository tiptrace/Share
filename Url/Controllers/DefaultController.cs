using System;
using System.Text;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections.Specialized;

namespace Url.Controllers
{
    public class DefaultController : Controller
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        public ActionResult Index(string UrlCode)
        {
            if (String.IsNullOrEmpty(UrlCode))
                return HttpNotFound();

            Db.Url Url = db.GetUrlByCode(UrlCode, Request.UserAgent).FirstOrDefault();

            if (Url == null)
                return HttpNotFound();

            //process the url with the utm codes
            Uri url = new Uri(Url.Value);
            StringBuilder UrlBuilder = new StringBuilder();
            StringBuilder QuerystringBuilder = new StringBuilder();
            string UrlWithoutQuerystring = (Url.Value.IndexOf("?") > 0) ? Url.Value.Substring(0, Url.Value.IndexOf("?")) : Url.Value;
            UrlBuilder.Append(UrlWithoutQuerystring);
            UrlBuilder.Append("?");
            
            bool hasUtmSource = false;
            bool hasUtmMedium = false;
            bool hasUtmCampaign = false;

            NameValueCollection QuerystringCollection = HttpUtility.ParseQueryString(url.Query);
            foreach (string s in QuerystringCollection)
            {
                switch (s.ToLower())
                {
                    case "utm_source":
                        QuerystringBuilder.Append("utm_source=tiptrace.com&");
                        hasUtmSource = true;
                        break;
                    //case "utm_medium":
                    //    QuerystringBuilder.Append("utm_medium=tiptrace_share&");
                    //    hasUtmMedium = true;
                    //    break;
                    //case "utm_campaign":
                    //    QuerystringBuilder.Append("utm_campaign=tiptrace&");
                    //    hasUtmCampaign = true;
                    //    break;
                    default:
                    QuerystringBuilder.AppendFormat("{0}={1}&", s, QuerystringCollection[s]);
                    break;
                }

            }

            if (!hasUtmSource)
                QuerystringBuilder.Append("utm_source=tiptrace.com&");

            //if (!hasUtmMedium)
            //    QuerystringBuilder.Append("utm_medium=tiptrace_share&");
            
            //if (!hasUtmCampaign)
            //    QuerystringBuilder.Append("utm_campaign=tiptrace&");

            UrlBuilder.Append(QuerystringBuilder.ToString());

            return Redirect(UrlBuilder.ToString().TrimEnd('&'));
        }
    }
}
