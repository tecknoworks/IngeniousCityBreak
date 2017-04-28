using BusinessLayer;
using BusinessLayer.Dto;
using Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;

namespace IngeniousCityBreakWeb.Controllers
{
    public class TouristAttractionController : BaseApiController
    {
        public ITouristAttraction iTouristAttractions;
        public TouristAttractionController()
        {
            this.iTouristAttractions = this.DiContainer.Resolve<ITouristAttraction>();
        }

        /// <summary>
        /// Create a new tourist attraction
        /// </summary>
        /// <param name="touristAttraction"></param>
        /// <returns></returns>
        [System.Web.Http.HttpPost]
        public IHttpActionResult InsertTouristAttraction(TouristAttractionDto touristAttractionDto)
        {
            iTouristAttractions.Insert(touristAttractionDto);
            return Ok(100);
        }
        /// <summary>
        /// Get all tourist attractions
        /// </summary>
        /// <returns>All tourist ttractions</returns>
        [System.Web.Http.HttpGet]
       
        public IEnumerable<TouristAttractionDto> GetAll()
        {
            var result = iTouristAttractions.GetAll();
            return result;
        }

        /// <summary>
        /// Get tourist attractions by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public IEnumerable<TouristAttractionDto> GetTouristAttractionId(int id)
        {
            var result = iTouristAttractions.GetByIdTouristAttraction(id);
            yield return result;
        }
    }
}