using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace IngeniousCityBreakWeb.Controllers
{
    public class BaseApiController : ApiController
    {
        protected DependencyInjectionContainer DiContainer = DependencyInjectionContainer.GetInstance();
    }
}