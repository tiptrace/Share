using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Mail;
using System.Configuration;

//using MailChimp;
//using MailChimp.Types;
//using MN = MailChimp.Types.Mandrill;

namespace Utility
{
    public class Email
    {

        public static bool SendEmail(string from_email, string from_name, string to_email, string to_name, string subject, string content)
        {
            try
            {
                MailMessage Message = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.mandrillapp.com");
                SmtpServer.Port = 587;


                SmtpServer.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["Mandrill.UserName"],
                                                                          ConfigurationManager.AppSettings["Mandrill.Password"]);

                Message.From = new MailAddress(from_email, from_name);
                Message.To.Add(new MailAddress(to_email, to_name));

                Message.Subject = subject;
                Message.Body = content;
                Message.IsBodyHtml = true;

                SmtpServer.Send(Message);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }


            //var api = new MandrillApi(ConfigurationManager.AppSettings["Mandrill.Password"]);


            //var message = new MN.Messages.Message();

            //message.Subject = subject;
            //message.FromEmail = replyto_email;
            //message.FromName = replyto_email;
            //message.To = new[] { new MN.Messages.Recipient(to_email, to_name) };

            //message.Html = content;
            //message.TrackClicks = false;


            // "Reply-To" a single email
            //if (replyto_email != null) {
            //    message.Headers = new MCDict<MN.Messages.Header> { { "Reply-To", replyto_email }};
            //}


            //try {
            //    api.Send(message);
            //    return true;
            //}
            //catch (Exception ex) {
            //    return false;
            //}

        }

    }
}
