using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Web.Models
{
    public class Share
    {

        public string Message { get; set; }
        public string TargetsJson { get; set; }
        public string UrlJson { get; set; }
        public string Status { get; set; }
        public string ClientHash { get; set; }
        public string ManualName { get; set; }
        public string ManualEmail { get; set; }
        public int ShareSessionId { get; set; }
        public IEnumerable<Target> Targets
        {
            get
            {
                if (!string.IsNullOrEmpty(this.TargetsJson))
                {
                    List<Target> output = new List<Target>();
                    output = JsonConvert.DeserializeObject<List<Target>>(this.TargetsJson);
                    return output;
                }
                return new List<Target>();

            }
        }

        public Url Url  {
            get {
                if (!string.IsNullOrEmpty(this.UrlJson))
                {
                    Url output = new Url();
                    output = JsonConvert.DeserializeObject<Url>(this.UrlJson);
                    return output;
                }
                return new Url();
            }
        }

    }
}