using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace be_bookstoreweb.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(1000, ErrorMessage = "Bình luận không được vượt quá 1000 ký tự.")]
        public string Comment { get; set; }

        [Range(1, 5, ErrorMessage = "Đánh giá phải nằm trong khoảng từ 1 đến 5.")]
        public int Rate { get; set; }

        [ForeignKey("Invoice")]
        public int InvoiceId { get; set; }
        public virtual Invoice Invoice { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }
        public virtual Book Book { get; set; }


        public DateTime CreatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
    }
}
