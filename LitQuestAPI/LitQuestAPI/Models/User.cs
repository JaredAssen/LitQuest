using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class User
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? About { get; set; } = null;

    public int Userid { get; set; }
    
    public virtual ICollection<Booklist> Booklists { get; } = new List<Booklist>();

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();
}
