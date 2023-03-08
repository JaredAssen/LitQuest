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

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Booklist> Booklists { get; set; }

    public virtual DbSet<Contain> Contains { get; set; }

    public virtual DbSet<Genre> Genres { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Write> Writes { get; set; }

    // Set your password for the database beside pwd!!!!!!!!!!!
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        if (!optionsBuilder.IsConfigured)
            optionsBuilder.UseMySQL("server=127.0.0.1;uid=root;pwd=____;database=litquest");
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

        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(e => new { e.Author1, e.Isbn }).HasName("PRIMARY");

            entity.ToTable("author");

            entity.HasIndex(e => e.Isbn, "fk_isbnBook_idx");

            entity.Property(e => e.Author1)
                .HasMaxLength(45)
                .HasColumnName("author");
            entity.Property(e => e.Isbn)
                .HasMaxLength(13)
                .HasColumnName("ISBN");

            entity.HasOne(d => d.IsbnNavigation).WithMany(p => p.Authors)
                .HasForeignKey(d => d.Isbn)
                .HasConstraintName("fk_author_book");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Isbn).HasName("PRIMARY");

            entity.ToTable("book");

            entity.Property(e => e.Isbn)
                .HasMaxLength(13)
                .HasColumnName("ISBN");
            entity.Property(e => e.BookCover).HasColumnType("blob");
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.PublicationDate).HasColumnType("date");
            entity.Property(e => e.Title).HasMaxLength(45);
        });

        modelBuilder.Entity<Booklist>(entity =>
        {
            entity.HasKey(e => new { e.ListName, e.UserId }).HasName("PRIMARY");

            entity.ToTable("booklist");

            entity.HasIndex(e => e.UserId, "fk_user_idx");

            entity.Property(e => e.ListName).HasMaxLength(45);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Booklists)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("fk_booklist_user");
        });

        modelBuilder.Entity<Contain>(entity =>
        {
            entity.HasKey(e => new { e.ListName, e.Isbn }).HasName("PRIMARY");

            entity.ToTable("contains");

            entity.HasIndex(e => e.Isbn, "fk_Book_idx");

            entity.Property(e => e.ListName).HasMaxLength(45);
            entity.Property(e => e.Isbn)
                .HasMaxLength(13)
                .HasColumnName("ISBN");

            entity.HasOne(d => d.IsbnNavigation).WithMany(p => p.Contains)
                .HasForeignKey(d => d.Isbn)
                .HasConstraintName("fk_contains_book");
        });

        modelBuilder.Entity<Genre>(entity =>
        {
            entity.HasKey(e => new { e.Genre1, e.Isbn }).HasName("PRIMARY");

            entity.ToTable("genre");

            entity.HasIndex(e => e.Isbn, "fk_genre_book");

            entity.Property(e => e.Genre1)
                .HasMaxLength(45)
                .HasColumnName("Genre");
            entity.Property(e => e.Isbn)
                .HasMaxLength(13)
                .HasColumnName("ISBN");

            entity.HasOne(d => d.IsbnNavigation).WithMany(p => p.Genres)
                .HasForeignKey(d => d.Isbn)
                .HasConstraintName("fk_genre_book");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => new { e.ReviewId, e.UserId }).HasName("PRIMARY");

            entity.ToTable("review");

            entity.HasIndex(e => e.UserId, "fk_user_idx");

            entity.Property(e => e.ReviewId).HasColumnName("ReviewID");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Text).HasMaxLength(1000);

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
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
        });

        modelBuilder.Entity<Write>(entity =>
        {
            entity.HasKey(e => new { e.Userid, e.Isbn, e.Reviewid }).HasName("PRIMARY");

            entity.ToTable("writes");

            entity.HasIndex(e => e.Isbn, "fk_bookISBN_idx");

            entity.HasIndex(e => e.Reviewid, "fk_review_idx");

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Isbn)
                .HasMaxLength(13)
                .HasColumnName("isbn");
            entity.Property(e => e.Reviewid).HasColumnName("reviewid");

            entity.HasOne(d => d.IsbnNavigation).WithMany(p => p.Writes)
                .HasForeignKey(d => d.Isbn)
                .HasConstraintName("fk_writes_book");

            entity.HasOne(d => d.User).WithMany(p => p.Writes)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("fk_writes_user");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
