using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace clases_proyecto
{
    public class Proyecto
    {
        public string Id { get; set; }
        public string Titulo { get; set; }
        public List<int> EquipoDeTrabajo { get; set; }
        public string Objetivos { get; set; }
        public List<string> Tareas { get; set; }


    }
}
