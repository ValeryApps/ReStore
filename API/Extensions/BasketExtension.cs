using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtension
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                BuyerId = basket.BuyerId,
                Id = basket.Id,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    Name = item.Product!.Name,
                    Price = item.Product!.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,

                }).ToList()
            };
        }
        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string BuyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(x => x.BuyerId == BuyerId);
        }
    }
}