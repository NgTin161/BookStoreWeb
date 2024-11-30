using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.DTO
{
    public class CreateCategoryDTO
    {
        [Required]
        [MaxLength(255)]
        public string NameCategory { get; set; }

        public int? ParentId { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }
    }

    public class UpdateCategoryDTO
    {
        [MaxLength(255)]
        public string? NameCategory { get; set; }

        [MaxLength(255)]
        public string? Slug { get; set; }

        public int? ParentId { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }
    }

    public class CategoryDTO
    {
        public int Id { get; set; }
        public string NameCategory { get; set; }
        public string Slug { get; set; }
        public string? Description { get; set; }
        public int? ParentId { get; set; }

        public string? ParentName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public CategoryDTO? ParentCategory { get; set; }

        // Dữ liệu về danh sách danh mục con
        public List<CategoryDTO> ChildCategories { get; set; } = new List<CategoryDTO>();
    }


}
