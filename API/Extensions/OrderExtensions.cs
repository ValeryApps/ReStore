using API.DTOs;
using API.Entities.OrdersAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjetOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                    .Select(order => new OrderDto
                    {
                        Id = order.Id,
                        BuyerId = order.BuyerId,
                        DeliveryFee = order.DeliveryFee,
                        OrderDate = order.OrderDate,
                        OrderStatus = order.OrderStatus.ToString(),
                        Total = order.GetTotal(),
                        Subtotal = order.Subtotal,
                        ShippingAddress = order.ShippingAddress,
                        OrderItems = order.OrderItems!.Select(item => new OrderItemDto
                        {
                            Name = item.ItemOrdered.Name,
                            PictureUrl = item.ItemOrdered.PictureUrl,
                            Price = item.Price,
                            ProductId = item.ItemOrdered.ProductId,
                            Quantity = item.Quantity
                        }).ToList()

                    }).AsNoTracking();
        }
    }
}