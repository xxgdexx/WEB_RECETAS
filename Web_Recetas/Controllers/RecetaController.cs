using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_Recetas.Controllers
{
    public class RecetaController : Controller
    {
        // GET: Receta
        public ActionResult Index()
        {

            return PartialView();
        }


        public ActionResult Mantenimiento()
        {
            return PartialView();
        }

        public ActionResult Entrantes()
        {
            return PartialView();
        }
    }
}