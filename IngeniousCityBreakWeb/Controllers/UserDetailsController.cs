using BusinessLayer;
using Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace IngeniousCityBreakWeb.Controllers
{
    public class UserDetailsController : BaseApiController
    {
        //13.04.2017
        private IUserDetailsManager UserManager;

        //13.04.2017
        public UserDetailsController()
        {
            this.UserManager = this.DiContainer.Resolve<IUserDetailsManager>();
        }
        /// <summary>
        /// Create user details
        /// </summary>
        /// <param name="usersDetailsDto"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult Create(UserDetailsDto usersDetailsDto) {
            var manager = DiContainer.Resolve<IUserDetailsManager>();
            manager.Create(usersDetailsDto);
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
    }
}