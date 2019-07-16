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
    public class TestDataController : Controller {

        private readonly DataContext _context;

        public TestDataController(DataContext context)
        {
            _context = context;
        }
    
        [HttpGet]
        public async Task<IActionResult> GetTests()
        {
            var items = await _context.TestItems.ToListAsync();

            if (items == null || items.Count < 20)
            {
                items = new List<TestItem>();

                items.Add(new TestItem(1, "6", "", 0, "hidden"));
                items.Add(new TestItem(2, "66", "", 0, "hidden"));
                items.Add(new TestItem(3, "99", "", 0, "hidden"));
                items.Add(new TestItem(4, "114", "", 0, "hidden"));
                items.Add(new TestItem(5, "987", "", 0, "hidden"));
                items.Add(new TestItem(6, "3387", "", 0, "hidden"));
                items.Add(new TestItem(7, "8765", "", 0, "hidden"));
                items.Add(new TestItem(8, "345876", "", 0, "hidden"));
                items.Add(new TestItem(9, "265987", "", 0, "hidden"));
                items.Add(new TestItem(10, "876565", "", 0, "hidden"));
                items.Add(new TestItem(11, "8976572", "", 0, "hidden"));
                items.Add(new TestItem(12, "54368621", "", 0, "hidden"));
                items.Add(new TestItem(13, "98764121", "", 0, "hidden"));
                items.Add(new TestItem(14, "42351456", "", 0, "hidden"));
                items.Add(new TestItem(15, "223879823", "", 0, "hidden"));
                items.Add(new TestItem(16, "987676874", "", 0, "hidden"));
                items.Add(new TestItem(17, "887532265", "", 0, "hidden"));
                items.Add(new TestItem(18, "7663785433", "", 0, "hidden"));
                items.Add(new TestItem(19, "6723663852", "", 0, "hidden"));
                items.Add(new TestItem(20, "2874638927", "", 0, "hidden"));
            }

            return Ok(items);
        }

    }
}
