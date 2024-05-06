namespace DynamicDataGrid.Server.Models.DBModels
{
    public class Table
    {
        public int Id { get; set; }
        public string TableName { get; set; }
        public string DBGroup { get; set; }
        public int UserId { get ; set; }

    }

    public class TableImage
    {
        public int TableId { get; set; }
        public int ColumnId { get; set; }
        public int ColumnPosition { get; set; }
    }
}
