using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Booklist
{
    public string Bookid { get; set; } = null!;

    public int Userid { get; set; }

    public virtual User User { get; set; } = null!;
}
