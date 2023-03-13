using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Book
{
    public int Bookid { get; set; }

    public string Listname { get; set; } = null!;
}
