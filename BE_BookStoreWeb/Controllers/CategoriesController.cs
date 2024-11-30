using be_bookstoreweb.Data;
using be_bookstoreweb.DTO;
using be_bookstoreweb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly BookStoreWebDB _context;

    public CategoriesController(BookStoreWebDB context)
    {
        _context = context;
    }


    [HttpGet]
    [Route("get-father-category")]
    public async Task<ActionResult<IEnumerable<object>>> GetFatherCategories()
    {
        var categories = await _context.Categories
      .Where(c => c.ParentId == null && c.DeletedAt == null) // Chỉ lấy các danh mục có ParentCategory
      .Select(c => new CategoryDTO
      {
          Id = c.Id,
          NameCategory = c.NameCategory
      })
      // Đảm bảo không lặp lại các danh mục cha
      .ToListAsync();

        return Ok(categories);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategories()
    {
        var categories = await _context.Categories
             .Where(c => c.ParentId == null && c.DeletedAt == null )
            .Select(c => new CategoryDTO
            {
                Id = c.Id,
                NameCategory = c.NameCategory,
                Slug = c.Slug,
                Description = c.Description,
         
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt,
                DeletedAt = c.DeletedAt,
             
            })
            .ToListAsync();

        return Ok(categories);
    }

    [HttpGet]
    [Route("get-chill-category")]
    public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetChillCategories()
    {
        var categories = await _context.Categories
             .Where(c => c.ParentId != null && c.DeletedAt == null)
            .Select(c => new CategoryDTO
            {
                Id = c.Id,
                NameCategory = c.NameCategory,
             

            })
            .ToListAsync();

        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
    {
        var category = await _context.Categories
            .Include(c => c.ParentCategory)  // Load danh mục cha
            .Include(c => c.ChildCategories) 
            .Where(c=> c.DeletedAt == null )// Load danh mục con
            .FirstOrDefaultAsync(c => c.Id == id);

        if (category == null)
        {
            return NotFound();
        }

        var categoryDTO = new CategoryDTO
        {
            Id = category.Id,
            NameCategory = category.NameCategory,
            Slug = category.Slug,
            Description = category.Description,
            ParentId = category.ParentId,
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt,
            DeletedAt = category.DeletedAt,
            ChildCategories = category.ChildCategories.Select(child => new CategoryDTO
            {
                Id = child.Id,
                NameCategory = child.NameCategory,
                Slug = child.Slug,
                Description = child.Description,
                ParentId = child.ParentId,
                CreatedAt = child.CreatedAt,
                UpdatedAt = child.UpdatedAt,
                DeletedAt = child.DeletedAt
            }).ToList()
        };

        return Ok(categoryDTO);
    }

    //[Authorize(Roles = "Admin")]
    [HttpPost]
    [Route("create-category")]
    public async Task<ActionResult<CategoryDTO>> CreateCategory([FromBody] CreateCategoryDTO createCategoryDTO)
    {
        var category = new Category
        {
            NameCategory = createCategoryDTO.NameCategory,
            Slug = GenerateSlug(createCategoryDTO.NameCategory),  // Tạo slug tự động từ tên danh mục
            ParentId = createCategoryDTO.ParentId,
            Description = createCategoryDTO.Description,
            CreatedAt = DateTime.Now
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, new CategoryDTO
        {
            Id = category.Id,
            NameCategory = category.NameCategory,
            Slug = category.Slug,
            Description = category.Description,
            ParentId = category.ParentId,
            CreatedAt = category.CreatedAt
        });
    }

    // 4. Update an existing category
    [HttpPut]
    [Route("update-category/{id}")]
    public async Task<ActionResult<CategoryDTO>> UpdateCategory(int id, [FromBody] UpdateCategoryDTO updateCategoryDTO)
    {
        // Find the existing category by ID
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            // Return 404 Not Found if the category does not exist
            return NotFound(new { Message = "Danh mục không tồn tại" });
        }

        // Update the fields with the new data
        category.NameCategory = updateCategoryDTO.NameCategory;
        category.Slug = GenerateSlug(updateCategoryDTO.NameCategory); 
        category.ParentId = updateCategoryDTO.ParentId; 
        category.Description = updateCategoryDTO.Description;
        category.UpdatedAt = DateTime.Now; 

        // Save changes to the database
        await _context.SaveChangesAsync();

        // Return the updated category
        return Ok(new CategoryDTO
        {
            Id = category.Id,
            NameCategory = category.NameCategory,
            Slug = category.Slug,
            Description = category.Description,
            ParentId = category.ParentId,
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt
        });
    }


    // 5. Delete a category 
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        // Kiểm tra nếu danh mục có danh mục con
        bool hasChildCategories = await _context.Categories.AnyAsync(c => c.ParentId == id);
        if (hasChildCategories)
        {
            return BadRequest();
        }

        // Đánh dấu là đã xóa (xóa mềm)
        category.DeletedAt = DateTime.Now;

        await _context.SaveChangesAsync();

        return Ok();
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

        // Thay thế nhiều khoảng trắng hoặc dấu gạch ngang liên tiếp thành một dấu gạch ngang
        slug = System.Text.RegularExpressions.Regex.Replace(slug, @"[\s-]+", "-");

        // Xóa dấu gạch ngang ở đầu và cuối
        slug = slug.Trim('-');

        return slug;
    }

}
