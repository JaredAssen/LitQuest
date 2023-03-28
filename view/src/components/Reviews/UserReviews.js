import './UserReviews.css';
import React, { Component, useState, useEffect } from 'react';

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
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Book Id</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {user_reviews.map(review =>
            <tr key={review.reviewid}>
              <td>{review.bookid}</td>
              <td>{review.rating}</td>
              <td>{review.text}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
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

  // FOr some reason, this is not getting executed properly?? Returns nothing
  async getBookInfo(bid) {
    let uri = 'http://openlibrary.org/books/' + bid + ".json";
    const bookinfo =  await fetch(uri);
    if ( bookinfo.ok )
        return await bookinfo.json();
    alert('fetch ' + uri + ' failed: ' + bookinfo.status);
    return null;
  }

  async populateReviews() {
    let uri = 'http://localhost:5034/api/Review/UserReviews/' + this.user.userid;
    const response = await fetch(uri);
    const data = await response.json();
    //alert("retrieved reviews " + JSON.stringify(data));

    data.map(review => {
        //alert("Call getBookInfo with " + review.bookid);
        const bookdata =  this.getBookInfo(review.bookid);
        if (bookdata == null || Object.keys(bookdata).length == 0 ) {
            //alert("returned data is null");
            return review;
        }
        else
            return { ...review, title: bookdata.title, cover_i: bookdata.covers[0]}
    });

    //alert("updated info: " + JSON.stringify(data));
    this.setState({ user_reviews: data, loading: false });
  }
}
