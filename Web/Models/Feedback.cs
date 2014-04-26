using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class Feedback
    {

        public string ClientHash { get; set; }
        public string TargetsJson { get; set; }
        public string UrlJson { get; set; }

    }
}