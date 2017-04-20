using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class Country
    {
        [Key]
        public int IdCountry { get; set; }

        public string Name { get; set; }
        public ICollection<City> Cities { get; set; }

    }
}
