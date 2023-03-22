import React, { Component } from 'react';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: '',
      userid: 0,
      user: null,
    };
  }

  render() {
    return (
      <div>
        <label htmlFor="listname">List Name:</label>
        <input
          type="text"
          id="listname"
          value={this.state.listname}
          onChange={(e) => this.setState({ listname: e.target.value })}
        />
        <br />
        <label htmlFor="userid">User ID:</label>
        <input
          type="number"
          id="userid"
          value={this.state.userid}
          onChange={(e) => this.setState({ userid: e.target.value })}
        />
        <br />
        <label htmlFor="user">User:</label>
        <input
          type="text"
          id="user"
          value={this.state.user}
          onChange={(e) => this.setState({ user: e.target.value })}
        />
      </div>
    );
  }
}

export default BookList;