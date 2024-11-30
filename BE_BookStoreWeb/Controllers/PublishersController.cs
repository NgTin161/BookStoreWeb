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
    public class PublishersController : ControllerBase
    {
        private readonly BookStoreWebDB _context;

        public PublishersController(BookStoreWebDB context)
        {
            _context = context;
        }

        // Tạo nhà xuất bản
        [HttpPost]
        public async Task<IActionResult> CreatePublisher([FromBody] PublisherDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var publisher = new Publisher
            {
                Name = dto.Name,
                Description = dto.Description,
                IsActive = dto.IsActive,
                CreatedAt = DateTime.UtcNow
            };

            _context.Publishers.Add(publisher);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPublisher), new { id = publisher.Id }, publisher);
        }

        // Sửa nhà xuất bản
        [HttpPost("{id}")]
        public async Task<IActionResult> UpdatePublisher(int id, [FromBody] PublisherDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var publisher = await _context.Publishers.FindAsync(id);
            if (publisher == null)
            {
                return NotFound(new { message = "Nhà xuất bản không tồn tại." });
            }

            publisher.Name = dto.Name;
            publisher.Description = dto.Description;
            publisher.IsActive = dto.IsActive;
            publisher.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(publisher);
        }

        // Xóa nhà xuất bản (logical delete)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublisher(int id)
        {
            var publisher = await _context.Publishers.FindAsync(id);
            if (publisher == null)
            {
                return NotFound(new { message = "Nhà xuất bản không tồn tại." });
            }

            publisher.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa nhà xuất bản thành công." });
        }

        // Tắt/Mở trạng thái hoạt động
        [HttpPost("{id}/toggle-status")]
        public async Task<IActionResult> ToggleStatus(int id)
        {
            var publisher = await _context.Publishers.FindAsync(id);
            if (publisher == null)
            {
                return NotFound(new { message = "Nhà xuất bản không tồn tại." });
            }

            publisher.IsActive = !publisher.IsActive;
            publisher.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Trạng thái hoạt động đã được cập nhật.", isActive = publisher.IsActive });
        }

      
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPublisher(int id)
        {
            var publisher = await _context.Publishers.FindAsync(id);
            if (publisher == null)
            {
                return NotFound(new { message = "Nhà xuất bản không tồn tại." });
            }

            return Ok(publisher);
        }


        [HttpGet()]
        public async Task<IActionResult> GetAllPublisher()
        {
            var categories = await _context.Publishers
      .Where(c => c.DeletedAt == null) // Chỉ lấy các danh mục có ParentCategory
     
      .ToListAsync();

            return Ok(categories);
        }
    }
}
