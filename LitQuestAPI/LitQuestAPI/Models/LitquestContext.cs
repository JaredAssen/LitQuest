using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LitQuestAPI.Models;

public partial class LitquestContext : DbContext
{
    public LitquestContext()
    {
    }

    public LitquestContext(DbContextOptions<LitquestContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Booklist> Booklists { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseMySQL("DevConnection");
        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Email).HasName("PRIMARY");

            entity.ToTable("admin");

            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .HasColumnName("password");
        });

        //modelBuilder.Entity<Book>(entity =>
        //{
        //    entity.HasKey(e => new { e.Bookid, e.Listname }).HasName("PRIMARY");

        //    entity.ToTable("books");

        //    entity.HasIndex(e => e.Listname, "fk_books_booklist_idx");

        //    entity.Property(e => e.Bookid).HasColumnName("bookid");
        //    entity.Property(e => e.Listname)
        //        .HasMaxLength(45)
        //        .HasColumnName("listname");
        //});

        modelBuilder.Entity<Booklist>(entity =>
        {
            //entity.HasKey(e => new { e.Listname, e.Userid }).HasName("PRIMARY");
            entity.HasKey(e => new { e.Bookid, e.Userid }).HasName("PRIMARY");

            entity.ToTable("booklist");

            entity.HasIndex(e => e.Userid, "fk_user_idx");

            //entity.Property(e => e.Listname)
            entity.Property(e => e.Bookid)
                .HasMaxLength(45)
                //.HasColumnName("listname");
                .HasColumnName("bookid");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.User).WithMany(p => p.Booklists)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("fk_booklist_user");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => new { e.Reviewid, e.Userid }).HasName("PRIMARY");

            entity.ToTable("review");

            entity.HasIndex(e => e.Userid, "fk_user_idx");

            entity.Property(e => e.Reviewid).HasColumnName("reviewid");
            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Bookid)
                .HasMaxLength(45)
                .HasColumnName("bookid");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.Text)
                .HasMaxLength(1000)
                .HasColumnName("text");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("fk_review_user");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("PRIMARY");

            entity.ToTable("user");

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(45)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .HasColumnName("username");
            entity.Property(e => e.About)
                .HasMaxLength(50)
                .HasColumnName("about");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
