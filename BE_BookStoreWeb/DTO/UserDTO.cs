using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.DTO
{
    public class RegisterDTO
    {

        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }

    }


    public class LoginDTO
    {
        public string Email { get; set; }

        public string Password { get; set; }

    }


    public class InformationUser
    {
       
        public string? Id { get; set; } // Khóa chính, kiểu string (varchar)

        public string FullName { get; set; } // Họ và tên
        public string? Email { get; set; } // Địa chỉ email
        public string? PhoneNumber { get; set; } // Số điện thoại
        public string? Address { get; set; } // Địa chỉ
        public bool? Gender { get; set; } // Giới tính (true = nam, false = nữ)
        public DateTime? Birthday { get; set; } // Ngày sinh
       
       
    }


    public class ChangePasswordDTO
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
