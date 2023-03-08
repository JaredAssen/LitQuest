using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Author
{
    public string Author1 { get; set; } = null!;

    public string Isbn { get; set; } = null!;

    public virtual Book IsbnNavigation { get; set; } = null!;
}
