using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Recetas.Controllers
{
    public class IngredienteController : Controller
    {
        // GET: Ingredientes
        public ActionResult Index()
        {
            return PartialView();
        }
        public ActionResult Mantenimiento()
        {
            return PartialView();
        }

    }
}