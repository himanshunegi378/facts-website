import React, { Component } from "react";
import Axios from "axios";

export default class BookmarkedFacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: []
    };
  }
  componentDidMount() {
    Axios.get("/api/users/fetch_bookmarks").then(res => {
      this.setState({ bookmarks: res.data.msg });
    });
  }
  render() {
    let item = this.state.bookmarks.map(item => {
      return (
        <p className='card center-align hoverable z-depth-1-half'>{item}</p>
      );
    });
    return <div className='container z-depth-1'>{item}</div>;
  }
}
