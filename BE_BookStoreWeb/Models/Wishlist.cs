using be_bookstoreweb.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class Wishlist
{
    [ForeignKey("User")]
    public string UserId { get; set; }
    public virtual User User { get; set; }

    [ForeignKey("Book")]
    public int BookId { get; set; }
    public virtual Book Book { get; set; }
}