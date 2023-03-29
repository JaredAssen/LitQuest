#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LitQuestAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LitQuestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly LitquestContext _context;
        private readonly ILogger _logger;

        public UserController(LitquestContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }


        // GET api/User/Username/Password
        [HttpGet("{username}/{password}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUser(string username, string password)
        {
            var user = await _context.Users.Where(s => s.Username == username && s.Password == password).ToListAsync();
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("{userid}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserWithid(int userid)
        {
            var user = await _context.Users.Where(s => s.Userid == userid).ToListAsync();
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User User)
        {
            _context.Users.Add(User);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(User.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { userid = User.Userid }, User);
        }



        // PUT api/<ValuesController>/5
        [HttpPut("{userid:int}")]
        public async Task<IActionResult> PutUser(int userid, [FromBody]User user)
        {
            _logger.LogInformation($"received PUT for userid: {userid}");
            if (userid != user.Userid)
            {
                _logger.LogInformation($"userid is invalid userid!=user.Userid: {userid}!={user.Userid}");
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(userid))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // DELETE api/User/5
        [HttpDelete("{userid}")]
        public async Task<IActionResult> DeleteUser(int userid)
        {
            var user = await _context.Users.FindAsync(userid);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool UserExists(string username)
        {
            var user = _context.Users.Where(s => s.Username == username).ToListAsync();
            return !(user == null);
        }

        private bool UserExists(int userid)
        {
            var user = _context.Users.Where(s => s.Userid == userid).ToListAsync();
            return !(user == null);
        }
    }
}
