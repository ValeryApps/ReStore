using API.Entities;
namespace API.Extensions
{
    public static class ProductExtension
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
            {
                return query.OrderBy(p => p.Name);
            }
            return query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name),
            };
            //return query;
        }
        public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
                return query;
            return query.Where(p => p.Name.ToLower().Contains(searchTerm.Trim().ToLower()));
        }
        public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
        {
            var brandsList = new List<string>();
            var typesList = new List<string>();
            if (!string.IsNullOrEmpty(brands))
                brandsList.AddRange(brands.ToLower().Split(","));
            if (!string.IsNullOrEmpty(types))
                typesList.AddRange(types.ToLower().Split(","));
            query = query.Where(p => brandsList.Count == 0 || brandsList.Contains(p.Brand!.ToLower()));
            query = query.Where(p => typesList.Count == 0 || typesList.Contains(p.Type!.ToLower()));
            return query;
        }
    }
}
