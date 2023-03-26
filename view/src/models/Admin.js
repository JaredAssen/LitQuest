import React, { Component } from 'react';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />
      </div>
    );
  }
}

export default Admin;