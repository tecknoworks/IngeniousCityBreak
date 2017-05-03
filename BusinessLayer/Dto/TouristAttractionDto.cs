﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Dto
{
    public class TouristAttractionDto
    {
        public int? IdTouristAttraction { get; set; }
        [Required]
        public string Name { get; set; }

        public float PriceChild { get; set; }

        public float PriceAdult { get; set; }

        public string Schedule { get; set; }
        public string Image { get; set; }

    }
}
