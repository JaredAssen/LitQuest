import './UserReviews.css';
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import User from '../../models/User';
import { useGlobalContext } from '../../context';
import {useNavigate} from 'react-router-dom';
import Results from '../../components/Results/Results';
import coverImg from "../../images/cover_not_found.jpg";
import Book from "../Results/Book";
import BookList from '../BookList/BookList';
import { Link } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";

const UserReviews = () => {

    function getUserFromStorage() {
        var udata = localStorage.getItem("user");
        if ( udata == null ){
          return {userid: 0};
        }
        else {
          return JSON.parse(udata);
        }
      }
      var user = getUserFromStorage();

      function getRevBookInfoFromStorage() {
        var bdata = localStorage.getItem("revBookInfo");
        if ( bdata == null ){
          return null;
        }
        else {
          return JSON.parse(bdata);
        }
      }
    
    
      var revInfo = getRevBookInfoFromStorage();

    const [reviews, setReviews] = useState([]);
    const bookInfo = [];
    useEffect(() => {
        // fetch all the bookids in a users booklist
        fetch(`http://localhost:5034/api/Review/UserReviews/${user.userid}`, {mode:'cors'})
            .then((response) => response.json())
            .then((data) => {
            //console.log(data);
            setReviews(data);
            })
            .catch((err) => {
            console.log(err.message);
        });     

        
        }, []);



    const deleteReview = (index) => {
        fetch(`http://localhost:5034/api/Review/${JSON.parse(localStorage.getItem("user")).userid}/${reviews[index].bookid}`, {
        method: 'DELETE',
        })
        .then((response) => {
            alert("Review Deleted");

        });  
        window.location.reload(false);   
        window.location.reload(false);   
    }

   
  return (
    <div className="posts-container">
        {reviews.map((reviews, index) => {
            return (
                <div>
                <Link to = {
                    `/book/${reviews.bookid}`} state={"James Patterson"}>
                    <div className='book-item-info-item title fw-7 fs-18'>
                    <span>{reviews.bookid}</span>
                    </div>
                </Link>
                <p className="post-body">{reviews.text}</p>
                <button className="delete-post-button" onClick = {()=>deleteReview(index)} >Delete</button>
                </div>
            );
        })}
    </div>
  );
}

export default UserReviews;
