using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;
using System.Text;

namespace Web.Controllers
{
    public class DefaultController : BaseController
    {

        private Db.TipTraceEntities db = new Db.TipTraceEntities();
        private Facebook Facebook = new Facebook();
        private LinkedIn LinkedIn = new LinkedIn();
        private Twitter Twitter = new Twitter();


        public ActionResult Index()
        {

            string Url = string.Empty;
            string ClientHash = string.Empty;
            Db.Client client = null;

            //Client Settings
            bool clientWithEmailReward = false;
            bool clientWithEmailUpdate = false;
            string DefaultTipMessage = "";
            string clientColor1 = "";
            string clientColor2 = "";
            string clientColor3 = "";
            string clientColor4 = "";
            bool clientStatus1 = false;
            int clientId = 0;

            if (!string.IsNullOrEmpty(Request.QueryString["url"]))
                Url = Request.QueryString["url"].ToString();

            if (!string.IsNullOrEmpty(Request.QueryString["cid"]))
                ClientHash = Request.QueryString["cid"].ToString();

            if (!string.IsNullOrEmpty(ClientHash))
                client = (from item in db.Clients where item.Hash == ClientHash select item).FirstOrDefault();
                
            //test client
            //client = (from item in db.Clients where item.ClientId == 10 select item).FirstOrDefault();

            ViewBag.Url = Url;
            ViewBag.ClientHash = ClientHash;

            if (client != null)
            {
                if (client.ClientType.Level >= 5) //Basic
                {
                    clientWithEmailReward = client.WithEmailReward;
                    clientWithEmailUpdate = client.WithEmailUpdate;
                    clientColor1 = client.CustomColor1;
                    clientColor2 = client.CustomColor2;
                    clientColor3 = client.CustomColor3;
                    clientColor4 = client.CustomColor4;
                    clientStatus1 = client.CustomStatus1;
                    clientId = client.ClientId;
                    if (!string.IsNullOrEmpty(client.DefaultTipMessage))
                        DefaultTipMessage = client.DefaultTipMessage;
                }
            }

            ViewBag.ClientId = clientId;
            ViewBag.ClientSettings_WithEmailReward = clientWithEmailReward.ToString().ToLower();
            ViewBag.ClientSettings_WithEmailUpdate = clientWithEmailUpdate.ToString().ToLower();
            ViewBag.ClientSettings_DefaultTipMessage = DefaultTipMessage;
            ViewBag.ClientSettings_Color1 = clientColor1;
            ViewBag.ClientSettings_Color2 = clientColor2;
            ViewBag.ClientSettings_Color3 = clientColor3;
            ViewBag.ClientSettings_Color4 = clientColor4;
            ViewBag.ClientSettings_Status1 = clientStatus1;

            return View(new Web.Models.Share()); 
        }


