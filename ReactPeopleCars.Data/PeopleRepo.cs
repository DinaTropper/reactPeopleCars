using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleCars.Data
{
    public class PeopleRepo
    {
        private readonly string _connectionString;
        public PeopleRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAllPeople()
        {
            var context = new PeopleDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }

        public void AddPerson(Person p)
        {
            var context = new PeopleDataContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }
        public void AddCar(Car c)
        {
            var context = new PeopleDataContext(_connectionString);
            context.Cars.Add(c);
            context.SaveChanges();
        }
        public void DeleteCarsForPerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            List<Car> cars = context.Cars.Where(c => c.PersonId == id).ToList();
            context.Cars.RemoveRange(cars);
            context.SaveChanges();

        }
        public Person GetPersonById(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
        public List<Car> GetCarsForPerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }
    }
}
