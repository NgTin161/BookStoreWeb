using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be_bookstoreweb.Data;

namespace be_bookstoreweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistsController : ControllerBase
    {
        private readonly BookStoreWebDB _context;

        public WishlistsController(BookStoreWebDB context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("add-to-wishlist")]
        public async Task<IActionResult> ToggleWishlist([FromBody] WishlistDTO wishlistDTO)
        {

            if (wishlistDTO == null || string.IsNullOrEmpty(wishlistDTO.UserId) || wishlistDTO.BookId <= 0)
            {
                return BadRequest("Invalid data.");
            }

            var existingWishlistItem = await _context.Wishlists
                .FirstOrDefaultAsync(w => w.UserId == wishlistDTO.UserId && w.BookId == wishlistDTO.BookId);

            if (existingWishlistItem != null)
            {

                _context.Wishlists.Remove(existingWishlistItem);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Removed from wishlist." });
            }
            else
            {

                var newWishlistItem = new Wishlist
                {
                    UserId = wishlistDTO.UserId,
                    BookId = wishlistDTO.BookId
                };
                _context.Wishlists.Add(newWishlistItem);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Added to wishlist." });
            }
        }
        [HttpGet]
        [Route("check-wishlist")]
        public async Task<IActionResult> CheckWishlistStatus(string userId, int bookId)
        {
            var exists = await _context.Wishlists
                .AnyAsync(w => w.UserId == userId && w.BookId == bookId);

            if (exists)
            {
                return Ok(new { message = "Book is in the wishlist" });
            }

            return NotFound(new { message = "Book is not in the wishlist" });
        }





    }
}
