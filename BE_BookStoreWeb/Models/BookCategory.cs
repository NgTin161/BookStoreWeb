using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.Models
{
    public class BookCategory
    {
            // Khóa ngoại liên kết với Book
            [ForeignKey("Book")]
            public int  BookId { get; set; }

            // Khóa ngoại liên kết với Category
            [ForeignKey("Category")]
            public int CategoryId { get; set; }


    

        // Mối quan hệ với Book và Category
              public virtual Book Book { get; set; }
            public virtual Category Category { get; set; }
        }

}
