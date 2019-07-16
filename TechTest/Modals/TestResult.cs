using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TechTest.Modals
{
    public class TestResult
    {
        public int Id { get; set; }

        public int Score { get; set; }

        public int Correct { get; set; }

        public int Total { get; set; }

        [NotMapped]
        public List<KeyValuePair<int, int>> Times { get; set; }

    }
}
