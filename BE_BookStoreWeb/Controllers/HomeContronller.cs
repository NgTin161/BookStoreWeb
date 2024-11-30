using be_bookstoreweb.Data;
using be_bookstoreweb.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be_bookstoreweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly BookStoreWebDB _context;

        public HomeController(BookStoreWebDB context)
        {
            _context = context;
        }

        // Phương thức tạo URL đầy đủ cho ảnh
        private static string GenerateFullImageUrl(HttpRequest request, string relativeUrl)
        {
            if (string.IsNullOrEmpty(relativeUrl))
                return null;

            return $"{request.Scheme}://{request.Host}/{relativeUrl}";
        }

        // Lấy danh sách slideshow
        [HttpGet("get-slideshows")]
        public async Task<ActionResult<IEnumerable<SlideshowOutDTO>>> GetAllSlideShow()
        {
            try
            {
                var slideshows = await _context.Slideshows
                    .Where(s => s.DeletedAt == null)
                    .Select(slideshow => new SlideshowOutDTO
                    {
                        Id = slideshow.Id,
                        ImageURL = GenerateFullImageUrl(Request, slideshow.ImageURL),
                        Link = slideshow.Link,
                    })
                    .ToListAsync();

                return Ok(slideshows);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving slideshows: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the slideshows.");
            }
        }

        // Lấy sách mới nhất
        [HttpGet("new-books")]
        public async Task<IActionResult> GetNewBooks()
        {
            try
            {
                var newBooks = await _context.Books
                    .OrderByDescending(book => book.CreatedAt)
                    
                    .Select(book => new BookHomePage
                    {
                        Id = book.Id,
                        Name = book.Name,
                        AveragePoint = book.Reviews.Any() ? Math.Round(book.Reviews.Average(r => r.Rate), 1) : 0,
                        Price = book.Price,
                        PromotionalPrice = book.PromotionalPrice,
                        AuthorName = book.AuthorName,
                        Stock = book.Stock,
                        Slug = book.Slug,
                        SoldCount = book.SoldCount,
                        CreatedAt=book.CreatedAt,
                        ImageUrls = book.ImageBook != null && book.ImageBook.Any()
                            ? new List<string> { GenerateFullImageUrl(Request, book.ImageBook.First().ImageUrl) }
                            : new List<string>()
                    })
                    .Take(10)
                    .ToListAsync();

                return Ok(newBooks);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving new books: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving new books.");
            }
        }

        // Lấy sách nổi bật
        [HttpGet("hot-books")]
        public async Task<IActionResult> GetHotBooks()
        {
            try
            {
                var hotBooks = await _context.Books
                    .OrderByDescending(book => book.ClickCount + book.SoldCount)
                  
                    .Select(book => new BookHomePage
                    {
                        Id = book.Id,
                        Name = book.Name,
                        AveragePoint = book.Reviews.Any() ? Math.Round(book.Reviews.Average(r => r.Rate), 1) : 0,
                        Price = book.Price,
                        PromotionalPrice = book.PromotionalPrice,
                        AuthorName = book.AuthorName,
                        Stock = book.Stock,
                        Slug = book.Slug,
                        ClickCount = book.ClickCount,
                        SoldCount = book.SoldCount,
                        ImageUrls = book.ImageBook != null && book.ImageBook.Any()
                            ? new List<string> { GenerateFullImageUrl(Request, book.ImageBook.First().ImageUrl) }
                            : new List<string>()
                    })
                      .Take(10)
                    .ToListAsync();

                return Ok(hotBooks);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving hot books: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving hot books.");
            }
        }

        // Lấy sách bán chạy nhất
        [HttpGet("best-sellers")]
        public async Task<IActionResult> GetBestSellers()
        {
            try
            {
                var bestSellers = await _context.Books
                    .OrderByDescending(book => book.SoldCount)
                    
                    .Select(book => new BookHomePage
                    {
                        Id = book.Id,
                        Name = book.Name,
                        AveragePoint = book.Reviews.Any() ? Math.Round(book.Reviews.Average(r => r.Rate), 1) : 0,
                        Price = book.Price,
                        PromotionalPrice = book.PromotionalPrice,
                        AuthorName = book.AuthorName,
                        Stock = book.Stock,
                        Slug = book.Slug,
                        SoldCount = book.SoldCount,
                        ImageUrls = book.ImageBook != null && book.ImageBook.Any()
                            ? new List<string> { GenerateFullImageUrl(Request, book.ImageBook.First().ImageUrl) }
                            : new List<string>()
                    })
                    .Take(10)
                    .ToListAsync();

                return Ok(bestSellers);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving best sellers: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving best sellers.");
            }
        }

        // Lấy danh mục cha
        [HttpGet("get-father-category")]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetFatherCategories()
        {
            try
            {
                var categories = await _context.Categories
                    .Where(c => c.ParentId == null && c.DeletedAt == null)
                    .Select(c => new CategoryDTO
                    {
                        Id = c.Id,
                        NameCategory = c.NameCategory,
                        Slug = c.Slug
                    })
                    .ToListAsync();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving father categories: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving father categories.");
            }
        }


        [HttpGet]
        [Route("get-books-by-category")]
        public async Task<IActionResult> GetBooksByParentId(int id)
        {
            if (id == 0)
                return BadRequest("Parent id is required.");

            try
            {
                // Tìm danh mục cha dựa trên Id
                var parentCategory = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (parentCategory == null)
                    return NotFound(new { Message = "Parent category not found." });

                // Lấy danh sách sách thuộc danh mục con của danh mục cha
                var books = await _context.Books
                    .OrderByDescending(book => book.ClickCount + book.SoldCount)
                    
                    .Include(b => b.Categories) // Bao gồm liên kết đến các thể loại
                    .Include(b => b.ImageBook) // Bao gồm liên kết đến hình ảnh sách
                    .Include(b => b.Publisher) // Bao gồm nhà xuất bản
                    .Where(b => b.Categories.Any(c => c.ParentId == parentCategory.Id))
                    .Distinct()
                    .Take(5)
                    .ToListAsync();

                // Map sang DTO
                var bookDtos = books.Select(book => new BookHomePage
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
                    ImageUrls = book.ImageBook != null && book.ImageBook.Any()
                        ? new List<string> { GenerateFullImageUrl(Request, book.ImageBook.First().ImageUrl) }
                        : new List<string>()
                }).ToList();

                if (!bookDtos.Any())
                    return NotFound(new { Message = "No books found for the specified parent category." });

                return Ok(bookDtos);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error fetching books: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving books.");
            }
        }

        [HttpGet]
        [Route("shipping-policy")]
        public async Task<IActionResult> GetShippingPolicy()
        {
            var informations = await _context.Informations.FirstOrDefaultAsync();

            if (informations == null)
            {
                return NotFound("No information found.");
            }

            return Ok(informations.ShippingPolicy);
        }

        [HttpPost]
        [Route("click-item")]
        public async Task<IActionResult> ClickItem(int id)
        {
            if (id == 0)
                return BadRequest("Parent id is required.");

            try
            {
                var item = await _context.Books
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (item == null)
                    return NotFound(new { Message = "Item not found." });


                item.ClickCount = item.ClickCount ?? 0;
                item.ClickCount += 1;
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error fetching books: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving books.");
            }
        }

      

    }
}
