using BusinessLayer.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IRouteManager
    {
        void insert(RouteDto routeDto);

        IEnumerable<RouteDto> GetAll();
        RouteDto GetByIdRoute(int id);
    }
}
