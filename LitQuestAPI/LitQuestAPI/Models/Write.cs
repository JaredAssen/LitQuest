using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Write
{
    public int Userid { get; set; }

    public string Isbn { get; set; } = null!;

    public int Reviewid { get; set; }

    public virtual Book IsbnNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
