using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRManagementSoftware.Models
{
    public class Address
    {
        public Guid Id { get; set; }
        public string Street { get; set; }
        public int Zip { get; set; }
        public string City { get; set; }
        public string State { get; set; }

        public Guid EmployeeId { get; set; }
        //public virtual Employee Employee { get; set; }
    }
}
