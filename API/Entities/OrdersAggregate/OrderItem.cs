using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrdersAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }

        public ProductItemOrdered ItemOrdered { get; set; } = new ProductItemOrdered();
        public double Price { get; set; }

        public int Quantity { get; set; }




    }
}