using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class Target
    {
        public string Identifier { get; set; }
        public string Name { get; set; }
        public int SourceType { get; set; }
        public string Network { get; set; }
        public string ProfilePicure { get; set; }
        public string ShareStatus { get; set; }
    }
}