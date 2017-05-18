using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class City
    {
        [Key]
        public int IdCity { get; set; }
        public string Name { get; set; }
        public Country Country { get; set; }
      //  public  ICollection<TouristAttraction> TouristAttractions { get; set; }
    }
}
