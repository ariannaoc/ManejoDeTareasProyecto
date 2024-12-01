using clases_proyecto;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TareasController : ControllerBase
    {
        private readonly string jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "tareas.json");

        //GET

        [HttpGet]
        public ActionResult<IEnumerable<Tarea>> GetTasks()
        {
            try
            {
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    Console.WriteLine($"Raw JSON: {json}");
                    var tasks = JsonConvert.DeserializeObject<List<Tarea>>(json);
                    return Ok(tasks);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // GET - Filter
        [HttpGet("filter")]
        public ActionResult<IEnumerable<Tarea>> FilterByIdTarea(string IdTarea)
        {
            try
            {
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    var tareas = JsonConvert.DeserializeObject<List<Tarea>>(json);
                    var tareaFiltrada = tareas.Where(t => t._id.Equals(IdTarea, StringComparison.OrdinalIgnoreCase)).ToList();

                    if (tareaFiltrada == null || tareaFiltrada.Count == 0)
                    {
                        return NotFound($"Tarea '{IdTarea}' no encontrado.");
                    }

                    return Ok(tareaFiltrada);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST
        [HttpPost]
        public ActionResult AddTarea([FromBody] Tarea newTarea)
        {
            try
            {
                List<Tarea> tareas;
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    tareas = JsonConvert.DeserializeObject<List<Tarea>>(json);
                }

                tareas.Add(newTarea);

                using (StreamWriter writer = new StreamWriter(jsonFilePath))
                {
                    string updatedJson = JsonConvert.SerializeObject(tareas, Formatting.Indented);
                    writer.Write(updatedJson);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT -- Editar
        [HttpPut("edit")]
        public ActionResult UpdateTarea(string IdTarea, [FromBody] Tarea updatedTarea)
        {
            try
            {
                List<Tarea> tareas;
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    tareas = JsonConvert.DeserializeObject<List<Tarea>>(json);
                }

                var tareaIndex = tareas.FindIndex(t => t._id == IdTarea);
                if (tareaIndex == -1)
                {
                    return NotFound($"Tarea {IdTarea} no encontrada.");
                }

                tareas[tareaIndex] = updatedTarea;

                using (StreamWriter writer = new StreamWriter(jsonFilePath))
                {
                    string updatedJson = JsonConvert.SerializeObject(tareas, Formatting.Indented);
                    writer.Write(updatedJson);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT -- EditarSubtask
        [HttpPut("editSubtask")]

        public IActionResult UpdateSubTasks(string id, [FromBody] List<SubTask> updatedSubTasks)
        {
            if (string.IsNullOrWhiteSpace(id) || updatedSubTasks == null)
            {
                return BadRequest("Falta el ID o las subtareas.");
            }

            // Leer el archivo JSON
            List<Tarea> tareas;
            using (StreamReader reader = new StreamReader(jsonFilePath))
            {
                string json = reader.ReadToEnd();
                tareas = JsonConvert.DeserializeObject<List<Tarea>>(json);
            }

            if (tareas == null)
            {
                return NotFound("No se encontraron tareas.");
            }

            var tarea = tareas.FirstOrDefault(t => t._id == id);
            if (tarea == null)
            {
                return NotFound("Tarea no encontrada.");
            }

            // Actualizar solo las subtareas
            //tarea.SubTasks = updatedSubTasks ?? tarea.SubTasks;
            tarea.SubTasks = updatedSubTasks;

            tarea.UpdatedAt = DateTime.Now;

            // Guardar los cambios 
            using (StreamWriter writer = new StreamWriter(jsonFilePath))
            {
                string updatedJson = JsonConvert.SerializeObject(tareas, Formatting.Indented);
                writer.Write(updatedJson);
            }

            return Ok(tarea);
        }



        //public IActionResult UpdateSubTasks(string id, [FromBody] List<SubTask> updatedSubTasks)
        //{
        //    // Leer el archivo JSON
        //    List<Tarea> tareas;
        //    using (StreamReader reader = new StreamReader(jsonFilePath))
        //    {
        //        string json = reader.ReadToEnd();
        //        tareas = JsonConvert.DeserializeObject<List<Tarea>>(json);
        //    }

        //    if (tareas == null)
        //    {
        //        return NotFound("No se encontraron tareas.");
        //    }

        //    var tarea = tareas.FirstOrDefault(t => t._id == id);
        //    if (tarea == null)
        //    {
        //        return NotFound("Tarea no encontrada.");
        //    }

        //    // Actualizar solo las subtareas
        //    if (updatedSubTasks != null)
        //    {
        //        tarea.SubTasks = updatedSubTasks;
        //    }

        //    tarea.UpdatedAt = DateTime.Now;

        //    // Guardar los cambios 
        //    using (StreamWriter writer = new StreamWriter(jsonFilePath))
        //    {
        //        string updatedJson = JsonConvert.SerializeObject(tareas, Formatting.Indented);
        //        writer.Write(updatedJson);
        //    }

        //    return Ok(tarea);
        //}

        // DELETE
        [HttpDelete("delete")]
        public ActionResult DeleteTarea(string IdTarea)
        {
            try
            {
                List<Tarea> tareas;
                using (StreamReader reader = new StreamReader(jsonFilePath))
                {
                    string json = reader.ReadToEnd();
                    tareas = JsonConvert.DeserializeObject<List<Tarea>>(json);
                }

                var tareaIndex = tareas.FindIndex(t => t._id == IdTarea);
                if (tareaIndex == -1)
                {
                    return NotFound($"Tarea {IdTarea} no encontrada.");
                }

                tareas.RemoveAt(tareaIndex);

                using (StreamWriter writer = new StreamWriter(jsonFilePath))
                {
                    string updatedJson = JsonConvert.SerializeObject(tareas, Formatting.Indented);
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