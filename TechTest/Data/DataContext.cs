using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechTest.Modals;

namespace TechTest.Data
{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}

        public DbSet<TestItem> TestItems { get; set; }

        public DbSet<TestResult> TestResults { get; set; }

    }
}
