import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
//import Rating from "../ReviewSection/Rating";
import ReviewSection from '../ReviewSection/ReviewSection';
import Recommendations from '../Recommendations/Recommendations';
import { useLocation } from 'react-router-dom'

const URL = "https://openlibrary.org/works/";



const BookDetails = (props) => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const location = useLocation()
// console.log(location.state);
  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);

        if(data){
          const {description, title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            description: description ? description.value : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }

      
    }
    getBookDetails();
  }, [id]);

  if(loading) return <Loading />;

  const saveBook = () => {
    fetch('http://localhost:5034/api/BookList', {
        method: 'POST',
        body: JSON.stringify({
            userid: JSON.parse(localStorage.getItem("user")).userid,
            bookid: id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        mode:'cors',
    })
    .then((response) => {
        response.json();
    })
    .then((data) => {
      alert("Book saved");
    })
    .catch((err) => {
            console.log(err.message);
            alert("Error saving book");
    });
  }

  
  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src = {book?.cover_img} alt = "cover img" />
            <button className="save-book-button" onClick = {saveBook} >Save Book</button>
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
            
            <div>
              {console.log(location.state)}
              {/*<ReviewSection bookid={id} />*/}
              <ReviewSection />
              <Recommendations authors = {location.state}/>
            </div>
          </div>
        </div>


        


      </div>
    </section>
  )
}

export default BookDetails