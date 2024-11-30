using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace be_bookstoreweb.Models
{
  
        public class User
        {
            [Key]
            public string Id { get; set; } // Khóa chính, kiểu string (varchar)
   
            public string FullName { get; set; } // Họ và tên
            public string Email { get; set; } // Địa chỉ email
            public string HashPassword { get; set; } // Mật khẩu
            public string? PhoneNumber { get; set; } // Số điện thoại
            public string? Address { get; set; } // Địa chỉ
            public bool? Gender { get; set; } // Giới tính (true = nam, false = nữ)
            public DateTime? Birthday { get; set; } // Ngày sinh
            public bool IsActive { get; set; } // Trạng thái hoạt động (đang hoạt động hoặc không)

            public bool IsAdmin { get; set; } // true = quản trị viên, false = người dùng bình thường

        public User()
            {
                IsActive = true;
                IsAdmin = false;
            }
        }

   
}
