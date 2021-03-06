﻿using BusinessLayer.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface ITouristAttraction
    {
        void Insert(TouristAttractionDto turistAttractionDto);

        IEnumerable<TouristAttractionDto> GetAll();

        TouristAttractionDto GetByIdTouristAttraction(int id);
    }
}
