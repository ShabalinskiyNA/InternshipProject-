using DynamicDataGrid.Server.Models.DBModels;

namespace DynamicDataGrid.Server.Interfaces
{
    public interface ITableService
    {
        public IEnumerable<User> GetUsers();
        public IEnumerable<Colum> GetTable(int tableId);
        public void UpdateTable(IEnumerable<Colum> newTable);
        public void DeleteColum(int Id);
    }
}
