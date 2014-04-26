using System.Web;
using System.Web.Optimization;

namespace Manage
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/base").Include(
                        "~/Content/Javascript/jquery*",
                        "~/Content/Javascript/json2*",
                        "~/Content/Javascript/spectrum*"));


            bundles.Add(new ScriptBundle("~/bundles/highchart").Include(
                        "~/Content/Javascript/highchart*"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/Styles/Default.css", 
                                                                 "~/Content/Styles/spectrum.css",
                                                                 "~/Content/Styles/jquery*"));
            bundles.Add(new StyleBundle("~/Content/notLoggedOn").Include("~/Content/Styles/NotloggedOn.css"));

        }
    }
}