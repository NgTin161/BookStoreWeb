using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be_bookstoreweb.Data;
using be_bookstoreweb.Models;
using Microsoft.AspNetCore.Identity;

namespace be_bookstoreweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookStoreWebDB _context;

        public BooksController(BookStoreWebDB context)
        {
            _context = context;
        }


        private const string ImageFolderPath = "wwwroot/Books";
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllBookDTO>>> GetAllBooks()
        {
            try
            {
                // Truy vấn tất cả sách, bao gồm các liên kết cần thiết
                var books = await _context.Books
                    .Where(b=> b.DeletedAt == null)
                    //.Include(b => b.BookCategories) 
                        //.ThenInclude(bc => bc.Category) 
                    .Include(b => b.ImageBook)
                    .Include(b => b.Publisher)
                    .ToListAsync();

                // Tạo danh sách DTO để trả về
                var allBookDTOs = books.Select(book => new AllBookDTO
                {
                    Id = book.Id,
                    BookCode = book.BookCode,
                    Name = book.Name,

                    Price = book.Price,
                    PromotionalPrice = book.PromotionalPrice,
                    Stock = book.Stock,
                    PublisherName = book.Publisher.Name,
                    IsActive = book.IsActive,
                    CreatedAt = book.CreatedAt,
                    ImageUrls = book.ImageBook?.Take(1)
                        .Select(img => $"{Request.Scheme}://{Request.Host}/{img.ImageUrl}")
                        .ToList() ?? new List<string>(),
                }).ToList();

                return Ok(allBookDTOs);
            }
            catch (Exception ex)
            { 
                Console.Error.WriteLine($"Error retrieving books: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the books.");
            }
        }
        // GET: api/Books/5


        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }

