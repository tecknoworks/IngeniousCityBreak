using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class Route
    {
        [Key]
        public int IdRoute { get; set; }
        public ICollection<TouristAttraction> TouristAttractions { get; set; }
    }
}
