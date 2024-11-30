using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace be_bookstoreweb.Models
{
    public class Category
    {
        [Key] // Đánh dấu khóa chính
        public int Id { get; set; }

        [Required] // Trường bắt buộc
        [MaxLength(255)] // Độ dài tối đa 255 ký tự
        [NotNull]
        public string NameCategory { get; set; } // Tên danh mục

        public string Slug { get; set; } // Slug để tạo đường dẫn đẹp

        public int? ParentId { get; set; } // ID của danh mục cha (có thể là null nếu không có danh mục cha)

        [MaxLength(500)] // Độ dài tối đa 500 ký tự
        public string? Description { get; set; } // Mô tả danh mục

        public DateTime CreatedAt { get; set; } // Thời gian tạo

        public DateTime? UpdatedAt { get; set; } // Thời gian cập nhật (optional)

        public DateTime? DeletedAt { get; set; } // Thời gian xóa (optional)

        // Navigation properties
        [ForeignKey("ParentId")]
        public virtual Category ParentCategory { get; set; } // Danh mục cha

        public ICollection<Book> Books { get; set; }
        public virtual ICollection<Category> ChildCategories { get; set; } // Danh sách danh mục con
    }
}
