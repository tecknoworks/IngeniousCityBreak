using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class UserDetails
    {
        public int Id { get; set; }
        public string Adress { get; set; }
        public string CardNumber { get; set; }

        //[Key, ForeignKey("ApplicationUser")]
        //public string ApplicationUserId { get; set; }
        [Required]
        public ApplicationUser ApplicationUser { get; set; }
    }
}
