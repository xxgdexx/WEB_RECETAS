using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Recetas.Models;

namespace Web_Recetas.Controllers
{
    public class HomeController : Controller
    {
        UsuarioModel model = new UsuarioModel();
        public ActionResult Index()
        {
            if (Session["Usuario"] != null)
            {
                ViewData["Nombre"] = ((UsuarioModel)Session["Usuario"]).Nombres;

            }
            else
            {
                return Redirect(Url.Content("~/Home/Login"));
            }
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public JsonResult AuthenticarLogin(string correo, string clave)
        {
            UsuarioModel oResult = model.Login(correo, clave);
            Session["Usuario"] = oResult;
            return Json(oResult, JsonRequestBehavior.AllowGet);
            
        }

        public ActionResult Logout()
        {
            Session.Remove("Usuario");
            return Redirect(Url.Content("~/Home/Login"));

        }
    }
}