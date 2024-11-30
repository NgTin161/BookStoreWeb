    using System.ComponentModel.DataAnnotations;

    namespace be_bookstoreweb.DTO
    {
        public class ContactDTO
        {
            public int? Id { get; set; } // Khóa chính

            [Required(ErrorMessage = "Họ và tên là bắt buộc.")]
            [StringLength(100, ErrorMessage = "Tên không được vượt quá 100 ký tự.")]
            public string Fullname { get; set; } // Tên người liên hệ

            [Required(ErrorMessage = "Email là bắt buộc.")]
            [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
            public string Email { get; set; } // Email người liên hệ

            [Required(ErrorMessage = "Số điện thoại là bắt buộc.")]
            [Phone(ErrorMessage = "Số điện thoại không hợp lệ.")]
            [StringLength(10, MinimumLength = 10, ErrorMessage = "Số điện thoại phải có 10 chữ số.")]
            public string Phone { get; set; } // Số điện thoại

            [Required(ErrorMessage = "Nội dung tin nhắn là bắt buộc.")]
            [StringLength(1000, ErrorMessage = "Tin nhắn không được vượt quá 1000 ký tự.")]
            public string Message { get; set; } // Nội dung tin nhắn

            public DateTime CreateAt { get; set; } // Thời gian tạo

             public DateTime? Delete { get; set; } 
        }
    }
