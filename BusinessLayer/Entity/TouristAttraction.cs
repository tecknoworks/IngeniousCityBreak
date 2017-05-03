using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class TouristAttraction
    {
        [Key]
        public int IdTouristAttraction { get; set; }

        public string Name { get; set; }
        public float PriceChild { get; set; }
        public float PriceAdult { get; set; }
        public string Schedule { get; set; }
        public string Image { get; set; }
        public City City { get; set; }
        public ICollection<Route> Routes { get; set; }
    }
}
