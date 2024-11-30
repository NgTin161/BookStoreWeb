using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace be_bookstoreweb.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; } // Khóa chính

        [ForeignKey("User")]
        public string UserId { get; set; } // Khóa ngoại liên kết với bảng Users
        public virtual User User { get; set; } // Navigation property tới User

        [ForeignKey("Book")]
        public int BookId { get; set; } // Khóa ngoại liên kết với bảng Books
        public virtual Book Book { get; set; } // Navigation property tới Book

        [Range(1, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn hoặc bằng 1.")]
        public int Quantity { get; set; } // Số lượng sản phẩm trong giỏ hàng

        [Range(0, double.MaxValue, ErrorMessage = "Giá phải lớn hơn hoặc bằng 0.")]

        [NotMapped]
        public double TotalPrice => Book != null ? Quantity * Book.Price : 0;
    }
}
