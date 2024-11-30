using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.Models
{
    public class Coupon
    {
        [Key]
        public int Id { get; set; } // Khóa chính

        [Required(ErrorMessage = "Tiêu đề là bắt buộc.")]
        [MaxLength(255, ErrorMessage = "Tiêu đề không được vượt quá 255 ký tự.")]
        public string Title { get; set; } // Tiêu đề của mã giảm giá

        [Required(ErrorMessage = "Mã giảm giá là bắt buộc.")]
        [MaxLength(50, ErrorMessage = "Mã giảm giá không được vượt quá 50 ký tự.")]
        public string CouponCode { get; set; } // Mã giảm giá

        [Required]
        public DateTime StartDate { get; set; } // Ngày bắt đầu hiệu lực

        [Required]
        public DateTime EndDate { get; set; } // Ngày kết thúc hiệu lực

        [MaxLength(1000, ErrorMessage = "Mô tả không được vượt quá 1000 ký tự.")]
        public string? Description { get; set; } // Mô tả chi tiết mã giảm giá

        [Range(0, 100, ErrorMessage = "Phần trăm giảm giá phải nằm trong khoảng từ 0 đến 100.")]
        public double? PercentDiscount { get; set; }// Phần trăm giảm giá

        [Range(0, double.MaxValue, ErrorMessage = "Tiền giảm giá phải lớn hơn hoặc bằng 0.")]
        public double discountPrice { get; set; } // số tiền giảm giá 

        public bool IsActive { get; set; } // Trạng thái hoạt động của mã giảm giá
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public DateTime? DeleteAt { get; set; } // Thời điểm xóa mã giảm giá (nếu có)

        [Range(0, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn hoặc bằng 0.")]
        public int Quantity { get; set; } // Số lượng mã giảm giá còn lại
    }
}
