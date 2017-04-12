using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class Mapper
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
    }
}
