using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace be_bookstoreweb.Models
{
    public class Information
    {
        [Key]
        public int Id { get ; set; }
        [Required]
        public string Name { get; set; } // Tên công ty

        [Required]
        public string Phone { get; set; } // Số điện thoại

        [Required]
        public string Email { get; set; } // Địa chỉ email

      
        [Required]
        public string Address { get; set; } // Địa chỉ
        public string? Description { get; set; } // Mô tả
        public string? ShippingPolicy { get; set; } // Chính sách vận chuyển
        public string? Logo { get; set; } // Logo của công ty
        public string? FacebookLink { get; set; } // Liên kết Facebook
        public string? InstagramLink { get; set; } // Liên kết Instagram
    }
}
