using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be_bookstoreweb.Data;
using be_bookstoreweb.DTO;
using be_bookstoreweb.Models;

namespace be_bookstoreweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly BookStoreWebDB _context;

        public FilterController(BookStoreWebDB context)
        {
            _context = context;
        }

        // GET: api/Contacts

        private static string GenerateFullImageUrl(HttpRequest request, string relativeUrl)
        {
            if (string.IsNullOrEmpty(relativeUrl))
                return null;

            return $"{request.Scheme}://{request.Host}/{relativeUrl}";
        }

        [HttpGet]
        [Route("filter-books")]
        public async Task<ActionResult<IEnumerable<BookHomePage>>> FilterBooks(
    [FromQuery] string? keyword,
    [FromQuery] double? minPrice,
    [FromQuery] double? maxPrice,
    [FromQuery] int[]? categoryIds,
    [FromQuery] int[]? publisherIds,
    [FromQuery] bool sortByPriceAsc = true,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 16)
        {
            if (page < 1 || pageSize < 1)
                return BadRequest("Page and page size must be greater than zero.");

            try
            {
                // Base query
                var query = _context.Books
                    .Include(b => b.Categories)
                    .Include(b => b.ImageBook)
                    .Include(b => b.Publisher)
                    .AsQueryable();

                // Apply filters
                if (!string.IsNullOrEmpty(keyword))
                {
                    query = query.Where(b => b.Name.Contains(keyword) || b.AuthorName.Contains(keyword));
                }

                if (minPrice.HasValue)
                {
                    query = query.Where(b => b.Price >= minPrice.Value);
                }

                if (maxPrice.HasValue)
                {
                    query = query.Where(b => b.Price <= maxPrice.Value);
                }

                if (categoryIds != null && categoryIds.Any())
                {
                    query = query.Where(b => b.Categories.Any(c => categoryIds.Contains(c.Id)));
                }

                if (publisherIds != null && publisherIds.Any())
                {
                    query = query.Where(b => publisherIds.Contains(b.Publisher.Id));
                }

                // Sorting
                query = sortByPriceAsc
                    ? query.OrderBy(b => b.Price)
                    : query.OrderByDescending(b => b.Price);

                // Pagination
                var totalItems = await query.CountAsync();
                var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

                var books = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                // Transform result
                var bookList = books.Select(book => new BookHomePage
                {
                    Id = book.Id,
                    Name = book.Name,
                    AveragePoint = book.Reviews != null && book.Reviews.Any()
                        ? Math.Round(book.Reviews.Average(r => r.Rate), 1)
                        : 0,
                    Price = book.Price,
                    PromotionalPrice = book.PromotionalPrice,
                    AuthorName = book.AuthorName,
                    Stock = book.Stock,
                    Slug = book.Slug,
                    SoldCount = book.SoldCount,
                    ClickCount = book.ClickCount,
                    ImageUrls = book.ImageBook != null && book.ImageBook.Any()
                        ? new List<string> { GenerateFullImageUrl(Request, book.ImageBook.First().ImageUrl) }
                        : new List<string>(),
                    CategoryNames = book.Categories.Select(c => c.NameCategory).ToList()
                }).ToList();

                // Response with pagination info
                return Ok(new
                {
                    TotalItems = totalItems,
                    TotalPages = totalPages,
                    CurrentPage = page,
                    PageSize = pageSize,
                    Books = bookList
                });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error filtering books: {ex.Message}");
                return StatusCode(500, "An error occurred while filtering books.");
            }
        }
        [HttpGet]
        [Route("get-categories")]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategories()
        {
            try
            {
                var categories = await _context.Categories
                    .Include(c => c.ParentCategory)
                    .Include(c => c.ChildCategories)
                    .Where(c => c.DeletedAt == null) // Bỏ qua danh mục bị xóa
                    .Select(c => new CategoryDTO
                    {
                        Id = c.Id,
                        NameCategory = c.NameCategory,
                        Slug = c.Slug,
                        ParentId = c.ParentId,
                        ParentName = c.ParentCategory != null ? c.ParentCategory.NameCategory : null,
                        ChildCategories = c.ChildCategories
                            .Where(child => child.DeletedAt == null) // Bỏ qua danh mục con bị xóa
                            .Select(child => new CategoryDTO
                            {
                                Id = child.Id,
                                NameCategory = child.NameCategory,
                                Slug = child.Slug,
     
                            }).ToList()
                    })
                    .ToListAsync();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error fetching categories: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching categories.");
            }
        }


        [HttpGet()]
        [HttpGet]
        [Route("get-publishers")]
        public async Task<IActionResult> GetAllPublisher()
        {
            var categories = await _context.Publishers
      .Where(c => c.DeletedAt == null)
      .Select(c => new
      {
          Id = c.Id,
          Name = c.Name
           
      }
      )// Chỉ lấy các danh mục có ParentCategory

      .ToListAsync();

            return Ok(categories);
        }

        public static string GenerateSlug(string name)
        {
            // Chuyển toàn bộ thành chữ thường
            var slug = name.ToLower();

            // Thay thế các ký tự có dấu thành không dấu (nếu có)
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[áàảãạâấầẩẫậăắằẳẵặ]", "a");
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[éèẻẽẹêếềểễệ]", "e");
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[iíìỉĩị]", "i");
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[óòỏõọôốồổỗộơớờởỡợ]", "o");
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[úùủũụưửựứừữ]", "u");
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[ýỳỷỹỵ]", "y");
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[đ]", "d");

            // Xóa các ký tự không phải là chữ cái, số và dấu gạch ngang
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[^a-z0-9\s-]", "");

            // Rút gọn các khoảng trắng liên tiếp thành một khoảng trắng
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"\s+", " ");

            // Thay thế các khoảng trắng thành dấu gạch ngang
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"\s", "-");

            // Xóa dấu gạch ngang ở đầu và cuối
            slug = slug.Trim('-');

            return slug;
        }






    }
}
