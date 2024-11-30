using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace be_bookstoreweb.DTO
{
    public class SlideshowDTO
    {
      
        //public int? Id { get; set; } // Khóa chính
        public string? ImageURL { get; set; }

        public string Link { get; set; }
        public string? Description { get; set; }


        public bool? IsActive { get; set; }

        //public DateTime? CreatedAt { get; set; }
        //public DateTime? DeletedAt { get; set; }
        //public DateTime? UpdatedTime { get; set; }

    }

    public class SlideshowOutDTO
    {

        public int? Id { get; set; } // Khóa chính
        public string? ImageURL { get; set; }

        public string Link { get; set; }
        public string? Description { get; set; }


        public bool? IsActive { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public DateTime? UpdatedTime { get; set; }

    }
}
