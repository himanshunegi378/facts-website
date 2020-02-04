import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

let AuthenticationChecker = props => {
  let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) {
    props.history.push("/facts");
  }
  return <></>;
};

class Landing extends Component {

  render() {
    return (
      <div style={{ height: "75vh" }} className='container valign-wrapper'>
        <AuthenticationChecker history = {this.props.history} />
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              Belive me, I have true <span style={{ fontFamily: "monospace" }}>FACTS</span>.
            </h4>
          
            <br />
            <div className='col s6'>
              <Link
                to='/register'
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
              >
                Register
              </Link>
            </div>
            <div className='col s6'>
              <Link
                to='/login'
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className='btn btn-large btn-flat waves-effect white black-text'
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
