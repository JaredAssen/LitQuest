import React, { Component } from "react";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewid: 0,
      userid: 0,
      text: "",
      rating: 0.0,
      bookid: "",
      user: null,
    };
  }

  render() {
    return (
      <div>
        <p>Review ID: {this.state.reviewid}</p>
        <p>User ID: {this.state.userid}</p>
        <p>Text: {this.state.text}</p>
        <p>Rating: {this.state.rating}</p>
        <p>Book ID: {this.state.bookid}</p>
        <p>User: {this.state.user}</p>
      </div>
    );
  }
}

export default Review;