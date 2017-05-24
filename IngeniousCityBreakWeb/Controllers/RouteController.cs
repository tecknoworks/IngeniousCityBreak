using BusinessLayer.Dto;
using Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace IngeniousCityBreakWeb.Controllers
{
    public class RouteController : BaseApiController
    {
        public IRouteManager iRouteManeger;
        public RouteController()
        {
            this.iRouteManeger = this.DiContainer.Resolve<IRouteManager>();
        }


        /// <summary>
        /// Create a new route
        /// </summary>
        /// <param name="routeDto"></param>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        [Route("api/InsertRoute")]
        public IHttpActionResult InsertRoute(RouteDto routeDto)
        {
            iRouteManeger.insert(routeDto);
            return Ok(100);
        }
        /// <summary>
        /// Get all routes
        /// </summary>
        /// <returns>All routes</returns>
        [System.Web.Http.HttpGet]

        public IEnumerable<RouteDto> GetAll()
        {
            var result = iRouteManeger.GetAll();
            return result;
        }

        /// <summary>
        /// Get route by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public IEnumerable<RouteDto> GetRouteById(int id)
        {
            var result = iRouteManeger.GetByIdRoute(id);
            yield return result;
        }

    }
}