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
        [HttpPost]
        public IHttpActionResult Create(UserDetailsDto usersDetailsDto) {
            var manager = DiContainer.Resolve<IUserDetailsManager>();
            manager.Create(usersDetailsDto);
            return Ok();
        }
    }
}