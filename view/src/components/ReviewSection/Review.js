//import {FaTimes } from 'react-icons/fa'

const Review = ({review}) => {
  return (
    <div>
      <h2>
        {review.username}
      </h2>
      <p>Rating: {review.rating}</p>
      <p>{review.text}</p>
    </div>
  )
}

export default Review