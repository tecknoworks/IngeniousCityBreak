using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class StContext
    {
        private static StContext stContext;
        private ApplicationDbContext applicationDbContext;
        private StContext()
        {
            applicationDbContext = new ApplicationDbContext();
        }

        public static StContext GetInstance() {
            if (stContext == null)
            {
                stContext = new StContext();
            }
           
            return stContext;
        }

        public ApplicationDbContext GetContext() {
            return applicationDbContext;
        }
    }

}
