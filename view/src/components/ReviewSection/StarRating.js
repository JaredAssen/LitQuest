import React from "react";
import './StarRating.css';
const StarRating = ({ value }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < value) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star"></i>);
    }
  }
  return <div className = 'star-rating'>{stars}</div>;
};
export default StarRating;