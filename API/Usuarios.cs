namespace API
{
    public class Usuarios
    {
        public string _id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public bool isActive { get; set; }
        public List<string> tareas { get; set; }

    }
}


