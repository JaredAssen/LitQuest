import {useState} from 'react' 
//import { FaStar } from "react-icons/fa";
//import styled from 'styled-components';
import './AddReview.css';

const AddReview = ({onAdd}) => {
  const [username,setUsername]=useState('');
  const [rating, setRating] = useState(0);
  
  const [text,setText]=useState('');

  const onSubmit=(e)=>{
    e.preventDefault()
    onAdd({username,rating,text})
  }

  return (
    <form className = 'add-form' onSubmit={onSubmit} >
        <div className="booklist-book">
          <div className="booklist-rating">
            <span className="booklist-star" data-rating="1" onClick={() => setRating(1)}>&#9733;</span>
            <span className="booklist-star" data-rating="2" onClick={() => setRating(2)}>&#9733;</span>
            <span className="booklist-star" data-rating="3" onClick={() => setRating(3)}>&#9733;</span>
            <span className="booklist-star" data-rating="4" onClick={() => setRating(4)}>&#9733;</span>
            <span className="booklist-star" data-rating="5" onClick={() => setRating(5)}>&#9733;</span>
          </div>
          <textarea className="booklist-review" placeholder="Write a review" onChange={e => setText(e.target.value)}></textarea>
          <button className="booklist-submit" onClick = {() => {
              setUsername('This User');
              alert(`Are you sure you want to give ${rating} stars ?`);
            }
          }>Submit</button>
        </div>
    </form>
  )
}

export default AddReview