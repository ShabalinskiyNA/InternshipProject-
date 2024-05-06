using DynamicDataGrid.Server.Data;
using DynamicDataGrid.Server.Interfaces;
using DynamicDataGrid.Server.Models.DBModels;
using DynamicDataGrid.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DynamicDataGrid.Server.Controllers.APIsControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        ITableService table;
        public TableController(ITableService tableService)
        {
            table = tableService;
        }
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return table.GetUsers();


        }
        [HttpGet("Colums/{tableId}")]
        public IEnumerable<Colum> GetColums(int tableId)
        {
            return table.GetTable(tableId);
        }

        [HttpPatch("Colums/upd")]
        public void UpdateColums(IEnumerable<Colum> changedTable)
        {
            table.UpdateTable(changedTable);
        }

        [HttpDelete("Colums/del/{id}")]
        public void DeleteColum(int id)
        {
            table.DeleteColum(id);
        }
    }
}
