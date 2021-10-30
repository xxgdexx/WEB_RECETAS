using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace Web_Recetas.Models
{
    public class UsuarioModel
    {
        public int ID_Usuario { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public int ID_Estado { get; set; }



        public UsuarioModel Login(string correo,string clave)
        {
            UsuarioModel Usuario = new UsuarioModel();
            using (SqlConnection cn = DataAccess.Conectar())
            {
                cn.Open();
                try
                {
                    SqlCommand cmd = new SqlCommand("sp_login", cn);

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Correo", correo);
                    cmd.Parameters.AddWithValue("@Clave", clave);
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {

                        Usuario.ID_Usuario = dr["ID_Usuario"].ToInt();
                        Usuario.Nombres = dr["Nombres"].ToString();
                        Usuario.Apellidos = dr["Apellidos"].ToString();
                        Usuario.Correo = dr["Correo"].ToString();

                    }
                    cn.Close();
                }catch(Exception ex)
                {
                    cn.Close();
                    cn.Dispose();
                    throw;
                }
            }
            return Usuario;
        }

    }
}