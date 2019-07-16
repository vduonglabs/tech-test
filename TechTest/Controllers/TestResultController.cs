using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TechTest.Data;
using TechTest.Modals;
using Microsoft.EntityFrameworkCore;

namespace TechTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestResultController : Controller
    {
        private readonly DataContext _context;

        public TestResultController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostTestResult(TestItem[] testItems)
        {
            TestResult result = new TestResult();
            result.Times = new List<KeyValuePair<int, int>>();

            var score = 0;
            var total = 0;
            var correct = 0;

            foreach (var item in testItems)
            {
                if (!item.Status.Equals("hidden"))
                {
                    total++;

                    if (item.Status.Equals("correct"))
                    {  
                        correct++;
                        score += 10;
                    }

                    result.Times.Add(new KeyValuePair<int, int>(total, item.Time));
                }
            }
           
            result.Total = total;
            result.Correct = correct;
            result.Score = score;

            _context.Add(result);
            await _context.SaveChangesAsync();

            return Ok(result);
        }
    }
}
