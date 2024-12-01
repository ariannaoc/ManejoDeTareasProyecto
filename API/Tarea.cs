using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace clases_proyecto
{
    public class Tarea
    {
        public string _id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Priority { get; set; }
        public string Stage { get; set; }
        public List<string> Assets { get; set; }
        public List<TeamMember> Team { get; set; }
        public bool IsTrashed { get; set; }
        public List<string> Activities { get; set; }
        public List<SubTask> SubTasks { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int __v { get; set; }
    }

    public class TeamMember
    {
        public string _id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
    }

    public class SubTask
    {
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Tag { get; set; }
        public string _id { get; set; }
    }

}
