using BusinessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IUserManager
    {
        void Create(UserDetailsDto userDetailsDto);

        IEnumerable<UserDetailsDto> GetAll();

        UserDetailsDto GetByIdUser(int id);
        void AddUserDetails(ApplicationUser user);
    }
}
