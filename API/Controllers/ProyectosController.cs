using clases_proyecto;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectosController : ControllerBase
    {

        private readonly string jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "proyectos.json");

        // GET 
        [HttpGet]
        public ActionResult<IEnumerable<Proyecto>> Get()
        {
            try
            {
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    var proyectos = JsonConvert.DeserializeObject<List<Proyecto>>(json);
                    return Ok(proyectos);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        // GET -- filter 
        [HttpGet("filter")]
        public ActionResult<IEnumerable<Proyecto>> FilterByIdTarea(string Id)
        {
            try
            {
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    var proyectos = JsonConvert.DeserializeObject<List<Proyecto>>(json);
                    var proyectoFiltrado = proyectos.Where(p => p.Id.Equals(Id, StringComparison.OrdinalIgnoreCase)).ToList();

                    if (proyectoFiltrado == null || proyectoFiltrado.Count == 0)
                    {
                        return NotFound($"Proyecto '{Id}' no encontrado.");
                    }

                    return Ok(proyectoFiltrado);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST 
        [HttpPost]
        public ActionResult AddTarea([FromBody] Proyecto newProyecto)
        {
            try
            {
                List<Proyecto> proyectos;
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    proyectos = JsonConvert.DeserializeObject<List<Proyecto>>(json);
                }

                proyectos.Add(newProyecto);

                using (StreamWriter writer = new StreamWriter(jsonFilePath))
                {
                    string updatedJson = JsonConvert.SerializeObject(proyectos, Formatting.Indented);
                    writer.Write(updatedJson);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT 
        [HttpPut("edit")]
        public ActionResult UpdateProyecto(string Id, [FromBody] Proyecto updatedProyecto)
        {
            try
            {
                List<Proyecto> proyectos;
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    proyectos = JsonConvert.DeserializeObject<List<Proyecto>>(json);
                }

                var proyectoIndex = proyectos.FindIndex(p => p.Id == Id);
                if (proyectoIndex == -1)
                {
                    return NotFound($"Proyecto {Id} no encontrado.");
                }

                proyectos[proyectoIndex] = updatedProyecto;

                using (StreamWriter writer = new StreamWriter(jsonFilePath))
                {
                    string updatedJson = JsonConvert.SerializeObject(proyectos, Formatting.Indented);
                    writer.Write(updatedJson);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // DELETE
        [HttpDelete("delete")]
        public ActionResult DeleteProyecto(string Id)
        {
            try
            {
                List<Proyecto> proyectos;
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    proyectos = JsonConvert.DeserializeObject<List<Proyecto>>(json);
                }

                var proyectoIndex = proyectos.FindIndex(p => p.Id == Id);
                if (proyectoIndex == -1)
                {
                    return NotFound($"Tarea {Id} no encontrada.");
                }

                proyectos.RemoveAt(proyectoIndex);

                using (StreamWriter writer = new StreamWriter(jsonFilePath))
                {
                    string updatedJson = JsonConvert.SerializeObject(proyectos, Formatting.Indented);
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
