using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Review
{
    public int ReviewId { get; set; }

    public int UserId { get; set; }

    public string? Text { get; set; }

    public float Rating { get; set; }

    public virtual User User { get; set; } = null!;
}
