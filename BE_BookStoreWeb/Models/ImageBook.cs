using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace be_bookstoreweb.Models
{
    public class ImageBook
    {
        [Key]
        public int Id { get; set; }


        public string? ImageUrl { get; set; }

        public int BookId { get; set; }

        [ForeignKey("BookId")]
        public Book Book { get; set; }
    }
}
