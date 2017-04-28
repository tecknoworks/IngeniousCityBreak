using BusinessLayer;
using BusinessLayer.Dto;
using Contracts;
using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic
{
    public class TouristAttractionManager : ITouristAttraction
    {
        private IDbRepository<BusinessLayer.TouristAttraction> _touristAttractionRepository { get; set; }
        //protected IDbRepository<UserDetails> UserDetailsRepository { get; set; }

        public TouristAttractionManager(IDbRepository<BusinessLayer.TouristAttraction> touristAttractionRepository)
        {
            _touristAttractionRepository = touristAttractionRepository;
        }

        public void Insert(TouristAttractionDto touristAttractionDto)
        {
            TouristAttraction ent = new TouristAttraction();
            TouristAttraction rez = Mapper.FromTouristAttractionDto(touristAttractionDto, ent);
            _touristAttractionRepository.Insert(rez);
            _touristAttractionRepository.Save();
        }
        public IEnumerable<TouristAttractionDto> GetAll()
        {
            var result = _touristAttractionRepository.GetAll().ToTouristAttractionDtos();
            return result;
        }

        public TouristAttractionDto GetByIdTouristAttraction(int id)
        {
            var result = Mapper.ToTouristAttractionDtosId(_touristAttractionRepository.GetById(id));
            return result;
        }

    }
}
