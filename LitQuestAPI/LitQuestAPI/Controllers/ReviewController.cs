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
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {

        private readonly LitquestContext _context;
        public ReviewController(LitquestContext context)
        {
            _context = context;
        }

        // GET: api/Review
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReview()
        {
            return await _context.Reviews.ToListAsync();

        }

        // GET api/Review/1234567890123
        [HttpGet("{Reviewid}")]
        public async Task<ActionResult<Review>> GetReview(string Reviewid)
        {
            var Review = await _context.Reviews.FindAsync(Reviewid);

            if (Review == null)
            {
                return NotFound();
            }

            return Review;
        }

        // POST api/Review
        [HttpPost]
        public async Task<ActionResult<Review>> PostMovie(Review Review)
        {
            _context.Reviews.Add(Review);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ReviewExists(Review.Reviewid))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetReview", new { id = Review.Reviewid }, Review);
        }
        // PUT api/Review/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/Review/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private bool ReviewExists(string id)
        {
            return _context.Review.Any(e => e.title == id);
        }
    }
}
