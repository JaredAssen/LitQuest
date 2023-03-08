using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Booklist
{
    public string ListName { get; set; } = null!;

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}
