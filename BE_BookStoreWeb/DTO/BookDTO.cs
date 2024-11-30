using be_bookstoreweb.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class BookDTO
{

    [Required(ErrorMessage = "Mã sách là bắt buộc.")]
    [MaxLength(50, ErrorMessage = "Mã sách không được vượt quá 50 ký tự.")]
    public string BookCode { get; set; } // Mã sách

    [Required(ErrorMessage = "Tên sách là bắt buộc.")]
    [MaxLength(255, ErrorMessage = "Tên sách không được vượt quá 255 ký tự.")]
    public string Name { get; set; } // Tên sách

    public string Description { get; set; } // Mô tả sách

    [Range(0, double.MaxValue, ErrorMessage = "Giá sách phải lớn hơn hoặc bằng 0.")]
    public double Price { get; set; } // Giá sách

    [Range(0, double.MaxValue, ErrorMessage = "Giá khuyến mãi phải lớn hơn hoặc bằng 0.")]
    public double? PromotionalPrice { get; set; } // Giá khuyến mãi

    [Required(ErrorMessage = "Tên tác giả là bắt buộc.")]
    [MaxLength(255, ErrorMessage = "Tên tác giả không được vượt quá 255 ký tự.")]
    public string AuthorName { get; set; } // Tên sách
   

    [Required(ErrorMessage = "Nhà xuất bản là bắt buộc.")]
    public int PublisherId { get; set; } // ID nhà xuất bản


    [Range(0, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn hoặc bằng 0.")]
    public int Stock { get; set; } // Số lượng sách có sẵn

    [Range(1, int.MaxValue, ErrorMessage = "Số trang phải lớn hơn hoặc bằng 1.")]
    public int PageCount { get; set; } // Số trang sách

    public string Language { get; set; } // Ngôn ngữ sách

    public string? Slug { get; set; } // Slug cho sách (dùng trong URL)

    //public bool IsActive { get; set; } // Trạng thái hoạt động của sách

    public DateTime CreatedAt { get; set; } // Thời gian tạo sách

    //public DateTime? UpdatedAt { get; set; } // Thời gian cập nhật sách

    public List<int> CategoryIds { get; set; } // Danh sách ID thể loại sách

    //public List<string> CategoryNames { get; set; } // Danh sách tên thể loại sách

    //public List<string> Images { get; set; } // Danh sách URL hình ảnh sách
}


public class BookOutDTO
{
    public int Id { get; set; } // Id của sách
    public string BookCode { get; set; } // Mã sách
    public string Name { get; set; } // Tên sách
    public string Description { get; set; } // Mô tả sách
    public double Price { get; set; } // Giá sách
    public double? PromotionalPrice { get; set; } // Giá khuyến mãi
    public string AuthorName { get; set; }
  
    public int PublisherId { get; set; } // ID nhà xuất bản
    public string PublisherName { get; set; } // Tên nhà xuất bản
    public int Stock { get; set; } // Số lượng sách
    public int PageCount { get; set; } // Số trang
    public string Language { get; set; } // Ngôn ngữ sách
    public bool IsActive { get; set; } // Trạng thái hoạt động

    public List<int> CategoryId { get; set; }
    public DateTime CreatedAt { get; set; } // Thời gian tạo
    public DateTime? UpdatedAt { get; set; } // Thời gian cập nhật
    public List<string> CategoryNames { get; set; } // Danh sách tên thể loại
    public string Slug { get; set; } // Slug sách
    public List<string> ImageUrls { get; set; } // Danh sách URL ảnh
}



public class AllBookDTO
{
    public int Id { get; set; } // Id của sách
    public string BookCode { get; set; } // Mã sách
    public string Name { get; set; } // Tên sách
    public double Price { get; set; } // Giá sách
    public double? PromotionalPrice { get; set; } // Giá khuyến mãi
    public int PublisherId { get; set; } // ID nhà xuất bản
    public string PublisherName { get; set; } // Tên nhà xuất bản
    public int Stock { get; set; } // Số lượng sách
    
    public bool IsActive { get; set; } // Trạng thái hoạt động
    public DateTime CreatedAt { get; set; } // Thời gian tạo
    public List<string> ImageUrls { get; set; } // Danh sách URL ảnh
}



public class BookHomePage
{
    public int Id { get; set; }
    public string BookCode { get; set; }

    public string Name { get; set; } // Tên sách

    public double Price { get; set; } // Giá sách

    public double? PromotionalPrice { get; set; } // Giá sách

    public string AuthorName { get; set; } // Tên sách
 
    public int Stock { get; set; } // Số lượng sách có sẵn
    public double? AveragePoint { get; set; } // Điểm trung bình

    public int? ClickCount { get; set; } // Số lần click vào sách

    public int? SoldCount { get; set; } // Số sách đã bán

    public string Slug { get; set; } // Slug cho sách (dùng trong URL)

    public DateTime CreatedAt { get; set; } // Thời gian tạo sách

    public List<string> CategoryNames { get; set; } 
    public List<string> ImageUrls { get; set; }
}


public class WishlistDTO
{
    public string UserId { get; set; }
    public int BookId { get; set; }
}