import React from 'react';
import Book from './Book';

function BookList() {
  const books = [
    { title: 'Book 1', image: 'book1.jpg' },  /*add and connect these to the website for bookname and photos*/ 
    { title: 'Book 2', image: 'book1.jpg' },
    { title: 'Book 3', image: 'book1.jpg' },
    { title: 'Book 4', image: 'book1.jpg' },
    { title: 'Book 5', image: 'book1.jpg' },
    { title: 'Book 6', image: 'book1.jpg' },
    { title: 'Book 7', image: 'book1.jpg' },
    { title: 'Book 8', image: 'book1.jpg' },
    { title: 'Book 9', image: 'book1.jpg' },
    { title: 'Book 10', image: 'book1.jpg' },
  ];

  return (
    <div className="container">
      {books.map((book, index) => (
        <Book key={index} title={book.title} image={book.image} />
      ))}
    </div>
  );
}

export default BookList;
