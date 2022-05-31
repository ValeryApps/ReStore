using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrdersAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : ApiBaseController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders!
                    .ProjetOrderToOrderDto()
                    .Where(u => u.BuyerId == User.Identity!.Name)
                    .ToListAsync();
        }
        [HttpGet("{id}", Name = "GetOrderById")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            var order = await _context.Orders!
                         .ProjetOrderToOrderDto()
                         .Where(u => u.BuyerId == User.Identity!.Name && u.Id == id)
                         .FirstOrDefaultAsync();
            return order!;
        }
        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.Baskets!
                        .RetrieveBasketWithItems(User.Identity?.Name!)
                        .FirstOrDefaultAsync();
            if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate basket", });
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _context.Products!.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    Name = productItem!.Name,
                    PictureUrl = productItem.PictureUrl,
                    ProductId = productItem.Id
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity

                };
                items.Add(orderItem);
                productItem.QuantityInStock -= item.Quantity;
            }
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 100 ? 0 : 5;
            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity!.Name,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee
            };
            _context.Orders?.Add(order);
            _context.Baskets?.Remove(basket);
            if (orderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(user => user.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                user!.Address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    Country = orderDto.ShippingAddress.Country,
                    Zip = orderDto.ShippingAddress.Zip,
                    State = orderDto.ShippingAddress.State,

                };

            }
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return CreatedAtRoute("GetOrderById", new { id = order.Id }, order.Id);
            return BadRequest("Could not create order. please try later");
        }
    }
}