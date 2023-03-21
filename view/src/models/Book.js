import React, { Component } from 'react';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookid: 0,
      listname: '',
    };
  }

  render() {
    return (
      <div>
        <label htmlFor="bookid">Book ID:</label>
        <input
          type="number"
          id="bookid"
          value={this.state.bookid}
          onChange={(e) => this.setState({ bookid: e.target.value })}
        />
        <br />
        <label htmlFor="listname">List Name:</label>
        <input
          type="text"
          id="listname"
          value={this.state.listname}
          onChange={(e) => this.setState({ listname: e.target.value })}
        />
      </div>
    );
  }
}

export default Book;