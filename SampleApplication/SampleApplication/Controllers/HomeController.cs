using System.Web.Mvc;

namespace SampleApplication.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Frame()
        {
            return View();
        }
	}
}