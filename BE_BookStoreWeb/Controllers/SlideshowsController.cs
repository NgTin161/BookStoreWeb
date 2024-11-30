using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be_bookstoreweb.Data;
using be_bookstoreweb.Models;
using be_bookstoreweb.DTO;

namespace be_bookstoreweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideshowsController : ControllerBase
    {
        private readonly BookStoreWebDB _context;

        public SlideshowsController(BookStoreWebDB context)
        {
            _context = context;
        }

    

        [HttpPost]
        [Route("slide-status")]
        public async Task<IActionResult> BookStatus([FromQuery] int Id)
        {

            var slideshow= await _context.Slideshows.FirstOrDefaultAsync(b => b.Id == Id);


            if (slideshow == null)
            {
                return NotFound("Book not found.");
            }
            slideshow.IsActive = !slideshow.IsActive;

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Slideshow status updated successfully."); // Return 200 OK on success
            }
            catch (DbUpdateException)
            {
                return BadRequest("Could not toggle slideshow active status."); // Return 400 Bad Request on update failure
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlideshow(int id)
        {
            var slideshow = await _context.Slideshows.FindAsync(id);

            if (slideshow == null)
            {
                return NotFound();
            }

            // Kiểm tra nếu danh mục có danh mục con

            // Đánh dấu là đã xóa (xóa mềm)
            slideshow.DeletedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("get-all-slideshows")]
        public async Task<ActionResult> GetAllSlideShow()
        {
            try
            {
                // Truy vấn tất cả slideshow từ cơ sở dữ liệu
                var slideshows = await _context.Slideshows
                    .Where(s => s.DeletedAt == null)
                    .ToListAsync();

                // Tạo danh sách DTO để trả về
                var allSlideShowDTOs = slideshows.Select(slideshow => new SlideshowOutDTO
                {
                    Id = slideshow.Id,
                    ImageURL = $"{Request.Scheme}://{Request.Host}/{slideshow.ImageURL}",
                    Link = slideshow.Link,
                    Description = slideshow.Description,
                    CreatedAt = slideshow.CreatedAt,
                    IsActive = slideshow.IsActive
                }).ToList();

                return Ok(allSlideShowDTOs);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving slideshows: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the slideshows.");
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetSlideShowById(int id)
        {
            try
            {
                // Truy vấn slideshow từ cơ sở dữ liệu dựa trên ID
                var slideshow = await _context.Slideshows.FirstOrDefaultAsync(c => c.Id == id);

                if (slideshow == null)
                {
                    return NotFound($"Slideshow with ID {id} not found.");
                }

                // Chuyển đổi đối tượng slideshow sang DTO
                var slideshowOutDTO = new SlideshowOutDTO
                {
                    Id = slideshow.Id,
                    ImageURL = $"{Request.Scheme}://{Request.Host}/{slideshow.ImageURL}",
                    Link = slideshow.Link,
                    Description = slideshow.Description,
                    CreatedAt = slideshow.CreatedAt,
                    IsActive = slideshow.IsActive
                };

                return Ok(slideshowOutDTO);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error retrieving slideshow: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the slideshow.");
            }
        }



        [HttpPost]
        [Route("create-slideshow")]
        public async Task<ActionResult> CreateSlideshow(IFormFile imageFile, [FromForm] SlideshowDTO slideshowDTO)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return BadRequest("Invalid image file.");
            }

            try
            {
                // Lưu ảnh
                var imagePath = await SaveImage(imageFile);
                if (string.IsNullOrWhiteSpace(imagePath))
                {
                    throw new Exception("Failed to save image.");
                }

                // Tạo một đối tượng Slideshow mới
                var slideshow = new Slideshow
                {
                    ImageURL = Path.Combine("Slideshows", imagePath), // Lưu đường dẫn tương đối
                    Link = slideshowDTO.Link,
                    Description = slideshowDTO.Description,
                };

                // Lưu đối tượng vào cơ sở dữ liệu
                _context.Add(slideshow);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Slideshow created successfully.", Slideshow = slideshow });
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Error occurred while creating the slideshow.");
            }
        }


        private const string ImageFolderPath = "wwwroot/Slideshows";
        private async Task<string> SaveImage(IFormFile imageFile)
        {
            // Tạo tên ảnh duy nhất với phần mở rộng của file gốc
            var imageName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(ImageFolderPath, imageName);

            // Đảm bảo thư mục tồn tại
            if (!Directory.Exists(ImageFolderPath))
            {
                Directory.CreateDirectory(ImageFolderPath);
            }

            // Lưu file vào thư mục
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return imageName; // Trả về chỉ tên file ảnh
        }

        private void DeleteImage(string imageName)
        {
            // Kết hợp đường dẫn để xác định file ảnh
            var imagePath = Path.Combine(ImageFolderPath, imageName);

            // Kiểm tra nếu file tồn tại và xóa
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
