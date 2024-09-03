using AngularApp1.Server.Data;
using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace AngularApp1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserModel model)
        {
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return BadRequest("Email already in use.");
            }

            var user = new UserRM
            {
                Name = model.Name,
                Email = model.Email,
                // Hash the password before saving
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
                IsAdmin = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
