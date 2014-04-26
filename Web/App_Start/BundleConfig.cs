using System.Web;
using System.Web.Optimization;

namespace Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/base").Include(
                        "~/Content/Javascript/jquery*",
                        "~/Content/Javascript/json2*"));

            bundles.Add(new ScriptBundle("~/bundles/tiptrace").Include(
                        "~/Content/Javascript/Lib*",
                        "~/Content/Javascript/Base.2*"));


            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/Styles").Include("~/Content/Css/Responsive.css"));

        }
    }
}