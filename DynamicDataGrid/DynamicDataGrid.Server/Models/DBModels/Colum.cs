using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace DynamicDataGrid.Server.Models.DBModels
{
    public class Colum
    {
        public int Id { get; set; }

        public int TableId { get; set; }
        public string Header { get; set; }
        public string Type { get; set; }
        public string Constrain { get; set; }
        
        public string ColumnData { get; set; }
    }
}
