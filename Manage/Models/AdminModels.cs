using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Web.Mvc;
using System.Web.Security;
namespace Manage.Models
{
    public class ClientFilter
    {

        [Display(Name = "Filter")]
        public string Filter { get; set; }

        [Display(Name = "Type")]
        public int ClientTypeId { get; set; }

    }
}