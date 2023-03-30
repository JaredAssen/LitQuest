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

        // GET api/Review/BookReviews/AB1237890123
        [HttpGet("BookReviews/{bookid}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetBookReviews(string bookid)
        {
            var Review = await _context.Reviews.Where(s => s.Bookid == bookid).ToListAsync();

            if (Review == null)
            {
                return NotFound();
            }

            return Review;
        }

        // GET api/Review/UserReviews/1
        [HttpGet("UserReviews/{userid}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetUserReviews(int userid)
        {
            var Review = await _context.Reviews.Where(u => u.Userid == userid).ToListAsync();

            if (Review == null)
            {
                return NotFound();
            }

            return Review;
        }


        // POST api/Review
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review Review)
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

        // Updates review with id = reviewid
        [HttpPut("{reviewid}")]
        public async Task<IActionResult> PutReview(int reviewid, Review review)
        {
            if (reviewid != review.Reviewid)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(reviewid))
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

        // DELETE api/Review/1/OB777FV
        [HttpDelete("{userid}/{bookid}")]
        public async Task<IActionResult> DeleteReview(int userid, string bookid)
        {
            var Review = await _context.Reviews.Where(s => s.Userid == userid && s.Bookid == bookid).ToListAsync();
            if (Review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(Review[0]);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.Reviewid == id);
        }
    }
}


//#nullable disable
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using LitQuestAPI.Models;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace LitQuestAPI.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class ReviewController : ControllerBase
//    {

//        private readonly LitquestContext _context;
//        public ReviewController(LitquestContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Review
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Review>>> GetReview()
//        {
//            return await _context.Reviews.ToListAsync();

//        }

//        // GET api/Review/1234567890123
//        [HttpGet("{bookid}")]
//        public async Task<ActionResult<IEnumerable<Review>>> GetReview(string bookid)
//        {
//            var Review = await _context.Reviews.Where(s => s.Bookid == bookid).ToListAsync();

//            if (Review == null)
//            {
//                return NotFound();
//            }

//            return Review;
//        }

//        // GET api/Review/1
//        [HttpGet("{userid}")]
//        public async Task<ActionResult<IEnumerable<Review>>> GetReview(int userid)
//        {
//            var Review = await _context.Reviews.Where(s => s.Userid == userid).ToListAsync();

//            if (Review == null)
//            {
//                return NotFound();
//            }

//            return Review;
//        }

//        // POST api/Review
//        [HttpPost]
//        public async Task<ActionResult<Review>> PostReview(Review Review)
//        {
//            _context.Reviews.Add(Review);
//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateException)
//            {
//                if (ReviewExists(Review.Reviewid))
//                {
//                    return Conflict();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return CreatedAtAction("GetReview", new { id = Review.Reviewid }, Review);
//        }

//        // Updates review with id = reviewid
//        [HttpPut("{reviewid}")]
//        public async Task<IActionResult> PutReview(int reviewid, Review review)
//        {
//            if (reviewid != review.Reviewid)
//            {
//                return BadRequest();
//            }

//            _context.Entry(review).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!ReviewExists(reviewid))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // DELETE api/Review/5
//        [HttpDelete("{revid}/{userid}")]
//        public async Task<IActionResult> DeleteReview(int revid, int userid)
//        {
//            var review = await _context.Reviews.FindAsync(revid,userid);
//            if (review == null)
//            {
//                return NotFound();
//            }

//            _context.Reviews.Remove(review);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool ReviewExists(int id)
//        {
//            return _context.Reviews.Any(e => e.Reviewid == id);
//        }
//    }
//}
