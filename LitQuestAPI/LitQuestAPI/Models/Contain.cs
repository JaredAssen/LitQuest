using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Contain
{
    public string ListName { get; set; } = null!;

    public string Isbn { get; set; } = null!;

    public virtual Book IsbnNavigation { get; set; } = null!;
}
