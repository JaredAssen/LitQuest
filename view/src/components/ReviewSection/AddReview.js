import {useState} from 'react' 
//import { FaStar } from "react-icons/fa";
//import styled from 'styled-components';
import './AddReview.css';
import { useNavigate } from "react-router-dom";

const AddReview = ({onAdd}) => {
  const [username,setUsername]=useState('');
  const [rating, setRating] = useState(0);
  const [text,setText]=useState('');
  const udata = JSON.parse(localStorage.getItem("user"));
  const uid = udata.userid;
  //const n = 0;
  const navigate = useNavigate();
  const [replaceFlag, setReplaceFlag] = useState(0);
  const [existingReviewID, setExistingReviewID] = useState(0);
  const bookid = window.location.pathname.split('/').pop();

  //check if user already has a review
  fetch(`http://localhost:5034/api/Review?bookid=${bookid}`)
  .then(response => response.json())
  .then(data => {
    const userReview = data.find(review => review.userid === uid && review.bookid === bookid);
    if (userReview) {
      setReplaceFlag(1);
      setExistingReviewID(userReview.reviewid);
    }
  })
  .catch(error => {
    console.error('Error fetching reviews:', error);
    // Handle the error
  });

  const onSubmit=(e)=>{
    e.preventDefault()
    //onAdd({n,uid,text,rating,n})

    //if doesn't have review already
    if(replaceFlag===0){
      fetch('http://localhost:5034/api/Review', {
        method: 'POST',
        body: JSON.stringify({
            userid: uid,
            text: text,
            rating: rating,
            bookid: window.location.pathname.split('/').pop(),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        mode:'cors',
      })
      .then((response) => {
        response.json();
        if(response.status === 409) alert("Review Already Exists");
      })
      .catch((err) => {
        console.log(err.message);
      });
    }else{
      //else if user already has review
      fetch(`http://localhost:5034/api/Review/${existingReviewID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reviewid: existingReviewID,
          userid: uid,
          text: text,
          rating: rating,
          bookid: window.location.pathname.split('/').pop(),
        })
      })
      .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log('Review updated successfully:', data);
        alert('Review updated successfully')
      })
      .catch(error => {
        console.error('Error updating review:', error);
        // Handle the error
      });

    }
    

/*
    fetch('http://localhost:5034/api/Review', {
        method: 'POST',
        body: JSON.stringify({
            userid: uid,
            text: text,
            rating: rating,
            bookid: window.location.pathname.split('/').pop(),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        mode:'cors',
    })
    .then((response) => {
      response.json();
      if(response.status === 409) alert("Review Already Exists");
    })
    .catch((err) => {
          console.log(err.message);
    });
    //window.location.reload();
    //navigate("/book/"+window.location.pathname.split('/').pop());*/
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
              setUsername(udata.username);
              alert(`Are you sure you want to give ${rating} stars ?`);
            }
          }>Submit</button>
        </div>
    </form>
  )
}

export default AddReview