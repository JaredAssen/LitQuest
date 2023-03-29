import StarRating from './StarRating';
import Reviews from './Reviews'
import AddReview from './AddReview'
import Button from '../Button'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const ReviewSection=()=> {//passed book id into this function
  const [showAddReview,setShowAddReview]=useState(false);
  const [avgRating,setAvgRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [uname, setUname] = useState('');
  const navigate = useNavigate();
  const udata = JSON.parse(localStorage.getItem("user"));
  const bookid = window.location.pathname.split('/').pop();

 /* useEffect(() => {
    fetch(`http://localhost:5034/api/Review?bookid=${bookid}`)
      .then(response => response.json())
      .then(data => {
        Promise.all(
          data.map(review =>
            fetch(`http://localhost:5034/api/User?userid=${review.userid}`)
              .then(response => response.json())
              .then(user => ({ ...review, additionalData: { uname: user.username } }))
          )
        ).then(updatedReviews => setReviews(updatedReviews));
      })
      .catch(error => console.error(error));
  }, []);*/
  useEffect(() => {
    fetch(`http://localhost:5034/api/Review?bookid=${bookid}`)
      .then(response => response.json())
      .then(data => {
        /*const updatedReviews = data.map(review => {
          fetch(`http://localhost:5034/api/User?userid=${review.userid}`)
          .then(response => response.json())
          .then(data => {
            setUname(JSON.stringify(data).username);
          })
          .catch((err) => {
            console.log(err.message);
          });
          return {
            ...review,
            additionalData: {uname}
          }
        });*/
        //setReviews(data);
        const bookReviews = data.filter(review => review.bookid === bookid);
        setReviews(bookReviews);

        const totalRating = bookReviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = (totalRating / bookReviews.length).toFixed(2);
        setAvgRating(avgRating);


        
      })
      .catch(error => console.error(error));
    }, []);

  function getUsername (uid) {
    
    fetch(`http://localhost:5034/api/User?userid=${uid}`)
      .then(response => response.json())
      .then(data => {
        setUname(JSON.parse(JSON.stringify(data).username));
      })
     .catch((err) => {
        console.log(err.message);
     });
     return {uname}; 
  };
  
  /*const [reviews,setReviews] = useState([//example review data
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
  ])*/

  //add review
  const addReview = (review) => {
    //const id = Math.floor(Math.random()*10000)+1
    //const n = 0;
    const newReview = {...review};
    //const newReview = {reviewid,...bookid}
    setReviews([...reviews,newReview])
  }

  const onAdd = () => {
    if(udata){//if user is logged in, show add review form
      setShowAddReview(!showAddReview);
    }else{
      //if not logged in, redirect to login page
      navigate('/login');
    }
    
  };
/*
  const showReviews = () =>{
    fetch(`http://localhost:5034/api/Review?bookid=${bookid}`)
    .then(response => response.json())
    .then(data => {
      for (const i=Object.keys(data).length; i >= 0; i--) {
        let rdata = JSON.stringify(data[i]);
        fetch(`http://localhost:5034/api/User?userid=${rdata.userid}`)
        .then(response => response.json())
        .then(data => {
          <div>
            <h2>
              {data.username}
            </h2>
            <p>Rating: {rdata.rating}</p>
            <p>{rdata.text}</p>
          </div>
        })
      }
    
    })
    .catch(error => {
      console.error(error);
    });
  }*/

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
      
      
      <p className = 'beside'>Avg. Rating: {avgRating}
        <StarRating value={avgRating} />
      </p>
      

      {/*{reviews.length > 0 ? (
        <Reviews reviews = {reviews}/>
      ) : (
        'No Reviews To Show'
      )}*/}
      {/*<Reviews bookid={bookid}/>*/}
      {reviews.map(review => (
        
        <div key={review.reviewid}>
          
          {/*<h2>{getUsername(review.userid)}</h2>*/}
          {/*<h2>{review.username}</h2>*/}
          {/* <h2>{review.userid}</h2> */}
          {/* <h2>{bookid}</h2> */}
          {/* <h2>{review.bookid}</h2> */}
          
          
          <p className = 'beside'>Rating: 
            <StarRating value={review.rating} />
          </p>
          
          
          <p>{review.text}</p>
        </div>
      ))}
      
    </div>
  )
}



export default ReviewSection;