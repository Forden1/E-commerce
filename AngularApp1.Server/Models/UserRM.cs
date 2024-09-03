using AngularApp1.Server.Models;
namespace AngularApp1.Server.Models
{
    public class UserRM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public Boolean IsAdmin { get; set; }
    }
}