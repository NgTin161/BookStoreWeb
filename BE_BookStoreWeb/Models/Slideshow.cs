using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace be_bookstoreweb.Models
{
    public class Slideshow
    {
        [Key]
        public int Id { get; set; } // Khóa chính
        public string ImageURL { get; set; }
       
        public string Link { get; set; }
        public string? Description { get; set; }

        [DefaultValue(true)]
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public DateTime? UpdatedTime { get; set; }

        public Slideshow()
        {
            IsActive = true;
            CreatedAt = DateTime.Now;
        }
    }
 }
    