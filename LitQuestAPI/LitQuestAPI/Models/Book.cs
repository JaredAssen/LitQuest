using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Book
{
    public string Isbn { get; set; } = null!;

    public int? PageNumber { get; set; }

    public string? Description { get; set; }

    public DateTime? PublicationDate { get; set; }

    public string? Title { get; set; }

    public byte[]? BookCover { get; set; }

    public virtual ICollection<Author> Authors { get; } = new List<Author>();

    public virtual ICollection<Contain> Contains { get; } = new List<Contain>();

    public virtual ICollection<Genre> Genres { get; } = new List<Genre>();

    public virtual ICollection<Write> Writes { get; } = new List<Write>();
}
