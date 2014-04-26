using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Web.Models
{
    public class Email
    {

        private Db.TipTraceEntities db = new Db.TipTraceEntities();

        public List<Target> getContacts(string UserHash)
        {
            List<Target> output = new List<Target>();

            
            Db.UserSource usersource = (from item in db.UserSources where item.User.Hash == UserHash && item.SourceTypeId == 6 select item).FirstOrDefault();


            var EmailList = (from item in db.Shares where item.ShareSession.UserId == usersource.UserId && item.TargetTypeId == 6 select new { item.TargetId, item.TargetName }).Distinct();

                
            foreach (var item in EmailList)
            {
                output.Add(new Target { Identifier = item.TargetId, Name = item.TargetName, ProfilePicure = string.Empty, SourceType = 6, Network = "Email" });
            }

            return output;
        }

    }
}