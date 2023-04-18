using la_mia_pizzeria_static.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace la_mia_pizzeria_static.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly PizzeriaContext _context;

        public PizzaController(PizzeriaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPizza([FromQuery] string? nome, float? prezzo)
        {
            var pizze = _context.Pizze
                .Where(p => (nome == null && prezzo == null) || (nome != null && p.Name.ToLower().Contains(nome.ToLower())) || (prezzo != null && p.Prezzo == Convert.ToUInt32(prezzo)))
                .ToList();

            return Ok(pizze);
        }

        [HttpGet("{id}")]
        public IActionResult GetPost(int id)
        {
            var pizza = _context.Pizze.FirstOrDefault(p => p.Id == id);

            if (pizza is null)
            {
                return NotFound();
            }

            return Ok(pizza);
        }

        [HttpPost]
        public IActionResult CreatePost(Pizza pizza)
        {
            _context.Pizze.Add(pizza);
            _context.SaveChanges();

            return Ok(pizza);
        }

        [HttpPut("{id}")]
        public IActionResult PutPost(int id, [FromBody] Pizza pizza)
        {
            var savedPizza = _context.Pizze.FirstOrDefault(p => p.Id == id);

            if (savedPizza is null)
            {
                return NotFound();
            }

            savedPizza.Name = pizza.Name;
			savedPizza.Description = pizza.Description;
			savedPizza.Category = pizza.Category;
			savedPizza.Foto = pizza.Foto;
			savedPizza.Prezzo = pizza.Prezzo;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            var savedPizza = _context.Pizze.FirstOrDefault(p => p.Id == id);

            if (savedPizza is null)
            {
                return NotFound();
            }

            _context.Pizze.Remove(savedPizza);
            _context.SaveChanges();

            return Ok();
        }
    }
}
