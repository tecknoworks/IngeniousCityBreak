using BusinessLayer;
using Contracts;
using DataAccessLayer;
using System;
using System.Linq;
using System.Web.Mvc;

namespace IngeniousCityBreakWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var container = DependencyInjectionContainer.GetInstance();
            var manager = container.Resolve<IUserManager>();

            IDbRepository<ApplicationUser> repo = new DbRepository<ApplicationUser>();
            var users = repo.GetAll().ToList();
            ViewBag.Title = "Home Page";
            return View();
        }
    }
}
