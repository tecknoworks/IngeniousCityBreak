using BusinessLayer;
using Contracts;
using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic
{
    public class UserManager : IUserManager
    {
        private IDbRepository<ApplicationUser> _userRepository { get; set; }
        protected IDbRepository<UserDetails> UserDetailsRepository { get; set; }

        public UserManager(IDbRepository<ApplicationUser> userRepository, IDbRepository<UserDetails> userDetailsRepository)
        {
            _userRepository = userRepository;
            UserDetailsRepository = userDetailsRepository;
        }

        public void Create(UserDetailsDto userDetailsDto)
        {
            var entity = Mapper.FromDto(userDetailsDto);
            UserDetailsRepository.Insert(entity);
            UserDetailsRepository.Save();
        }
        public IEnumerable<UserDetailsDto> GetAll()
        {
            // var result = UserDetailsRepository.GetAll().ToUserDetailsDto();
            var result = Mapper.ToUserDetailsDto(UserDetailsRepository.GetAll());
            return result;
        }


        public UserDetailsDto GetByIdUser(int id)
        {
            var result = Mapper.ToUserDetailsIdDto(UserDetailsRepository.GetById(id));
            return result;
        }

       public void AddUserDetails(ApplicationUser user) {
            //IDbRepository<ApplicationUser> repo = new DbRepository<ApplicationUser>();
            var newUser = _userRepository.GetById(user.Id);
            newUser.UserDetails = new UserDetails();
            _userRepository.Save();
        }
    }
}
