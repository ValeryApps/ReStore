using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrdersAggregate
{
    public class Order
    {
        public int Id { get; set; }

        public string? BuyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; } = new ShippingAddress();
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem>? OrderItems { get; set; }
        public double Subtotal { get; set; }

        public double DeliveryFee { get; set; }

        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public double GetTotal()
        {
            return Subtotal + DeliveryFee;
        }





    }
}