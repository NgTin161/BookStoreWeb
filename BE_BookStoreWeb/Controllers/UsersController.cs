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
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Google;
using Google.Apis.Auth;

namespace be_bookstoreweb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BookStoreWebDB _context;
        private readonly IConfiguration _configuration;
        public UsersController(BookStoreWebDB context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }



        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO register)
        {
            try
            {
                // Kiểm tra xem email đã tồn tại chưa
                var emailExists = await _context.Users.AnyAsync(u => u.Email == register.Email);
                if (emailExists)
                {
                    return BadRequest("Email đã tồn tại.");
                }

                // Kiểm tra xem số điện thoại đã tồn tại chưa
                var phoneNumberExists = await _context.Users.AnyAsync(u => u.PhoneNumber == register.PhoneNumber);
                if (phoneNumberExists)
                {
                    return BadRequest("Số điện thoại đã tồn tại.");
                }

                // Tạo người dùng mới
                var user = new User
                {
                    Id = Guid.NewGuid().ToString(),
                    FullName = register.FullName,
                    Email = register.Email,
                    PhoneNumber = register.PhoneNumber,
                    HashPassword = BCrypt.Net.BCrypt.HashPassword(register.Password), // Hash mật khẩu
                    IsActive = true, // Mặc định tài khoản kích hoạt
                    IsAdmin = false // Mặc định không phải admin
                };

                // Lưu người dùng vào cơ sở dữ liệu
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Gán vai trò mặc định cho người dùng
                var role = "User";

                return Ok("Đăng ký thành công.");
            }
            catch (Exception ex)
            {
                // Xử lý lỗi
                return StatusCode(StatusCodes.Status500InternalServerError, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO account)
        {
            try
            {
                // Truy vấn người dùng từ bảng `Users` dựa trên email
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == account.Email);

                if (user == null)
                {
                    return Forbid("Invalid email or password.");
                }

                // Kiểm tra trạng thái hoạt động của tài khoản
                if (!user.IsActive)
                {
                    return StatusCode(403, "Account is not active.");
                }

                // Kiểm tra mật khẩu đã hash
                if (!BCrypt.Net.BCrypt.Verify(account.Password, user.HashPassword))
                {
                    return Unauthorized("Invalid email or password.");
                }

                // Lấy danh sách vai trò từ bảng UserRoles (nếu có)
                //var userRoles = await _context.UserRoles
                //    .Where(ur => ur.UserId == user.Id)
                //    .Select(ur => ur.RoleName)
                //    .ToListAsync();

                // Tạo danh sách các claims cho JWT
                var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Sub, user.Id), // ID người dùng
            new Claim("fullName", user.FullName),
            new Claim("email", user.Email),
            new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
        };

                if (!string.IsNullOrEmpty(user.PhoneNumber))
                {
                    authClaims.Add(new Claim("phoneNumber", user.PhoneNumber));
                }

                //foreach (var role in userRoles)
                //{
                //    authClaims.Add(new Claim(ClaimTypes.Role, role));
                //}

                // Tạo key và token cho JWT
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            catch (Exception ex)
            {
                // Log lỗi nếu cần
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] ExternalAuthDTO externalAuth)
        {
            try
            {
                // Xác minh token Google và lấy thông tin payload
                var payload = await VerifyGoogleToken(externalAuth.TokenId);
                if (payload == null)
                {
                    return BadRequest("Invalid External Authentication.");
                }

                // Lấy email và tên từ payload
                var userEmail = payload.Email;  
                var name = payload.Name;
              

                // Kiểm tra xem người dùng đã tồn tại chưa
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                if (user == null)
                {
                    // Nếu người dùng chưa tồn tại, tạo mới
                    user = new User
                    {
                        Email = userEmail,
                        FullName = name,
                        HashPassword = null, // Không lưu mật khẩu cho tài khoản Google
                        IsActive = true,     // Kích hoạt tài khoản mặc định
                        IsAdmin = false      // Gán mặc định không phải Admin
                    };

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                }

                // Tạo và trả về JWT Token
                var token = GenerateJwtToken(user);

                return Ok(new
                {
                    token = token,
                    expiration = DateTime.UtcNow.AddHours(3) // Thời gian hết hạn của token
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        private async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(string tokenId)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new List<string> { _configuration["Google:ClientId"] }
                };

                // Phương thức ValidateAsync trả về đối tượng kiểu GoogleJsonWebSignature.Payload
                return await GoogleJsonWebSignature.ValidateAsync(tokenId, settings);
            }
            catch
            {
                return null;
            }
        }



        [HttpGet]
        [Route("get-profile")]
        public async Task<IActionResult> GetProfile([FromQuery]string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("Người dùng không tồn tại.");

            var userProfile = new InformationUser
            {
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                Gender = user.Gender,
                Birthday = user.Birthday
            };

            return Ok(userProfile);
        }

        [HttpPost]
        [Route("update-profile")]
        public async Task<IActionResult> UpdateProfile(string id, [FromBody] InformationUser infor)
        {
         
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("Người dùng không tồn tại.");

            user.FullName = infor.FullName;
            user.PhoneNumber = infor.PhoneNumber;
            user.Address = infor.Address;
            user.Birthday = infor.Birthday;
            user.Gender = infor.Gender;

            _context.Users.Update(user);

          
            try
            {
                await _context.SaveChangesAsync();
                return Ok("Thông tin người dùng đã được cập nhật thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi khi cập nhật thông tin người dùng: {ex.Message}");
            }
        }


        [HttpPost]
        [Route("change-password")]
        public async Task<IActionResult> ChangePassword(string id, [FromBody] ChangePasswordDTO changePasswordDTO)
        {
            try
            {
                
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound("Người dùng không tồn tại.");
                }

                var isCurrentPasswordValid = BCrypt.Net.BCrypt.Verify(changePasswordDTO.CurrentPassword, user.HashPassword);
                if (!isCurrentPasswordValid)
                {
                    return BadRequest("Mật khẩu hiện tại không đúng.");
                }

           
                user.HashPassword = BCrypt.Net.BCrypt.HashPassword(changePasswordDTO.NewPassword);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok("Đổi mật khẩu thành công.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }

        private string GenerateJwtToken(User user)
        {
            var authClaims = new List<Claim>
    {
              new Claim(ClaimTypes.Name, user.FullName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Sub, user.Id), // ID người dùng
            new Claim("fullName", user.FullName),
            new Claim("email", user.Email),
            new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
    };

            // Chỉ thêm claim phoneNumber nếu nó không phải null
            if (!string.IsNullOrEmpty(user.PhoneNumber))
            {
                authClaims.Add(new Claim("phoneNumber", user.PhoneNumber));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



    }
}
