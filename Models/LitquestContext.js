import React from "react";

class LitquestContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      books: [],
      booklists: [],
      reviews: [],
      users: []
    };
  }

  componentDidMount() {
    // fetch data from API endpoint and update state
  }

  render() {
    return <div>{/* render content here */}</div>;
  }
}

export default LitquestContext;