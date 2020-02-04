import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authActions";

let LoginOrLogout = props => {
  let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch()


  return (
    <>
      {isAuthenticated === false ? (
        <div className='right'>
          <Link className='btn btn-large waves-effect waves-light hoverable blue accent-3' to='/login'>
            Login
          </Link>
        </div>
      ) : (
        <div className='right'>
          <button
            className=' btn btn-large waves-effect waves-light hoverable black accent-3 '
            onClick={() => dispatch(logoutUser())}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

class Navbar extends Component {
  render() {
    return (
      <div className='navbar-fixed'>
        <nav className='z-depth-0'>
          <div className='nav-wrapper white'>
            <Link
              to='/'
              style={{
                fontFamily: "monospace"
              }}
              className='brand-logo center black-text'
            >
              <i className='material-icons'>code</i>
              FACTS
            </Link>
            <LoginOrLogout />
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
