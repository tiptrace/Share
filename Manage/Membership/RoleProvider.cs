using System;
using System.Collections.Specialized;
using System.Linq;
using System.Data.Entity;
using System.Web;
using System.Web.Caching;
using System.Web.Security;
using System.Collections.Generic;

namespace TipTrace.Membership
{
    class TipTraceRoleProvider : RoleProvider
    {
        private Db.TipTraceEntities db = new Db.TipTraceEntities();


        public override bool IsUserInRole(string username, string roleName)
        {
            var userRoles = GetRolesForUser(username);
            return userRoles.Contains(roleName);
        }

        public override string[] GetRolesForUser(string username)
        {

            //TODO: add caching

            List<string> roles = new List<string>();

            Db.Client client = (from item in db.Clients where item.Email.Equals(username) select item).FirstOrDefault();

            if (client != null)
            {
                if (client.ClientType.Level >= 1)
                    roles.Add("free");
                if (client.ClientType.Level >= 5)
                    roles.Add("basic");
                if (client.ClientType.Level >= 10)
                    roles.Add("extended");
                if (client.ClientType.Level >= 100)
                    roles.Add("admin");
            }
            return roles.ToArray();
        }

#region Not Implemented (yet)

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }


        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }

#endregion

    }
}
