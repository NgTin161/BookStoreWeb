using be_bookstoreweb.Models;
using Microsoft.EntityFrameworkCore;

namespace be_bookstoreweb.Data
{
    public class BookStoreWebDB : DbContext
    {
        public BookStoreWebDB(DbContextOptions<BookStoreWebDB> options)
          : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Slideshow> Slideshows { get; set; }
        public DbSet<User> Users { get; set; } // Thêm DbSet cho bảng Users
        public DbSet<Book> Books { get; set; }

        //public DbSet<BookCategory> BookCategories { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Information> Informations { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; } 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Bạn có thể cấu hình các mối quan hệ và các chi tiết khác ở đây nếu cần.
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Wishlist>()
        .HasKey(w => new { w.UserId, w.BookId });

            modelBuilder.Entity<Review>()
       .HasOne(r => r.Invoice)                
       .WithMany(i => i.Reviews)             
       .HasForeignKey(r => r.InvoiceId)       
       .OnDelete(DeleteBehavior.NoAction);    // Không xóa tự động khi Invoice bị xóa


        }




    }
}
