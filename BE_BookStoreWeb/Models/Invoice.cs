using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Azure.Core.HttpHeader;

namespace be_bookstoreweb.Models
{
    public class Invoice
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string InvoiceCode { get; set; } // 
        [Required(ErrorMessage = "Tên khách hàng là bắt buộc.")]
        [MaxLength(255, ErrorMessage = "Tên khách hàng không được vượt quá 255 ký tự.")]
        public string CustomerName { get; set; } // Tên khách hàng

        [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
        public string Email { get; set; } // Email khách hàng (có thể null)

        [MaxLength(10, ErrorMessage = "Số điện thoại không được vượt quá 15 ký tự.")]
        public string PhoneNumber { get; set; } // Số điện thoại khách hàng (có thể null)

        [MaxLength(500)]
        public string? Note { get; set; } // Ghi chú từ khách hàng (nullable)

        [Required]
        public DateTime OrderDate { get; set; } // Ngày đặt hàng

        [Range(0, double.MaxValue, ErrorMessage = "Tổng giá trị đơn hàng phải lớn hơn hoặc bằng 0.")]
        public double TotalPrice { get; set; } // Tổng giá trị đơn hàng (trước chiết khấu)

        [Range(0, double.MaxValue, ErrorMessage = "Chiết khấu phải lớn hơn hoặc bằng 0.")]
        public double Discount { get; set; } // Chiết khấu được áp dụng

        [Range(0, double.MaxValue, ErrorMessage = "Tổng tiền thanh toán phải lớn hơn hoặc bằng 0.")]
        public double TotalAmount { get; set; } // Tổng tiền thanh toán (sau chiết khấu)

        [ForeignKey("User")]
        public string UserId { get; set; } // Khóa ngoại tới bảng Users
        public virtual User User { get; set; } // Navigation property tới User

        [ForeignKey("PaymentMethod")]
        public int? PaymentId { get; set; } // Khóa ngoại tới bảng PaymentMethods
        public virtual PaymentMethod? PaymentMethod { get; set; } // Navigation property tới PaymentMethod

        [ForeignKey("Coupon")]
        public int? CouponId { get; set; } // Khóa ngoại tới bảng Coupons
        public virtual Coupon? Coupon { get; set; } // Navigation property tới Coupon

        [Required]
        [Range(0, 5, ErrorMessage = "Trạng thái không hợp lệ.")]
        public int Status { get; set; } // Trạng thái đơn hàng

        public DateTime CreatedAt { get; set; } // Thời gian tạo hóa đơn

        public DateTime? UpdatedAt { get; set; } // Thời gian cập nhật hóa đơn

        public DateTime? DeletedAt { get; set; } // Thời gian xóa hóa đơn (logical delete)


        public virtual ICollection<Review> Reviews { get; set; }

        public Invoice()
        {
            Reviews = new List<Review>(); 
        }

    }
}
