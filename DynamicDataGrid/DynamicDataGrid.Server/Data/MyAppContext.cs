using Microsoft.EntityFrameworkCore;
using DynamicDataGrid.Server.Models.DBModels;

namespace DynamicDataGrid.Server.Data
{
    public class MyAppContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Table> Tables { get; set; } = null!;
        public DbSet<Colum> Colums { get; set; } = null!;
        
        public MyAppContext(DbContextOptions<MyAppContext> options) : base(options) 
        {

            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                    new User { Id = 1, Email = "sf", Password = "fr", Role="admin", UName="1"},
                    new User { Id = 2, Email = "sdf", Password = "fdr", Role="admin", UName="2"},
                    new User { Id = 3, Email = "sff", Password = "ffr", Role="admin", UName="3"}
                    
            );
            

            modelBuilder.Entity<Colum>().HasData(
                    new Colum { Id = 1, TableId = 1, Constrain = "noConstr", Header = "first", Type = "string", ColumnData = "[\"Pasha\", \"Misha\", \"Sasha\"]" },
                    new Colum { Id = 2, TableId = 1, Constrain = "noConstr", Header = "second", Type = "string", ColumnData = "[\"mooo\", \"\", \"mew\", \"hry\"]" }
            );
            modelBuilder.Entity<Colum>().Property(q => q.Id).UseIdentityColumn();
        }

    }


}
