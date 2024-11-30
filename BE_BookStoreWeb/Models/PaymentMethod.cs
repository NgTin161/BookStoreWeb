using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.Models
{
    public class PaymentMethod
    {
        [Key]
        public int Id { get; set; } // Khóa chính

        [Required(ErrorMessage = "Tên phương thức thanh toán là bắt buộc.")]
        [MaxLength(255, ErrorMessage = "Tên phương thức thanh toán không được vượt quá 255 ký tự.")]
        public string Name { get; set; } // Tên phương thức thanh toán

        public bool IsActive { get; set; }// Trạng thái hoạt động

        public PaymentMethod()
        {
            IsActive = true ;
        }
    }
}
