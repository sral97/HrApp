using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HRManagementSoftware.Models
{
    public class HRManagementContext : DbContext
    {
        public HRManagementContext(DbContextOptions<HRManagementContext> options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}
