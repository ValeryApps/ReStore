
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.RequestHelpers;
using System.Text.Json;
using System.Linq.Expressions;

namespace API.Controllers
{


    public class ProductsController : ApiBaseController
    {
        private readonly StoreContext _context;


        public ProductsController(StoreContext context)
        {

            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<PageList<Product>>> GetProducts([FromQuery] productParams productParams)
        {
            var query = _context.Products!
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();
            var products = await PageList<Product>.ToPageList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.Metadata!);

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products!.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpGet("filters")]
        public async Task<ActionResult> GetFilters()
        {
            var brands = await _context.Products!.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Products!.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new
            {
                brands,
                types
            });
        }
    }
}