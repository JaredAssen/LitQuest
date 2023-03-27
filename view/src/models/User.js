import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      userid: null,
      about: null,
      booklists: [],
      reviews: []
    };
  }

  render() {
    const { username, password, email, userid, about, booklists, reviews } = this.state;

    return (
      <div>
        <h1>User Information</h1>
        <p>Username: {username}</p>
        <p>Password: {password}</p>
        <p>Email: {email}</p>
        <p>User ID: {userid}</p>
        <p>Booklists: {booklists.map(booklist => booklist.name).join(', ')}</p>
        <p>Reviews: {reviews.length}</p>
      </div>
    );
  }
}

export default User;