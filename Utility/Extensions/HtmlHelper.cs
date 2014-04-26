using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Utility.Extensions
{
    public static class StringExtensions
    {
        public static String Cut(this string input, int lenght)
        {
            if (input.Length <= lenght)
                return input;

            return input.Substring(0, lenght) + "...";
        }
    }


    public static class HtmlExtensions
    {
        public static String CutString(this HtmlHelper helper, string input, int lenght)
        {
            if (input.Length <= lenght)
                return input;

            return input.Substring(0, lenght) + "...";
        }
    }
}
