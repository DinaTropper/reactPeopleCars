using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleCars.Data;

namespace ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getallpeople")]
        public List<Person> GetAllPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            return repo.GetAllPeople();
        }

        [HttpPost("addperson")]
        public void AddPerson(Person p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.AddPerson(p);

        }
        [HttpPost("addcar")]
        public void AddCar(Car c)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.AddCar(c);

        }
        [Route("getcars")]
        public List<Car> GetCars(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            return repo.GetCarsForPerson(id);
        }
        [HttpPost("deletecars")]
        public void DeleteCars(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeleteCarsForPerson(id);
        }
    }
}
