import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { isAuthenticated, currentUserID, logout, toggleAuthPopup, hasPromo } = props;

  return(
    <nav className="navbar">
      <div className="nav_container">
        <p>Hashtag Language</p>

        {
          !!isAuthenticated && hasPromo ?
            <div>
              <Link to="/events">Events</Link>
              <Link to="/discussion">Discussion</Link>
              <Link to={`/profile/${currentUserID}`}> Profile </Link>

              <Link to={`/users/${currentUserID}/events/new`}>
                New Event
              </Link>
              <button id="loginButton" onClick={logout}>Logout</button>
            </div>
          :
          <div>
            <button id="loginButton" onClick={toggleAuthPopup}>Login</button>
          </div>
        }

      </div>
    </nav>
  )
}

Navbar.propTypes = {
  currentUserID: PropTypes.string,
  hasPromo: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
  toggleAuthPopup: PropTypes.func,
}

export default Navbar
