import React, { Component } from "react";
import Axios from "axios";

export default class AddFacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fact: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/users/add_fact", this.state).then(
      res => {
        if (res.data.added) {
          this.setState({ fact: "" });
        }
      }
    );
  };
  render() {
    return (
      <div className='container'>
        <form className='card z-depth-2' onSubmit={this.onSubmit}>
          <input
            autoFocus
            type='text'
            id='fact'
            onChange={this.onChange}
            value={this.state.fact}
          />
          <button
            className='btn btn-large waves-effect waves-light hoverable blue accent-3'
            type='submit'
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
