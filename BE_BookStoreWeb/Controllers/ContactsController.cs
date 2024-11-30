using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be_bookstoreweb.Data;
using be_bookstoreweb.DTO;
using be_bookstoreweb.Models;

namespace be_bookstoreweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly BookStoreWebDB _context;

        public ContactsController(BookStoreWebDB context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _context.Contacts
                .Where(c => c.DeletedAt == null)
                .ToListAsync();
            return Ok(contacts);
        }

        // GET: api/Contacts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(int id)
        {
            var contact = await _context.Contacts
                .Where(c => c.Id == id && c.DeletedAt == null)
                .FirstOrDefaultAsync();

            if (contact == null)
            {
                return NotFound(new { Message = "Contact not found or has been deleted." });
            }

            return Ok(contact);
        }

        // POST: api/Contacts
        [HttpPost]
        public async Task<IActionResult> PostContact([FromBody] ContactDTO contactDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contact = new Contact
            {
                Fullname = contactDto.Fullname,
                Email = contactDto.Email,
                Phone = contactDto.Phone,
                Message = contactDto.Message,
                CreateAt = DateTime.Now
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        // PUT: api/Contacts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, [FromBody] ContactDTO contactDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingContact = await _context.Contacts
                .Where(c => c.Id == id && c.DeletedAt == null)
                .FirstOrDefaultAsync();

            if (existingContact == null)
            {
                return NotFound(new { Message = "Contact not found or has been deleted." });
            }

            // Update fields
            existingContact.Fullname = contactDto.Fullname;
            existingContact.Email = contactDto.Email;
            existingContact.Phone = contactDto.Phone;
            existingContact.Message = contactDto.Message;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound(new { Message = "Contact not found." });
                }

                throw;
            }

            return NoContent();
        }

        // DELETE: api/Contacts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts
                .Where(c => c.Id == id && c.DeletedAt == null)
                .FirstOrDefaultAsync();

            if (contact == null)
            {
                return NotFound(new { Message = "Contact not found or has already been deleted." });
            }

            contact.DeletedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(c => c.Id == id && c.DeletedAt == null);
        }
    }
}
