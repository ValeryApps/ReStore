using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : ApiBaseController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var userId = GetBuyerId();
            var basket = await RetrieveBasket(userId);
            if (basket == null) return NotFound();
            return basket.MapBasketToDto();
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) basket = CreateBasket();

            var product = await _context.Products!.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());
            return BadRequest(new ProblemDetails { Title = "Could not save item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItem(int productId, int quantity)
        {
            var userId = GetBuyerId();
            var basket = await RetrieveBasket(userId);
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            if (await _context.SaveChangesAsync() > 0) return Ok();
            return BadRequest(new ProblemDetails { Title = "Could not remove item from basket" });
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null!;
            }
            var basket = await _context.Baskets!
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(item => item.BuyerId == buyerId);
            return basket!;
        }
        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"]!;
        }
        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookiesOption = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookiesOption);
            }
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets!.Add(basket);
            return basket;
        }

    }
}