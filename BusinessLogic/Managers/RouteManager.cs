using Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Dto;
using DataAccessLayer;
using BusinessLayer;

namespace BusinessLogic
{
    public class RouteManeger : IRouteManager
    {
        private IDbRepository<BusinessLayer.Route> _routeRepository { get; set; }

        public RouteManeger(IDbRepository<BusinessLayer.Route> routeRepository)
        {
            _routeRepository = routeRepository;
        }
        public void insert(RouteDto routeDto)
        {
            Route ent = new Route();
            Route rez = Mapper.FromRouteDto(routeDto);
            _routeRepository.Insert(rez);
            _routeRepository.Save();
        }
        public IEnumerable<RouteDto> GetAll()
        {
            var result = _routeRepository.GetAll().ToRouteDto();
            return result;
        }

        public RouteDto GetByIdRoute(int id)
        {
            var result = Mapper.ToRouteDtoId(_routeRepository.GetById(id));
            return result;
        }


    }
}
