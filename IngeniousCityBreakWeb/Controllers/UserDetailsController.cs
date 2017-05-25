using BusinessLayer;
using Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace IngeniousCityBreakWeb.Controllers
{
    [Authorize]
    public class UserDetailsController : BaseApiController
    {
        private IUserManager UserManager;
        public UserDetailsController()
        {
            this.UserManager = this.DiContainer.Resolve<IUserManager>();
        }
        /// <summary>
        /// Create user details
        /// </summary>
        /// <param name="usersDetailsDto"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult Create(UserDetailsDto usersDetailsDto) {
            var userName = RequestContext.Principal.Identity.Name;
            usersDetailsDto.UserName = userName;
            var manager = DiContainer.Resolve<IUserManager>();
            manager.Update(usersDetailsDto);
            return Ok();
        }

        //13.04.2017
        /// <summary>
        /// Get user details
        /// </summary>
        /// <returns></returns>
        public IEnumerable<UserDetailsDto> Get() {
            var manager= UserManager.GetAll();
            return manager;
        }
        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserDetailsDto GetById(int id)
        {
            var manager = UserManager.GetByIdUser(id);
            return manager;
        }

        /// <summary>
        /// Get user by email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [Route("api/UserDetails")]
        public UserDetailsDto GetByEmail(string email)
        {
            var manager = UserManager.GetByEmailUser(email);
            return manager;
        }
    }
}