[HttpGet("{id}")]
public async Task<ActionResult<BookOutDTO>> GetBookById(int id)
{
    try
    {
        // Truy vấn sách theo Id, bao gồm các liên kết cần thiết
        var book = await _context.Books
            .Include(b => b.Categories) // Bao gồm thể loại
            .Include(b => b.ImageBook) // Bao gồm ảnh liên kết

            .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
        {
            return NotFound(new { Message = "Book not found." });
        }

        // Tạo DTO để trả về
        var bookOutDTO = new BookOutDTO
        {
            Id = book.Id,
            BookCode = book.BookCode,
            Name = book.Name,
            Description = book.Description,
            Price = book.Price,
            PromotionalPrice = book.PromotionalPrice,
            PublisherId=book.PublisherId,
            PublisherName = book.Publisher?.Name,
            Stock = book.Stock,
            PageCount = book.PageCount,
            AuthorName = book.AuthorName,
            Language = book.Language,
            IsActive = book.IsActive,
            CreatedAt = book.CreatedAt,
            UpdatedAt = book.UpdatedAt,
            CategoryNames = book.Categories
                .Select(c => c.NameCategory)
                .ToList(),
            Slug = book.Slug,
            ImageUrls = book.ImageBook?
                .Select(img => $"{Request.Scheme}://{Request.Host}/{img.ImageUrl}")
                .ToList() ?? new List<string>(),
        };

        return Ok(bookOutDTO);
    }
    catch (Exception ex)
    {
        // Log lỗi và trả về phản hồi lỗi
        Console.Error.WriteLine($"Error retrieving book: {ex.Message}");
        return StatusCode(500, "An error occurred while retrieving the book.");
    }
}



        [HttpGet]
        [Route("get-book-by-slug")]
        public async Task<ActionResult<BookOutDTO>> GetBookBySlug([FromQuery]string slug)
        {
            try
            {
                // Truy vấn sách theo Id, bao gồm các liên kết cần thiết
                var book = await _context.Books
            .Include(b => b.Categories) // Bao gồm các thể loại
            .Include(b => b.ImageBook) // Bao gồm liên kết đến ImageBook
            .Include(b=>b.Publisher)
            .FirstOrDefaultAsync(b => b.Slug == slug);

                if (book == null)
                {
                    return NotFound(new { Message = "Book not found." });
                }

                // Tạo DTO để trả về
                var bookOutDTO = new BookOutDTO
                {
                    Id = book.Id,
                    BookCode = book.BookCode,
                    Name = book.Name,
                    Description = book.Description,
                    Price = book.Price,
                    PromotionalPrice = book.PromotionalPrice,
                    PublisherName = book.Publisher.Name,
                    Stock = book.Stock,
                    PageCount = book.PageCount,
                    CategoryId = book.Categories.Select(c => c.Id).ToList(),
                    AuthorName = book.AuthorName,
                    Language = book.Language,
                    IsActive = book.IsActive,
                    CreatedAt = book.CreatedAt,
                    UpdatedAt = book.UpdatedAt,
                    CategoryNames = book.Categories
                .Select(c => c.NameCategory)
                .ToList(),
                    Slug = book.Slug,
                    ImageUrls = book.ImageBook?
                        .Select(img => $"{Request.Scheme}://{Request.Host}/{img.ImageUrl}")
                        .ToList() ?? new List<string>(),
                };

                return Ok(bookOutDTO);
            }
            catch (Exception ex)
            {
                // Log lỗi và trả về phản hồi lỗi
                Console.Error.WriteLine($"Error retrieving book: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the book.");
            }
        }

        public static string GenerateFullImageUrl(HttpRequest request, string relativeUrl)
        {
            if (string.IsNullOrEmpty(relativeUrl))
                return null;

            return $"{request.Scheme}://{request.Host}/{relativeUrl}";
        }


        [HttpGet()]
        [Route("get-random-books-same-categories")]
        public async Task<ActionResult<IEnumerable<BookOutDTO>>> GetRandomBooksBySameCategory([FromQuery] int[] Ids)
        {
            if (Ids == null || !Ids.Any())
                return BadRequest("Category IDs are required.");

            try
            {
              
                var books = await _context.Books
                    .Include(b => b.Categories)
                    .Include(b => b.ImageBook) 
                    .Include(b => b.Publisher) 
                    .Where(b => b.Categories.Any(c => Ids.Contains(c.Id)))
                    .ToListAsync();

                if (!books.Any())
                    return NotFound(new { Message = "No books found for the specified categories." });

                // Chọn ngẫu nhiên 10 sách
                var randomBooks = books
                    .OrderBy(x => Guid.NewGuid()) // Random hóa danh sách
                    .Take(10)
                    .Select(book => new BookHomePage
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
                    })
                    .ToList();

                return Ok(randomBooks);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error fetching books: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving books.");
            }
        }





        [HttpGet()]
        [Route("get-book-by-parent-category")]
        public async Task<ActionResult<IEnumerable<BookOutDTO>>> GetBooksByParentCategorySlug(string slug)
        {
            if (string.IsNullOrEmpty(slug))
                return BadRequest("Parent category slug is required.");

            try
            {
                // Tìm danh mục cha dựa trên Slug
                var parentCategory = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Slug == slug);

                if (parentCategory == null)
                    return NotFound(new { Message = "Parent category not found." });

                // Lấy danh sách sách thuộc danh mục con của danh mục cha
                var books = await _context.Books
                    .Include(b => b.Categories) // Bao gồm liên kết đến các thể loại
                    .Include(b => b.ImageBook) // Bao gồm liên kết đến hình ảnh sách
                    .Include(b => b.Publisher) // Bao gồm nhà xuất bản
                    .Where(b => b.Categories.Any(c => c.ParentId == parentCategory.Id))
                    .ToListAsync();
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


        //[HttpPost]
        //public async Task<ActionResult> Insert([FromForm] BookDTO bookDTO, [FromForm] List<IFormFile> imageFiles)
        //{
        //    if (bookDTO == null) return BadRequest("BookDTO is null");

        //    try
        //    {
        //        // Tạo đối tượng Book từ BookDTO
        //        var book = new Book
        //        {
        //            BookCode = bookDTO.BookCode,
        //            Name = bookDTO.Name,
        //            Description = bookDTO.Description,
        //            Price = bookDTO.Price,
        //            PromotionalPrice = bookDTO.PromotionalPrice,
        //            PublisherId = bookDTO.PublisherId,
        //            Stock = bookDTO.Stock,
        //            PageCount = bookDTO.PageCount,
        //            Language = bookDTO.Language,
        //            CreatedAt = DateTime.UtcNow,
        //            UpdatedAt = null,
        //            Slug = GenerateSlug(bookDTO.Name)
        //        };

        //        // Lưu sách vào cơ sở dữ liệu
        //        _context.Books.Add(book);
        //        await _context.SaveChangesAsync();

        //        // Thêm liên kết giữa sách và thể loại
        //        if (bookDTO.CategoryIds != null && bookDTO.CategoryIds.Any())
        //        {
        //            var bookCategories = bookDTO.CategoryIds.Select(categoryId => new BookCategory
        //            {
        //                BookId = book.Id,
        //                CategoryId = categoryId
        //            }).ToList();

        //            //_context.BookCategories.AddRange(bookCategories);
        //            await _context.SaveChangesAsync();
        //        }

        //        // Chuyển đổi imageFiles sang FormFileCollection
        //        var formFileCollection = new FormFileCollection();
        //        formFileCollection.AddRange(imageFiles);

        //        // Thêm hình ảnh nếu có
        //        var result = await InsertAsync(book, formFileCollection);
        //        if (!result) return BadRequest("Unable to insert book with images.");

        //        return Ok(new { Message = "Book inserted successfully." });
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.Error.WriteLine($"Error inserting book: {ex.Message}");
        //        return StatusCode(500, "An error occurred while processing the request.");
        //    }
        //}





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

            // Thay thế nhiều khoảng trắng hoặc dấu gạch ngang liên tiếp thành một dấu gạch ngang
            slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[\s-]+", "-");

            // Xóa dấu gạch ngang ở đầu và cuối
            slug = slug.Trim('-');

            return slug;
        }







        [HttpPost]
        [Route("book-status")]
        public async Task<IActionResult> BookStatus([FromQuery] int Id)
        {
            
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == Id);

          
            if (book == null)
            {
                return NotFound("Book not found.");
            }
                 book.IsActive = !book.IsActive;

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Book status updated successfully."); // Return 200 OK on success
            }
            catch (DbUpdateException)
            {
                return BadRequest("Could not toggle book active status."); // Return 400 Bad Request on update failure
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            // Kiểm tra nếu danh mục có danh mục con
          
            // Đánh dấu là đã xóa (xóa mềm)
          book.DeletedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok();
        }



        [HttpGet]
        [Route("get-details")]
        public async Task<ActionResult<BookOutDTO>> GetBook(int id)
        {
            try
            {
                // Truy vấn sách theo Id, bao gồm các liên kết cần thiết
                var book = await _context.Books
                    .Include(b => b.Categories) // Bao gồm thể loại
                    .Include(b => b.ImageBook) // Bao gồm ảnh liên kết
                    .Include(b => b.Publisher) // Bao gồm nhà xuất bản
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (book == null)
                {
                    return NotFound(new { Message = "Book not found." });
                }

                // Tạo DTO để trả về
                var bookOutDTO = new BookOutDTO
                {
                    Id = book.Id,
                    BookCode = book.BookCode,
                    Name = book.Name,
                    Description = book.Description,
                    Price = book.Price,
                    PromotionalPrice = book.PromotionalPrice,
                    PublisherName = book.Publisher?.Name, // Tên nhà xuất bản
                    Stock = book.Stock,
                    PageCount = book.PageCount,
                    AuthorName = book.AuthorName,
                    Language = book.Language,
                    IsActive = book.IsActive,
                    CreatedAt = book.CreatedAt,
                    UpdatedAt = book.UpdatedAt,
                    CategoryNames = book.Categories
                        .Select(c => c.NameCategory)
                        .ToList(),
                    Slug = book.Slug,
                    ImageUrls = book.ImageBook?
                        .Select(img => $"{Request.Scheme}://{Request.Host}/{img.ImageUrl}")
                        .ToList() ?? new List<string>(),
                };

                return Ok(bookOutDTO);
            }
            catch (Exception ex)
            {
                // Log lỗi và trả về phản hồi lỗi
                Console.Error.WriteLine($"Error retrieving book: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the book.");
            }
        }


        [HttpPost]
        public async Task<ActionResult> Insert([FromForm] BookDTO bookDTO, [FromForm] List<IFormFile> imageFiles)
        {
            if (bookDTO == null)
                return BadRequest("BookDTO is null");

            try
            {
                // Tạo đối tượng Book từ BookDTO
                var book = new Book
                {
                    BookCode = bookDTO.BookCode,
                    Name = bookDTO.Name,
                    Description = bookDTO.Description,
                    Price = bookDTO.Price,
                    PromotionalPrice = bookDTO.PromotionalPrice,
                    PublisherId = bookDTO.PublisherId,
                    Stock = bookDTO.Stock,
                    PageCount = bookDTO.PageCount,
                    AuthorName = bookDTO.AuthorName,
                    Language = bookDTO.Language,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = null,
                    Slug = GenerateSlug(bookDTO.Name)
                };

                // Liên kết sách với các thể loại
                if (bookDTO.CategoryIds != null && bookDTO.CategoryIds.Any())
                {
                    var categories = await _context.Categories
                        .Where(c => bookDTO.CategoryIds.Contains(c.Id))
                        .ToListAsync();
                    book.Categories = categories;
                }

                // Thêm sách vào cơ sở dữ liệu
                _context.Books.Add(book);
                await _context.SaveChangesAsync();

                // Xử lý hình ảnh
                if (imageFiles != null && imageFiles.Count > 0)
                {
                    var result = await InsertAsync(book, imageFiles);
                    if (!result)
                        return BadRequest("Unable to insert book with images.");
                }

                return Ok(new { Message = "Book inserted successfully." });
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error inserting book: {ex.Message}");
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        private async Task<bool> InsertAsync(Book book, List<IFormFile> imageFiles)
        {
            try
            {
                // Khởi tạo danh sách hình ảnh
                book.ImageBook = new List<ImageBook>();

                foreach (var imageFile in imageFiles)
                {
                    if (imageFile.Length > 0)
                    {
                        // Lưu hình ảnh và thêm vào danh sách
                        var imageUrl = await SaveImage(imageFile, book.Slug);
                        book.ImageBook.Add(new ImageBook { ImageUrl = Path.Combine("Books", book.Slug, imageUrl) });
                    }
                }

                // Cập nhật sách trong cơ sở dữ liệu
                _context.Books.Update(book);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error inserting images: {ex.Message}");
                return false;
            }
        }

        private async Task<string> SaveImage(IFormFile imageFile, string slug)
        {
            // Đường dẫn thư mục lưu ảnh
            var imageName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(ImageFolderPath, slug);

            // Tạo thư mục nếu chưa tồn tại
            if (!Directory.Exists(imagePath))
            {
                Directory.CreateDirectory(imagePath);
            }

            var fullPath = Path.Combine(imagePath, imageName);

            // Lưu file
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return imageName;
        }

        private  async Task UpdateAveragePoint(int bookId)
        {
            var book = await _context.Books.Include(b => b.Reviews)
                .FirstOrDefaultAsync(b => b.Id == bookId);

            if (book != null)
            {
                // Tính toán điểm trung bình
                book.AveragePoint = book.Reviews.Any()
                    ? Math.Clamp(book.Reviews.Average(r => r.Rate), 1, 5) // Giới hạn 1-5
                    : 1; // Nếu không có đánh giá, mặc định là 1

                _context.Books.Update(book);
                await _context.SaveChangesAsync();
            }
        }
    }
}
