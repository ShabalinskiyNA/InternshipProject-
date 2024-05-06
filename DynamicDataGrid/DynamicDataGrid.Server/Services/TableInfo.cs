using DynamicDataGrid.Server.Data;
using DynamicDataGrid.Server.Interfaces;
using DynamicDataGrid.Server.Models.DBModels;

using Microsoft.EntityFrameworkCore.Metadata;
using Newtonsoft.Json;

namespace DynamicDataGrid.Server.Services
{
    public class TableInfo : ITableService
    {
        MyAppContext dbContext;
        public TableInfo(MyAppContext context) 
        {
            dbContext = context;
        }
        public IEnumerable<User> GetUsers()
        {
            return dbContext.Users;
        }


        public IEnumerable<Colum> GetTable(int id)
        {
            return dbContext.Colums.Where(q => q.TableId == id);
        }
        public void UpdateTable(IEnumerable<Colum> newTable)
        {
            foreach(var colum in newTable)
            {
                Colum chekedColum = dbContext.Colums.Where(col => col.Id == colum.Id).FirstOrDefault();
                if (chekedColum != null)
                {
                    chekedColum.ColumnData = colum.ColumnData;
                    dbContext.SaveChanges();
                }
                else
                {
                    colum.Id = 0;
                    dbContext.Colums.Add(colum);
                    dbContext.SaveChanges();
                }
            }
            
        }
        public void DeleteColum(int id)
        {
            Colum columToDelete = dbContext.Colums.Where(q => q.Id == id).FirstOrDefault();
            if (columToDelete != null)
            {
                dbContext.Colums.Remove(columToDelete);
                dbContext.SaveChanges();
            }
        }

    }
}
