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

        public void Update(UserDetailsDto userDetailsDto)
        {
            var entity = Mapper.FromDto(userDetailsDto);
            var userEntity = _userRepository.GetAll().First(it => it.Email == userDetailsDto.Email);
            Mapper.FromDto(userEntity.UserDetails, userDetailsDto);

            //UserDetailsRepository.Insert(entity);
            _userRepository.Save();
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

        public UserDetailsDto GetByEmailUser(string email)
        {
          //  var result = Mapper.ToUserDetailsEmailDto(UserDetailsRepository.GetByEmail(email));
            var result = UserDetailsRepository.GetAll().Where(it => it.Email.Contains(email)).FirstOrDefault();
            return Mapper.ToUserDetailsIdDto(result);
        }

        public void AddUserDetails(ApplicationUser user) {
            //IDbRepository<ApplicationUser> repo = new DbRepository<ApplicationUser>();
            var newUser = _userRepository.GetById(user.Id);
            newUser.UserDetails = new UserDetails();
            _userRepository.Save();
        }
    }
}
