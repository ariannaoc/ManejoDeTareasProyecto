using API;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly string jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "usuarios.json");

        // GetUsuarios
        [HttpGet]
        public ActionResult<IEnumerable<Usuarios>> Get()
        {
            try
            {
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    var usuarios = JsonConvert.DeserializeObject<List<Usuarios>>(json);
                    return Ok(usuarios);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        // FilterUsuarios 
        [HttpGet("filter")]
        public ActionResult<IEnumerable<Usuarios>> FilterByUsername(string username)
        {
            try
            {
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    var usuarios = JsonConvert.DeserializeObject<List<Usuarios>>(json);
                    var usuarioFiltrado = usuarios.Where(u => u.email.Equals(username, StringComparison.OrdinalIgnoreCase)).ToList();

                    if (usuarioFiltrado == null || usuarioFiltrado.Count == 0)
                    {
                        return NotFound($"El usuario '{username}' no ha sido encontrado.");
                    }

                    return Ok(usuarioFiltrado);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // PostUsuarios
        [HttpPost]
        public ActionResult AddUser([FromBody] Usuarios newUser)
        {
            try
            {
                List<Usuarios> usuarios;
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    usuarios = JsonConvert.DeserializeObject<List<Usuarios>>(json);
                }

                usuarios.Add(newUser);

                using (StreamWriter writer = new StreamWriter(jsonFilePath))
                {
                    string updatedJson = JsonConvert.SerializeObject(usuarios, Formatting.Indented);
                    writer.Write(updatedJson);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("edit")]
        public ActionResult UpdateUser(string userId, [FromBody] Usuarios updatedUser)
        {
            try
            {
                List<Usuarios> usuarios;
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    usuarios = JsonConvert.DeserializeObject<List<Usuarios>>(json);
                }

                var userIndex = usuarios.FindIndex(u => u._id == userId);
                if (userIndex == -1)
                {
                    return NotFound($"User with ID {userId} not found.");
                }

                usuarios[userIndex] = updatedUser;

                using (StreamWriter writer = new StreamWriter(jsonFilePath))
                {
                    string updatedJson = JsonConvert.SerializeObject(usuarios, Formatting.Indented);
                    writer.Write(updatedJson);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

}