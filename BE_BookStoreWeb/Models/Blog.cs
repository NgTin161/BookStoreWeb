using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.Models
{
    public class Blog
    {
        [Key]
        public int Id { get; set; } // Khóa chính

        [Required(ErrorMessage = "Tiêu đề là bắt buộc.")]
        [MaxLength(255, ErrorMessage = "Tiêu đề không được vượt quá 255 ký tự.")]
        public string Title { get; set; } // Tiêu đề của bài viết

        [Required(ErrorMessage = "Nội dung bài viết là bắt buộc.")]
        public string Content { get; set; } // Nội dung chi tiết của bài viết

        [MaxLength(500, ErrorMessage = "URL hình ảnh không được vượt quá 500 ký tự.")]
        public string? ImageURL { get; set; } // URL hình ảnh đại diện cho bài viết

        public DateTime CreateAt { get; set; } // Ngày tạo bài viết

        public DateTime? UpdateAt { get; set; } // Ngày cập nhật bài viết (nếu có)

        public DateTime? DeleteAt { get; set; } // Thời điểm bài viết bị xóa (logic delete)
    }
}
