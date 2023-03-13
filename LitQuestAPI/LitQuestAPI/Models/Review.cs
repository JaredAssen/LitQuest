using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Review
{
    public int Reviewid { get; set; }

    public int Userid { get; set; }

    public string Text { get; set; }

    public float Rating { get; set; }

    public string Bookid { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
