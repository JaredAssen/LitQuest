using System;
using System.Collections.Generic;

namespace LitQuestAPI.Models;

public partial class Admin
{
    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}
