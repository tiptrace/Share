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

    public class LoginModel
    {
        [Required(ErrorMessage="Email is required")]
        [RegularExpression("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",ErrorMessage="Email is not valid")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class SignUpModel
    {
        [Required(ErrorMessage = "Name of your site is required")]
        [Display(Name = "Website Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Url of your site is required")]
        [Display(Name = "Website URL")]
        public string Url { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [RegularExpression("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", ErrorMessage = "Email is not valid")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public SignUpModel()
        {
            this.Url = "http://";
        }
    }

    public class PersonalModel
    {
        public int ClientId { get; set; }

        [Required(ErrorMessage = "Name of your site is required")]
        [Display(Name = "Website Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Url of your site is required")]
        [Display(Name = "Website URL")]
        public string Url { get; set; }

    }

}