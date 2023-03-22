import React from 'react';
import './Profile.css';
import Navbar from '../../components/Navbar/Navbar';

function Profile() {
  
  return (
    <div className="profile">
      <Navbar />
      <header>
        <h1>Username</h1>
        <p>Status: Readng</p>
      </header>
      <img src="data:image/jpeg;base64,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" alt="Profile" />
      <section className="bio">
        <h2>About Me</h2>
        <p>Hi, I am User and I love to read! I love sharing my thoughts and recommendations with others. When I'm not reading, I usually am hiking or at school.</p>
      </section>
      {/*<section className="reading">
        <h2>Currently Reading</h2>
        <div className="book">
          <img src="https://blog.placeit.net/wp-content/uploads/2017/12/book_icon-150x150.png" alt="Book cover" />
          <div className="book-details">
            <h3>A Book</h3>
            <p>by An Author</p>
            <p><strong>Progress:</strong> Chapter 7 of 32</p>
          </div>
        </div>
  </section>*/}
      <section className="reviewed-books">
        <h2>Reviewed Books</h2>
        <div className="review">
          <img src="https://blog.placeit.net/wp-content/uploads/2017/12/book_icon-150x150.png" alt="Book cover" />
          <div className="review-details">
            <h3>The Library Book</h3>
            <p>by Cool Author</p>
            <p><strong>Rating:</strong> 5 stars</p>
            <p><strong>Review:</strong> Absolutely amazing book. An author really knows how to write books.</p>
          </div>
        </div>
        <div className="review">
          <img src="https://blog.placeit.net/wp-content/uploads/2017/12/book_icon-150x150.png" alt="Book cover" />
          <div className="review-details">
            <h3>Another Book</h3>
            <p>by Some Author</p>
            <p><strong>Rating:</strong> 4 stars</p>
            <p><strong>Review:</strong> I really enjoyed this book! It was not as good as The Library Book though.</p>
          </div>
        </div>
      </section>
      
      <section className="saved-books">
        <h2>Saved Books</h2>
        
      </section>
      <section className="social">
        <h2>Connect With Me</h2>
        <ul>
          <li><a href="https://twitter.com">Twitter</a></li>
          <li><a href="https://www.instagram.com">Instagram</a></li>

        </ul>
      </section>
    </div>
  );
}

export default Profile;
