using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace Manage.Models
{
    public class Settings
    {
        public int ClientId { get; set; }

        [Display(Name = "Default tip message")]
        [DataType(DataType.MultilineText)]
        [MaxLength(500, ErrorMessage = "Default Message has to be less than 500 characters")]
        public string DefaultTipMessage { get; set; }

        [Display(Name = "Custom email template")]
        [DataType(DataType.MultilineText)]
        [MaxLength(7500, ErrorMessage = "Email template has to be less than 7500 characters")]
        public string CustomEmailTemplate { get; set; }

        [Display(Name = "Ask for email so that the tipper can be rewarded")]
        public bool WithEmailReward {get; set;}

        [Display(Name = "Ask for email so that the tipper can be notified on updates")]
        public bool WithEmailUpdate { get; set; }

        [Display(Name = "Heading color")]
        [DataType(DataType.Text)]
        [RegularExpression("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = "Please provide a valid color")]
        public string CustomColor1 { get; set; }

        [Display(Name = "Button color (border)")]
        [DataType(DataType.Text)]
        [RegularExpression("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = "Please provide a valid color")]
        public string CustomColor2 { get; set; }

        [Display(Name = "Button color (background)")]
        [DataType(DataType.Text)]
        [RegularExpression("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = "Please provide a valid color")]
        public string CustomColor3 { get; set; }

        [Display(Name = "Button color (text)")]
        [DataType(DataType.Text)]
        [RegularExpression("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = "Please provide a valid color")]
        public string CustomColor4 { get; set; }

        [Display(Name = "Remove the Tiptrace logo from the footer")]
        public bool CustomStatus1 { get; set; }

        [Display(Name = "Callback Url")]
        [DataType(DataType.Text)]
        public string CallbackUrl { get; set; }
    }


    public class AdminSettings
    {

        public int SettingId { get; set; }

        [Display(Name = "Name")]
        [Required]
        public string Name { get; set; }

        [Display(Name = "Value")]
        [DataType(DataType.MultilineText)]
        [Required]
        public string Value { get; set; }
    }
}