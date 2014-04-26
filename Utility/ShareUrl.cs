using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Utility
{
    public class ParseUrl
    {

        public static UrlInfo getUrlInfo(string url)
        {
            String respons = Utility.Web.WebRequest(Utility.Web.Method.GET, url, null);

            UrlInfo output = new UrlInfo();

            output.URL = url;
            output.Title = Regex.Match(respons, @"<title>\s*(.+?)\s*</title>").Groups[1].Value;

            Regex metaRegex = new Regex("(\\s)*<meta\\s*(?:(?:\\b(\\w|-)+\\b\\s*(?:=\\s*(?:[\"\"[^\"\"]*\"\"|'[^']*'|[^\"\"'<> ]|[''[^'']*''|\"[^\"]*\"|[^''\"<> ]]]+)\\s*)?)*)/?\\s*>", RegexOptions.IgnoreCase | RegexOptions.ExplicitCapture);

            foreach (Match metamatch in metaRegex.Matches(respons))
            {
                Regex submetaregex =
                    new Regex("(?<name>\\b(\\w|-)+\\b)\\s*=\\s*(''(?<value>[^'']*)''|\"\"(?<value>[^\"\"]*)\"\"|\"(?<value>[^\"]*)\"|'(?<value>[^']*)'|(?<value>[^''\"/<> ]+)\\s*|(?<value>[^\"\"'/<> ]+)\\s*)+",
                              RegexOptions.IgnoreCase |
                              RegexOptions.ExplicitCapture);

                string type = string.Empty, valuetype = string.Empty, value = string.Empty;

                foreach (Match submetamatch in submetaregex.Matches(metamatch.Value.ToString()))
                {

                    switch (submetamatch.Groups["name"].ToString().ToLower())
                    {
                        case "content":
                            value = submetamatch.Groups["value"].ToString();
                            break;
                        case "name":
                            type = submetamatch.Groups["name"].ToString();
                            valuetype = submetamatch.Groups["value"].ToString();
                            break;
                    }
                }

                if (type.Equals("name") && valuetype.Equals("description"))
                {
                    output.Description = value;
                }
            }
            return output;
        }
    }


    public class UrlInfo
    {
        public string URL { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
