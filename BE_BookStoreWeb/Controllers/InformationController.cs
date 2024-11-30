using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using be_bookstoreweb.Data;
using be_bookstoreweb.Models;
using be_bookstoreweb.DTO;

namespace be_bookstoreweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InformationController : ControllerBase
    {
        private readonly BookStoreWebDB _context;

        public InformationController(BookStoreWebDB context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateInformation([FromBody] InformationDTO informationDto)
        {
            // Kiểm tra tính hợp lệ của dữ liệu
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Tạo đối tượng Information từ DTO
            var information = new Information
            {
                Name = informationDto.Name,
                Phone = informationDto.Phone,
                Email = informationDto.Email,
                Address = informationDto.Address,
                Description = informationDto.Description,
                ShippingPolicy = informationDto.ShippingPolicy,
                FacebookLink = informationDto.FacebookLink,
                InstagramLink = informationDto.InstagramLink
            };

            // Lưu vào database
            _context.Informations.Add(information);
            await _context.SaveChangesAsync();

            // Trả về kết quả
            return Ok(new { message = "Information created successfully", data = information });
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInformation(int id, [FromBody] InformationDTO informationDto)
        {
            // Kiểm tra tính hợp lệ của dữ liệu
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Tìm đối tượng thông tin cần cập nhật trong database
            var information = await _context.Informations.FindAsync(id);

            if (information == null)
            {
                return NotFound(new { message = "Information not found" });
            }

            // Cập nhật thông tin từ DTO
            information.Name = informationDto.Name;
            information.Phone = informationDto.Phone;
            information.Email = informationDto.Email;
            information.Address = informationDto.Address;
            information.Description = informationDto.Description;
            information.ShippingPolicy = informationDto.ShippingPolicy;
            information.FacebookLink = informationDto.FacebookLink;
            information.InstagramLink = informationDto.InstagramLink;

            // Lưu thay đổi vào database
            _context.Informations.Update(information);
            await _context.SaveChangesAsync();

            // Trả về kết quả
            return Ok(new { message = "Information updated successfully", data = information });
        }


        [HttpGet]
        public async Task<IActionResult> GetAllInformations()
        {
            var informations = await _context.Informations.FirstOrDefaultAsync();

            if (informations == null)
            {
                return NotFound("No information found.");
            }

            
            if (!string.IsNullOrEmpty(informations.Logo))
            {
                informations.Logo = $"{Request.Scheme}://{Request.Host}/{informations.Logo}";
            }

            return Ok(informations);
        }


        [HttpPost]
        [Route("create-logo")]
        public async Task<ActionResult> CreateLogo(int Id,[FromForm] IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return BadRequest("Invalid image file.");
            }
            var infor = await _context.Informations.FirstOrDefaultAsync(h => h.Id == Id);
            if (infor.Logo != null)
                DeleteImage(infor.Logo);
            var saveResult = await InsertAsync(Id, imageFile);
            if (!saveResult)
            {
                return StatusCode(500, "Error occurred while saving the image.");
            }

            var updatedInformation = await _context.Informations.FindAsync(Id);
            if (updatedInformation == null)
            {
                return NotFound($"No Information found with ID {Id}");
            }

            return Ok();
        }

        private async Task<bool> InsertAsync(int id, IFormFile imageFile)

        {
            try
            {
                var information = await _context.Informations.FindAsync(id);
                if (information == null)
                {
                    throw new Exception($"Information with ID {id} not found.");
                }

                var imagePath = await SaveImage(imageFile);
                if (string.IsNullOrWhiteSpace(imagePath))
                {
                    throw new Exception("Failed to save image.");
                }

                // Save image path to the Information entity
                information.Logo = imagePath;

                _context.Update(information);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log error (if logging mechanism exists)
                Console.WriteLine(ex.Message);
                return false;
            }
        }



        private const string ImageFolderPath = "wwwroot";

       
        private async Task<string> SaveImage(IFormFile imageFile)
        {
            var imageName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(ImageFolderPath, imageName);

            // Ensure the directory exists
            var directory = Path.GetDirectoryName(imagePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return imageName; // Only return image name
        }

        private void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(ImageFolderPath, imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
