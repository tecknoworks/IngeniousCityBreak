﻿using BusinessLayer.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public static class Mapper
    {
        public static UserDetails FromDto(UserDetailsDto dto)
        {
            var res = new UserDetails()
            {
                Email = dto.Email,
                FirstName=dto.FirstName,
                LastName=dto.LastName,
                Country=dto.Country,
                City=dto.City,
                Address = dto.Address,
                Telephone=dto.Telephone
            };

            if (dto.Id.HasValue)
            {
                res.Id = dto.Id.Value;
            }

            return res;
        }

        public static void FromDto(UserDetails entity, UserDetailsDto dto)
        {

            entity.Email = dto.Email;
            entity.FirstName = dto.FirstName;
            entity.LastName = dto.LastName;
            entity.Country = dto.Country;
            entity.City = dto.City;
            entity.Address = dto.Address;
            entity.Telephone = dto.Telephone;
        }

        public static UserDetailsDto ToDto(UserDetails entity)
        {
            var res = new UserDetailsDto()
            {
                Id = entity.Id,
                Email=entity.Email,
                FirstName=entity.FirstName,
                LastName=entity.LastName,
                Country=entity.Country,
                City=entity.City,
                Address = entity.Address,
                Telephone=entity.Telephone
            };

            return res;
        }

        public static Route FromRouteDto(RouteDto dto)
        {
            var res = new Route()
            {
                RouteJson = dto.RouteJson
            };
            if (dto.IdRoute.HasValue)
            {
                res.IdRoute = dto.IdRoute.Value;
            }
            return res;
        }


        public static IEnumerable<RouteDto> ToRouteDto(this IEnumerable<Route> entities)
        {
            var results = entities.Select(it =>
            new RouteDto()
            {
                IdRoute = it.IdRoute,
                RouteJson = it.RouteJson
            });

            return results;
        }

        public static RouteDto ToRouteDtoId(Route route)
        {
            var dto = new RouteDto();
            dto.IdRoute = route.IdRoute;
            dto.RouteJson = route.RouteJson;
            return dto;
        }
        //13.04.2017
        public static IEnumerable<UserDetailsDto> ToUserDetailsDto(this IEnumerable<UserDetails> userDetails)
        {
            var res = userDetails.Select(p => new UserDetailsDto()
            {
                Id = p.Id,
                Email=p.Email,
                FirstName=p.FirstName,
                LastName=p.LastName,
                Country=p.Country,
                City=p.City,
                Address = p.Address,
                Telephone=p.Telephone
            });
            return res;
        }
        public static UserDetailsDto ToUserDetailsIdDto(UserDetails userDetails)
        {
            var dto = new UserDetailsDto();
            dto.Id = userDetails.Id;
            dto.Email = userDetails.Email;
            dto.FirstName = userDetails.FirstName;
            dto.LastName = userDetails.LastName;
            dto.Country = userDetails.Country;
            dto.City = userDetails.City;
            dto.Address = userDetails.Address;
            dto.Telephone = userDetails.Telephone;

            return dto;
        }

        public static UserDetailsDto ToUserDetailsEmailDto(UserDetails userDetails)
        {
            var dto = new UserDetailsDto();
            dto.Id = userDetails.Id;
            dto.Email = userDetails.Email;
            dto.FirstName = userDetails.FirstName;
            dto.LastName = userDetails.LastName;
            dto.Country = userDetails.Country;
            dto.City = userDetails.City;
            dto.Address = userDetails.Address;
            dto.Telephone = userDetails.Telephone;

            return dto;

        }

        public static City FromCityDto(CityDto cityDto)
        {
            var res = new City()
            {
                Name = cityDto.Name
            };
            if (cityDto.IdCity.HasValue)
            {
                res.IdCity = cityDto.IdCity.Value;
            }
            return res;
        }

        public static CityDto ToCityDto(City entity)
        {
            var res = new CityDto()
            {
                IdCity = entity.IdCity,
                Name = entity.Name,
            };
            return res;
        }

        public static TouristAttraction FromTouristAttractionDto(TouristAttractionDto dto)
        {
            var res = new TouristAttraction()
            {
                Name = dto.Name,
                PriceAdult = dto.PriceAdult,
                PriceChild = dto.PriceChild,
                Schedule = dto.Schedule
            };
            if (dto.IdTouristAttraction.HasValue)
            {
                res.IdTouristAttraction = dto.IdTouristAttraction.Value;
            }
            return res;
        }

        public static Country FromCountryDto(CountryDto dto)
        {
            var res = new Country()
            {
                Name = dto.Name

            };
            if (dto.IdCountry.HasValue)
            {
                res.IdCountry = dto.IdCountry.Value;
            }
            return res;
        }

        public static CountryDto ToCountryDto(Country entity)
        {
            var res = new CountryDto()
            {
                IdCountry = entity.IdCountry,
                Name = entity.Name

            };
            return res;
        }

        //27.04.2017
        public static TouristAttraction FromTouristAttractionDto(TouristAttractionDto dto, TouristAttraction entity)
        {
            entity.Name = dto.Name;
            entity.PriceChild = dto.PriceChild;
            entity.PriceAdult = dto.PriceAdult;
            entity.Schedule = dto.Schedule;
            entity.Image = dto.Image;
            return entity;
        }


        public static IEnumerable<TouristAttractionDto> ToTouristAttractionDtos(this IEnumerable<TouristAttraction> entities)
        {
            var results = entities.Select(it =>
            new TouristAttractionDto()
            {
                IdTouristAttraction = it.IdTouristAttraction,
                Name = it.Name,
                PriceChild = it.PriceChild,
                PriceAdult = it.PriceAdult,
                Schedule = it.Schedule,
                Image = "../../../Content/images/" + it.Image
            });

            return results;
        }

        public static TouristAttractionDto ToTouristAttractionDtosId(TouristAttraction touristAttraction)
        {
            var dto = new TouristAttractionDto();
            dto.IdTouristAttraction = touristAttraction.IdTouristAttraction;
            dto.PriceAdult = touristAttraction.PriceAdult;
            dto.PriceChild = touristAttraction.PriceChild;
            dto.Schedule = touristAttraction.Schedule;
            dto.Image = touristAttraction.Image;
            return dto;
        }

    }
}
