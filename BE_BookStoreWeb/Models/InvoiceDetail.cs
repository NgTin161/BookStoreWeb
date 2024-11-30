using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace be_bookstoreweb.Models
{
    public class InvoiceDetail
    {
        [Key]
        public int Id { get; set; } // Khóa chính

        [Range(0, double.MaxValue, ErrorMessage = "Giá sách phải lớn hơn hoặc bằng 0.")]
        public double Price { get; set; } // Giá sách tại thời điểm mua

        [Range(1, int.MaxValue, ErrorMessage = "Số lượng sách phải lớn hơn hoặc bằng 1.")]
        public int Count { get; set; } // Số lượng sách trong đơn hàng

        [ForeignKey("Invoice")]
        public int InvoiceId { get; set; } // Khóa ngoại liên kết với bảng Invoices
        public virtual Invoice Invoice { get; set; } // Navigation property tới Invoice

        [ForeignKey("Book")]
        public int BookId { get; set; } // Khóa ngoại liên kết với bảng Books
        public virtual Book Book { get; set; } // Navigation property tới Book
    }
}
