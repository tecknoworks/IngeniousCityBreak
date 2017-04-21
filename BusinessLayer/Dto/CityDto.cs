﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Dto
{
    public class CityDto
    {
        public int? IdCity { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public Country Country { get; set; }
    }
}
