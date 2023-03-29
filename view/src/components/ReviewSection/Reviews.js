import Review from './Review'
import { useState, useEffect } from 'react';

const Reviews = ({bookid}) => {
  const [reviews, setReviews] = useState([]);
  const [uname, setUname] = useState('');

  const getUsername = ({uid}) => {
    
    fetch(`http://localhost:5034/api/User?userid=${uid}`)
      .then(response => response.json())
      .then(data => {
        setUname(JSON.stringify(data).username);
      })
     .catch((err) => {
        console.log(err.message);
     });
     return {uname}; 
  };

  useEffect(() => {
    fetch(`http://localhost:5034/api/Review?bookid=${bookid}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {reviews.map(review => (
        
        <div key={review.reviewid}>
          
          {/*<h3>{getUsername({review.userid})}</h3>*/}
          <h2>{review.userid}</h2>
          <p>Rating: {review.rating}</p>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );

  /*return (
    
    <>
      {reviews.map((review)=>(
        <Review key={review.id} review={review}/>
      ))}
      
    </>
  )*/
/*
  return (
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
    })
  )*/
}

export default Reviews