
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : ApiBaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _token;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService token, StoreContext context)
        {
            _context = context;
            _token = token;
            _userManager = userManager;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (user == null || !result)
            {
                return Unauthorized();
            }
            var userBasket = await RetrieveBasket(user.UserName!);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]!);

            if (anonBasket != null)
            {
                if (userBasket != null)
                {
                    _context.Baskets?.Remove(userBasket);
                }
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }
            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await _token.GenerateTokenAsync(user),
                Basket = anonBasket != null ? anonBasket?.MapBasketToDto() : userBasket?.MapBasketToDto()
            };
        }


        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,

            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await _userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }
        [Authorize]
        [HttpGet("CurrentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity?.Name);
            var userBasket = await RetrieveBasket(User.Identity?.Name!);
            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = await _token.GenerateTokenAsync(user),
                Basket = userBasket?.MapBasketToDto()

            };
        }
        [Authorize]
        [HttpGet("SavedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            var savedAddress = await _userManager.Users
            .Where(x => x.UserName == User.Identity!.Name)
            .Select(user => user.Address)
            .FirstOrDefaultAsync();
            if (savedAddress != null)
            {
                return Ok(savedAddress);
            }
            return BadRequest("No user address fund");
        }
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null!;
            }
            var basket = await _context.Baskets!
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(item => item.BuyerId == buyerId);
            return basket!;
        }
    }
}