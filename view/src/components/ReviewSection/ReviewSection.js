
import Reviews from './Reviews'
import AddReview from './AddReview'
import Button from '../Button'
import {useState} from 'react'
import StarRating from './StarRating'

const ReviewSection=({bookid})=> {//passed book id into this function
  const [showAddReview,setShowAddReview]=useState(false)
  const [avgRating] = useState(4.3)//sample average rating
  const [reviews,setReviews] = useState([//example review data
    {    
        id: 1,
        username: 'Anna',
        rating: 5,
        text: 'I like this book',
        day: 'Feb 5th at 2:30pm'
    },
    {    
        id: 2,
        username: 'Bob',
        rating: 3,
        text: 'This book was okay',
        day: 'Feb 6th at 1:30pm'
    },
    {    
        id: 3,
        username: 'Carl',
        rating: 1,
        text: "I don't like this book",
        day: 'Feb 5th at 2:30pm'
    }
  ])

  //add review
  const addReview = (review) => {
    const id = Math.floor(Math.random()*10000)+1
    const newReview = {id,...review}
    setReviews([...reviews,newReview])
  }

  const onAdd = () => setShowAddReview(!showAddReview);

  return (
    <div>
      <Button 
        color = {'grey'} 
        text={showAddReview ?'Close':'Add A Review'} 
        onClick = {onAdd}
      />
      {showAddReview && <AddReview onAdd = {addReview}/>}
      {/*display reviews unless there are no reviews*/}
      <h3>User Reviews</h3>
      <div className = 'beside'>
        <p>Avg. Rating: </p>
        <StarRating value={3} />
      </div>
      
      

      {reviews.length > 0 ? (
        <Reviews reviews = {reviews}/>
      ) : (
        'No Reviews To Show'
      )}
      
    </div>
  )
}



export default ReviewSection;