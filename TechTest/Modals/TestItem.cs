using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechTest.Modals
{
    public class TestItem
    {
        public TestItem()
        {
            // NOP
        }

        public TestItem(int Id, string Num, string Input, int Time, string Status)
        {
            this.Id = Id;
            this.Num = Num;
            this.Input = Input;
            this.Time = Time;
            this.Status = Status;
        }

        public int Id { set; get; }

        public string Num { set; get; }

        public string Input { set; get; }

        public int Time { set; get; }

        public string Status { set; get; }

    }
}
