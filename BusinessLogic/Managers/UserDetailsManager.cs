using Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer;
using DataAccessLayer;

namespace BusinessLogic
{
    public class UserDetailsManager : IUserDetailsManager
    {
        protected IDbRepository<UserDetails> UserDetailsRepository { get; set; }

        public UserDetailsManager(IDbRepository<UserDetails> userDetailsRepository)
        {
            UserDetailsRepository = userDetailsRepository;
        }
        public void Create(UserDetailsDto userDetailsDto)
        {
            var entity = Mapper.FromDto(userDetailsDto);
            UserDetailsRepository.Insert(entity);
            UserDetailsRepository.Save();
        }
    }
}
