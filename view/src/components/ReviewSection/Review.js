//import {FaTimes } from 'react-icons/fa'
import StarRating from "./StarRating"
const Review = ({review}) => {
  return (
    <div>
      <h2>
        {review.username}
      </h2>
      <div className = 'beside'>
        <p>Rating: </p>
        <StarRating value={review.rating} />
      </div>
      
      <p>{review.text}</p>
    </div>
  )
}

export default Review