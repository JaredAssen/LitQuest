import React from 'react';
import './Book.css';

function Book(props) {
  return (
    <div className="book">
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <div className="rating">
        <span className="star" data-rating="1">&#9733;</span>
        <span className="star" data-rating="2">&#9733;</span>
        <span className="star" data-rating="3">&#9733;</span>
        <span className="star" data-rating="4">&#9733;</span>
        <span className="star" data-rating="5">&#9733;</span>
      </div>
      <textarea className="review" placeholder="Write a review"></textarea>
      <button className="submit">Submit</button>
    </div>
  );
}

export default Book;
