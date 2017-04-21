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
                Adress = dto.Adress,
                CardNumber = dto.CardNumber
            };

            if (dto.Id.HasValue)
            {
                res.Id = dto.Id.Value;
            }

            return res;
        }

        public static UserDetailsDto ToDto(UserDetails entity)
        {
            var res = new UserDetailsDto()
            {
                Id = entity.Id,
                Adress = entity.Adress,
                CardNumber = entity.CardNumber
            };

            return res;
        }

        //13.04.2017
        public static IEnumerable<UserDetailsDto> ToUserDetailsDto(this IEnumerable<UserDetails> userDetails) {
            var res = userDetails.Select(p => new UserDetailsDto(){
                Id = p.Id,
                Adress = p.Adress,
                CardNumber = p.CardNumber 
            });
            return res;
        }
        public static UserDetailsDto ToUserDetailsIdDto(UserDetails userDetails)
        {
            var dto = new UserDetailsDto();
            dto.Id = userDetails.Id;
            dto.Adress = userDetails.Adress;
            dto.CardNumber = userDetails.CardNumber;

            return dto;
        }

        public static City FromCityDto(CityDto cityDto) {
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

        public static CityDto ToCityDto(City entity) {
            var res = new CityDto() {
                IdCity = entity.IdCity,
                Name = entity.Name,
            };
            return res;
        }

        public static TouristAttraction FromTouristAttractionDto(TouristAttractionDto dto) {
            var res = new TouristAttraction()
            {
                Name = dto.Name,
                PriceAdult = dto.PriceAdult,
                PriceChild = dto.PriceChild,
                Schedule = dto.Schedule
            };
            if (dto.IdTouristAttraction.HasValue) {
                res.IdTouristAttraction = dto.IdTouristAttraction.Value;
            }
            return res;
        }

        public static TouristAttractionDto ToTouristAttractionDto(TouristAttraction entity) {
            var res = new TouristAttractionDto() {
                IdTouristAttraction = entity.IdTouristAttraction,
                Name = entity.Name,
                PriceAdult = entity.PriceAdult,
                PriceChild = entity.PriceChild,
                Schedule = entity.Schedule
            };
            return res;
        }

    }
}