        [HttpPost]
        public ActionResult Index(Web.Models.Share share)
        {
            bool WithFacebookShare = false;
            string Response = string.Empty ;
            //process the Userhash if email is send
            string EmailIdentifier = share.ManualEmail;
            string EmailName = share.ManualName;
            if (!string.IsNullOrEmpty(EmailIdentifier) && !string.IsNullOrEmpty(EmailName)) {
                Db.User EmailUser = db.ProcessToken(this.UserHash, 6, EmailIdentifier, EmailName, EmailIdentifier, string.Empty, string.Empty, string.Empty).FirstOrDefault();
                this.UserHash = EmailUser.Hash;
            }

            //Save the session, and get the sharesessionId
            int? ShareSessionId = db.SaveShareSession(this.UserHash, share.Url.Id, share.ClientHash, share.Message).FirstOrDefault();
            int ShareCounter = 0;

            List<string> UrlCodes = db.GetUniqueUrlCodes(share.Targets.Count()).ToList();

            if (ShareSessionId.HasValue) {

                foreach (Target item in share.Targets.Take(10))
                {
                    Db.Share DbShare = new Db.Share();

                    try
                    {

                        string ShortUrl = String.Format("http://link.tiptrace.com/{0}", UrlCodes[ShareCounter].ToString());

                        //store in DB
                        DbShare.TargetTypeId = item.SourceType;
                        DbShare.TargetId = item.Identifier;
                        DbShare.TargetName = item.Name;
                        DbShare.DateAdded = DateTime.Now;
                        DbShare.ShareSessionId = ShareSessionId.Value;
                        DbShare.ShortUrl = UrlCodes[ShareCounter].ToString();


                        if (item.SourceType == 1) //facebook
                        {
                            Facebook.Postmessage(this.UserHash, item.Identifier, share.Message, share.Url, ShortUrl);
                            WithFacebookShare = true;
                            //throw new Exception("FOUT!!");
                        }
                        if (item.SourceType == 2) //linkedin
                        {
                            Response = LinkedIn.Postmessage(this.UserHash, item.Identifier, share.Message, share.Url, ShortUrl);
                        }
                        if (item.SourceType == 5) //twitter
                        {
                            Response = Twitter.Postmessage(this.UserHash, item.Identifier, share.Message, share.Url, ShortUrl);
                        }
                        if (item.SourceType == 3 || item.SourceType == 4) //Google || Hotmail
                        {
                            //Get the name of the sharer
                            Db.UserSource Source = (from usersource in db.UserSources where usersource.User.Hash == this.UserHash && usersource.SourceTypeId == item.SourceType select usersource).FirstOrDefault();

                            //Load and parse the template
                            string EmailTemplate = getEmailTemplate(share.ClientHash);
                            string EmailContent = EmailTemplate.Replace("{SourceName}", Source.Name);
                            EmailContent = EmailContent.Replace("{SourceEmail}", Source.Identifier);
                            EmailContent = EmailContent.Replace("{TargetName}", item.Name);
                            EmailContent = EmailContent.Replace("{TargetEmail}", item.Identifier);
                            EmailContent = EmailContent.Replace("{Link}", string.Format("<a href='{0}'>{1}</a>", ShortUrl, share.Url.Value));
                            EmailContent = EmailContent.Replace("{Message}", share.Message);

                            Utility.Email.SendEmail(Source.Identifier, Source.Name, item.Identifier, item.Name, string.Format("Tip from {1}: {0}", share.Url.Title, Source.Identifier), EmailContent);
                        }
                        if (item.SourceType == 6) //email
                        {

                            //Load and parse the template
                            string EmailTemplate = getEmailTemplate(share.ClientHash);
                            string EmailContent = EmailTemplate.Replace("{SourceName}", EmailName);
                            EmailContent = EmailContent.Replace("{SourceEmail}", EmailIdentifier);
                            EmailContent = EmailContent.Replace("{TargetName}", item.Name);
                            EmailContent = EmailContent.Replace("{TargetEmail}", item.Identifier);
                            EmailContent = EmailContent.Replace("{Link}", string.Format("<a href='{0}'>{1}</a>", ShortUrl, share.Url.Value));
                            EmailContent = EmailContent.Replace("{Message}", share.Message);

                            //Send the email
                            Utility.Email.SendEmail(EmailIdentifier, EmailName, item.Identifier, item.Name, string.Format("Tip from {1}: {0}", share.Url.Title, EmailIdentifier), EmailContent);
                        }

                        DbShare.ShareStatusID = 1;
                        share.Status = "succes";

                    }
                    catch (Exception ex)
                    {
                        DbShare.ShareStatusID = 2;
                        DbShare.ShareStatus = ex.Message + "" + Response;
                        share.Status = "failed" + ex.Message;
                    }
                    finally
                    {
                        db.Shares.AddObject(DbShare);
                    }


                    ShareCounter++;
                }    
                db.SaveChanges();

                share.ShareSessionId = ShareSessionId.Value;

                if (WithFacebookShare)
                    Facebook.CloseChatConnection();
            }

            return Json(share, JsonRequestBehavior.AllowGet);

        }

        private string getEmailTemplate(string ClientHash)
        {
            string Template = string.Empty;
            if (!string.IsNullOrEmpty(ClientHash))
            {
                //Searching for custom template
                Template = (from client in db.Clients where client.Hash == ClientHash select client.CustomEmailTemplate).FirstOrDefault();
            }

            if (string.IsNullOrEmpty(Template))
                Template = (from setting in db.Settings where setting.Name == "template_email" select setting.Value).FirstOrDefault();

            return Template;
        }

        [HttpPost]
        public ActionResult Feedback()
        {
            string Options = string.Empty;
            string Email = string.Empty;
            int ShareSessionId = 0;

            if (!String.IsNullOrEmpty(Request.Form["FeedbackOption"]))
                Options = Request.Form["FeedbackOption"].ToString();

            if (!String.IsNullOrEmpty(Request.Form["FeedbackEmail"]))
                Email = Request.Form["FeedbackEmail"].ToString();

            if (!String.IsNullOrEmpty(Request.Form["FeedbackShareSessionId"]))
                    int.TryParse(Request.Form["FeedbackShareSessionId"], out ShareSessionId);

            db.SaveFeedback(ShareSessionId, Email, Options.Contains("reward"), Options.Contains("update"));

            return Content(ShareSessionId.ToString());
        }

    }
}
