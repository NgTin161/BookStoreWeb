using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.Models
{
        public class Publisher
        {
            [Key]
            public int Id { get; set; } // Khóa chính

            [Required(ErrorMessage = "Tên nhà xuất bản là bắt buộc.")]
            [MaxLength(255, ErrorMessage = "Tên nhà xuất bản không được vượt quá 255 ký tự.")]
            public string Name { get; set; } // Tên nhà xuất bản

            [MaxLength(500, ErrorMessage = "Mô tả nhà xuất bản không được vượt quá 500 ký tự.")]
            public string? Description { get; set; } // Mô tả nhà xuất bản

            public bool IsActive { get; set; } // Trạng thái hoạt động

            public DateTime CreatedAt { get; set; } // Thời gian tạo

            public DateTime? UpdatedAt { get; set; } // Thời gian cập nhật

            public DateTime? DeletedAt { get; set; } // Thời gian xóa (logical delete)
        }
    
}
