using la_mia_pizzeria_static.Models;
using Microsoft.AspNetCore.Mvc;

namespace la_mia_pizzeria_static.API
{
	[Route("Api/")]
	[ApiController]
	public class PizzaDataController : ControllerBase
	{
		private readonly PizzeriaContext _context;


		public PizzaDataController(PizzeriaContext context)
		{
			_context = context;
		}

		[Route("category")]
		[HttpGet]
		public IActionResult GetCategories()
		{
			return Ok(_context.Categories.ToList());
		}

		[Route("ingrediente")]
		[HttpGet]
		public IActionResult GetIngredienti()
		{
			return Ok(_context.Ingredienti.ToList());
		}
	}
}
