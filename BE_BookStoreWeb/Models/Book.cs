using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.Models
{
    public class Book
    {
        [Key]
        public int  Id { get; set; } // Khóa chính, kiểu int 
        [Required]
        [MaxLength(50)]
        public string BookCode  {    get; set; }

          
        [Required(ErrorMessage = "Tên sách là bắt buộc.")]
        [MaxLength(255, ErrorMessage = "Tên sách không được vượt quá 255 ký tự.")]
        public string Name { get; set; } // Tên sách

        [MaxLength( ErrorMessage = "Mô tả không được vượt quá 1000 ký tự.")]
        public string Description { get; set; } // Mô tả sách

        [Range(0, double.MaxValue, ErrorMessage = "Giá sách phải lớn hơn hoặc bằng 0.")]
        public double Price { get; set; } // Giá sách

        [Range(0, double.MaxValue, ErrorMessage = "Giá sách phải lớn hơn hoặc bằng 0.")]
        public double? PromotionalPrice { get; set; } // Giá sách


        [Required(ErrorMessage = "Tên tác giả là bắt buộc.")]
        [MaxLength(255, ErrorMessage = "Tên tác giả không được vượt quá 255 ký tự.")]
        public string AuthorName { get; set; } // Tên sách
        [ForeignKey("Publisher")]
        public int PublisherId { get; set; } // Khóa ngoại liên kết với Publisher (nếu có)

        [Range(0, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn hoặc bằng 0.")]
        public int Stock { get; set; } // Số lượng sách có sẵn

        [Range(1, int.MaxValue, ErrorMessage = "Số trang phải lớn hơn hoặc bằng 1.")]
        public int PageCount { get; set; } // Số trang của sách

        public string Language { get; set; } // Ngôn ngữ sách

       
        public double? AveragePoint { get; set; } // Điểm trung bình

        public int? ClickCount { get; set; } // Số lần click vào sách

        public int? SoldCount { get; set; } // Số sách đã bán

        
        public string Slug { get; set; } // Slug cho sách (dùng trong URL)

        public bool IsActive { get; set; } // Trạng thái sách (đang hoạt động hay không)

        public DateTime CreatedAt { get; set; } // Thời gian tạo sách

        public DateTime? UpdatedAt { get; set; } // Thời gian cập nhật sách

        public DateTime? DeletedAt { get; set; } // Thời gian xóa sách

        public virtual Publisher Publisher { get; set; }

        // Mối quan hệ nhiều-nhiều với Category
        //public virtual ICollection<BookCategory> BookCategories { get; set; }
        public ICollection<Category> Categories { get; set; }
        public virtual ICollection<ImageBook> ImageBook { get; set; }

        public virtual ICollection<Review> Reviews { get; set; } 

        public Book()
        {
            IsActive = true;
          
        }
    }
}
