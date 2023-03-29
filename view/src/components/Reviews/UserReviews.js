import './UserReviews.css';
import React, { Component, useState, useEffect } from 'react';
import { json } from 'react-router-dom';

export default class UserReviewTable extends Component {
  static displayName = UserReviewTable.name;

  constructor(props) {
    super(props);
    this.state = { user_reviews: [], loading: true };
    this.getUserFromStorage();
  }

  getUserFromStorage() {
    var udata = localStorage.getItem("user");
    if ( udata == null ){
      this.user = {userid: 0};
    }
    else {
      this.user = JSON.parse(udata);
    }
  }

  componentDidMount() {
    this.populateReviews();
  }

  static renderReviewsTable(user_reviews) {

    const showBook = (review) => {
      return (
        <div>
          <div className='book-item-img'>
            <img src={review.cover_img} alt="cover" />
          </div>        
          <div className='book-item flex flex-column flex-sb'>
            <div className='book-item-info text-center'>
              <div className='book-item-info-item publish-year fs-15'>
                <span className='text-capitalize fw-7'>Title: </span>
                <span>{review.title}</span>
              </div>
              <div className='book-item-info-item author fs-15'>
                <span className='text-capitalize fw-7'>Author: </span>
                <span>{review.author}</span>
              </div>
              <div className='book-item-info-item edition-count fs-15'>
                <span className='text-capitalize fw-7'>Rating: </span>
                <span>{review.rating}</span>
              </div>
      
              <div className='book-item-info-item publish-year fs-15'>
                <span className='text-capitalize fw-7'>Comment: </span>
                <span>{review.text}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return (user_reviews.map(review => showBook(review)));
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : UserReviewTable.renderReviewsTable(this.state.user_reviews);

    return (
      <div>
        <h1 id="tableLabel">My Reviews</h1>
        {contents}
      </div>
    );
  }
  // "https://openlibrary.org/books/"
  // FOr some reason, this is not getting executed properly?? Returns nothing
  async getBookInfo(bid) {
    let uri = 'http://openlibrary.org/works/' + bid + ".json";
    const bookinfo =  await fetch(uri, {Origin: "http://localho.st:3000"});
    if ( bookinfo.ok )
    {
      let result = await bookinfo.json();
      alert("successfully got info for " + bid + ": " + JSON.stringify(result));
      return result;
    }
    alert('fetch ' + uri + ' failed: ' + bookinfo.status);
    return null;
  }

  bookInfo = bid => {
    fetch('http://openlibrary.org/works/' + bid + ".json", {Origin: "http://localho.st:3000"})
      .then( res => res.json())
      .catch(err => console.log(err));
  }

  async populateReviews() {
    let uri = 'http://localhost:5034/api/Review/UserReviews/' + this.user.userid;
    const response = await fetch(uri);
    let data = await response.json();

    var promises = data.map(o => {
      this.bookInfo(o.bookid)
      .then(b => {return { ...o, "title" : b.title}})
      .catch(err => console.log(err)) 
    });
    //alert("retrieved reviews " + JSON.stringify(data));
    //                        cover_img: "https://covers.openlibrary.org/b/id/" + obj.covers[0] + "-L.jpg"}
    this.setState({ user_reviews: data, loading: false });
  }
}
