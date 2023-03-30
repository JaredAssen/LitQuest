import './BookList.css';
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import User from '../../models/User';
import { useGlobalContext } from '../../context';
import {useNavigate} from 'react-router-dom';
import Results from '../../components/Results/Results';
import coverImg from "../../images/cover_not_found.jpg";
import Book from "../Results/Book";
import { Link } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";

const BookList = () => {

    // const {books} = useGlobalContext();
    // const booksWithCovers = books.map((bInfo) => {
    //     return {
    //       ...bInfo,
    //       // removing /works/ to get only id
    //       id: (bInfo.id).replace("/works/", ""),
    //       cover_img: bInfo.cover_id ? `https://covers.openlibrary.org/b/id/${bInfo.cover_id}-L.jpg` : coverImg
    //     }
    //   });

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


   var revbInfo = getRevBookInfoFromStorage();

const [book, setBook] = useState([]);
const bookInfo = [];
    // const displayBookList = () =>  {
    //   // fetch all the bookids in a users booklist
    //   const bookids = [];
    //   fetch('http://localhost:5034/api/BookList/' + user.userid, {mode:'cors'})
    //     .then((response) => response.json())
    //     .then((data) => {
    //       //console.log(data);
    //       for (let i = 0; i < Object.keys(data).length; i++) {
    //         bookids.push(data[i].bookid);
    //       }
    //       localStorage.setItem("bookids",JSON.stringify(bookids)); 
    //     })
    //     .catch((err) => {
    //        console.log(err.message);
    //     }); 

 
    // }
    //var user = localStorage.getItem("user");;//= getUserFromStorage();
    //var bInfo = localStorage.getItem("bookInfo");;//= getBookInfoFromStorage();
    useEffect(() => {
        revbInfo = getRevBookInfoFromStorage();
        user = getUserFromStorage();
        const displayBookList = () =>  {
            //console.log("in displayBooklist");
            // fetch all the bookids in a users booklist
            if(user.userid === 0 ) return;
            const bookids = [];
            fetch('http://localhost:5034/api/BookList/' + user.userid, {mode:'cors'})
              .then((response) => response.json())
              .then((data) => {
                //console.log(data);
                for (let i = 0; i < Object.keys(data).length; i++) {
                  bookids.push(data[i].bookid);
                }
                    localStorage.setItem("bookids",JSON.stringify(bookids)); 
                //console.log(JSON.parse(localStorage.getItem("bookids")));
              })
              .catch((err) => {
                 console.log(err.message);
              }); 
      
       
          }
          displayBookList();
    
      async function getBookDetails(){
        //console.log("in getBookDetails");
        //console.log("bids: "+JSON.stringify(JSON.parse(localStorage.getItem("bookids"))));
        if(user.userid === 0 ) return;
        try{
          for (let i = 0; i < Object.keys(JSON.parse(localStorage.getItem("bookids"))).length; i++) {
            const response = await fetch(`${URL}${JSON.parse(localStorage.getItem("bookids"))[i]}.json`);
            const data = await response.json();
            const {docs} = data;
            //console.log(data);

            if(data){
              const {description, title, covers, subject_places, subject_times, subjects} = data;
              const newBook = {
                description: description ? description.value : "No description found",
                title: title,
                cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
                subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
                subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
                subjects: subjects ? subjects.join(", ") : "No subjects found"
              };
              setBook(newBook);
              bookInfo.push(newBook);
            } else {
              setBook(null);
            }

          }
          localStorage.setItem("revBookInfo",JSON.stringify(bookInfo));

        } catch(error){
          console.log(error);
        }
        
        
      }
      getBookDetails();
    
    }, [localStorage.getItem("user")]);


   

    const removeBook = (index) => {
        //console.log("index: "+index);
        fetch(`http://localhost:5034/api/Booklist/${JSON.parse(localStorage.getItem("bookids"))[index]}/${JSON.parse(localStorage.getItem("user")).userid}`, {
        method: 'DELETE',
        })
        .then((response) => {
          // Delete from local cache
          //localStorage.setItem('bookids', localStorage.getItem('bookids').slice(index,1));
          // localStorage.removeItem("bookids");
          // localStorage.removeItem("revBookInfo");
        }); 
        setTimeout(() => {
          localStorage.removeItem("bookids");
          localStorage.removeItem("revBookInfo");
        }, 1)
        refresh(); 
    }

    const refresh=()=>{
      window.location.reload(false);
    }


    function checkInfo(){
        console.log(user.userid);
        if(user.userid === 0 ) return <div> Login to view your book list</div>
        if(!revbInfo || !localStorage.getItem("bookids")){
        }
        else{
            return <ol>
            {revbInfo.slice(0,30).map((revbInfo,index) => (
            // <li key={index}>{bInfo.cover_img}</li>
            <div>
                {/* <li key={index}>{bInfo.title}</li> */}
                <Link to = {`/book/${JSON.parse(localStorage.getItem("bookids"))[index]}`} {...revbInfo}  state={"James Patterson"}>
                    <div className='book-item-info-item title fw-7 fs-18'>
                    <span>{revbInfo.title}</span>
                    </div>
                </Link>
                <img src = {revbInfo.cover_img} alt = "cover img" />
                <button className="remove-book-button" onClick = {()=>removeBook(index)} >Remove Book</button>
                {/* <div className='book-details-img'>
                    <img src = {bInfo.cover_img} alt = "cover img" />
                    <button className="save-book-button" onClick = {removeBook} >Remove Book</button>
                </div> */}
            </div>

            // <Link to = {`/book/${bInfo.id}`} {...bInfo}>
            // <div className='book-item-info-item title fw-7 fs-18'>
            //   <span>{bInfo.title}</span>
            // </div>
            // </Link>

            ))}
          </ol>
        }
    }


  return (
    <div>
      <div className="booklist"> 

        <section className="saved-books">
        <button className="view-btn" onClick = {()=>refresh()} >View BookList</button>
          <h2>Saved Books</h2>
          {/* <h2>{ displayBookList() }</h2> */}
           <h2>{checkInfo()}</h2> 
         
        </section>

      </div>
    </div>
  );
}

export default BookList;
