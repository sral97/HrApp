using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HRManagementSoftware.Models;
using Microsoft.EntityFrameworkCore;

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
        }

        [HttpGet]
        public IEnumerable<Employee> GetAll()
        {
            return _context.Employees.ToList(); ;
        }

        [HttpGet("{id}", Name = "GetEmployee")]
        public IActionResult GetById(Guid id)
        {
            var employee = _context.Employees.Include(e => e.Addresses).FirstOrDefault(e => e.Id == id);
            if (employee == null)
            {
                return NotFound();
            }

            return new ObjectResult(employee);
        }

        [HttpPost]
        public IActionResult Create([FromBody]Employee employee)
        {
            if(employee == null)
            {
                return BadRequest();
            }

            _context.Employees.Add(employee);
            _context.SaveChanges();

            return CreatedAtRoute("GetEmployee", new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody]Employee employee)
        {
            if (employee == null || employee.Id != id)
            {
                return BadRequest();
            }

            var employeeToUpdate = _context.Employees.Include(e => e.Addresses).FirstOrDefault(e => e.Id == id);
            if (employeeToUpdate == null)
            {
                return NotFound();
            }

            employeeToUpdate.FirstName = employee.FirstName;
            employeeToUpdate.LastName = employee.LastName;
            employeeToUpdate.Age = employee.Age;

            foreach (Address address in employeeToUpdate.Addresses)
            {
                if (!employee.Addresses.Any(a => a.Id == address.Id))
                {
                    _context.Addresses.Remove(address);
                }
            }

            foreach (Address address in employee.Addresses)
            {
                var exisitngAddress = employeeToUpdate.Addresses
                .Where(c => c.Id == address.Id)
                .SingleOrDefault();

                if (exisitngAddress != null)
                    _context.Entry(exisitngAddress).CurrentValues.SetValues(address);
                else
                {
                    employeeToUpdate.Addresses.Add(address);
                }
            }

            _context.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var employeeToDelete = _context.Employees.FirstOrDefault(e => e.Id == id);
            if (employeeToDelete == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employeeToDelete);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
