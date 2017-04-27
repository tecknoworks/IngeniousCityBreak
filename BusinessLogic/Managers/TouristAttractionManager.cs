using BusinessLayer;
using BusinessLayer.Dto;
using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic
{
    public class TouristAttractionManager : TouristAttraction
    {
        private IDbRepository<TouristAttraction> _touristAttractionRepository { get; set; }
        //protected IDbRepository<UserDetails> UserDetailsRepository { get; set; }

        public TouristAttractionManager(IDbRepository<TouristAttraction> touristAttractionRepository)
        {
            _touristAttractionRepository = touristAttractionRepository;
        }

        public void Insert(TouristAttractionDto touristAttractionDto)
        {
            //var entity = Mapper.FromDto(touristAttractionDto);
            //UserDetailsRepository.Insert(entity);
            //UserDetailsRepository.Save();
        }
        //public IEnumerable<UserDetailsDto> GetAll()
        //{
        //    var result = UserDetailsRepository.GetAll().ToUserDetailsDto();
        //    var result = Mapper.ToUserDetailsDto(UserDetailsRepository.GetAll());
        //    return result;
        //}

    }
}
