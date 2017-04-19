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
    }
}
