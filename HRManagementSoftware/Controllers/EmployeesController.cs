using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HRManagementSoftware.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HRManagementSoftware.Controllers
{
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly HRManagementContext _context;

        public EmployeesController(HRManagementContext context)
        {
            _context = context;

            if(_context.Employees.Count() == 0) {
                _context.Employees.Add(
                    new Employee {
                        FirstName = "Lars",
                        LastName = "Müller",
                        Age = 20
                    }
                );
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Employee> GetAll()
        {
            return _context.Employees.ToList(); ;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            return new ObjectResult(employee);
        }

        [HttpPost]
        public void Post([FromBody]Employee employee)
        {
            //Todo
        }

        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody]Employee employee)
        {
            //Todo
        }

        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            //Todo
        }
    }
}
