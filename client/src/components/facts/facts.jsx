import React, { Component } from "react";
import "./style.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

let ToggleBookmark = props => {
  return (
    <div className='bookmark right-align  '>
      <input
        onClick={() => {
          axios
            .post("/api/users/bookmark/" + props.objectID)
            .then(res => {
              console.log(res.data.msg);
            });
        }}
        className='btn waves-effect waves-light hoverable z-depth-2'
        type='button'
        value='Bookmark'
      />
    </div>
  );
};

let Item = props => {
  let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <div className=' card hoverable'>
      <div className='card-content'>
        {isAuthenticated === true ? (
          <ToggleBookmark objectID={props._id} />
        ) : null}
        {props.value}
        <div className='card-action'></div>
        <div className='range-field'>
          <input type='range' id='test5' min='0' max='100' />
        </div>
      </div>
    </div>
  );
};

class facts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: []
    };
  }

  componentDidMount() {
    axios.get("/api/users/fetch_facts").then(res => {
      this.setState({ facts: res.data });
    });
  }
  render() {
    let item = this.state.facts.map(fact => {
      return <Item key={fact._id} _id={fact._id} value={fact.fact} />;
    });
    return <div className='container section'>{item}</div>;
  }
}

export const Facts = facts;
