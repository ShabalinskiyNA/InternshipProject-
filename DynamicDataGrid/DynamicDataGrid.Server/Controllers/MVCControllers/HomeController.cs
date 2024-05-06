using Microsoft.AspNetCore.Mvc;

namespace DynamicDataGrid.Server.Controllers.MVCControllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View(".src/index.html");
        }
    }
}
