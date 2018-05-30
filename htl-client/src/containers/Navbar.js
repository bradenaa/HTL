import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './Auth';
import { logout, twitterAuth, authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';




class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  togglePopup = e => {
    e.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    const { logout, authUser, twitterAuth, errors, removeError, currentUser } = this.props;

    return (
      <div className="nav_and_popup">
        <nav className="navbar">
          <div className="nav_container">
            <p>Hashtag Language</p>
            {this.props.currentUser.isAuthenticated ? (
              <div>
                <Link to="/events">Events</Link>
                <Link to={`/users/${this.props.currentUser.user.id}/events/new`}>
                  New Event
                </Link>
                <button id="loginButton" onClick={logout}>Logout</button>
              </div>
            ) : (
              <div>
                <button id="loginButton" onClick={this.togglePopup}>Login</button>
              </div>
            )}
          </div>
        </nav>
        <div className="popup_container">
          {
            this.state.showPopup ?
              <Auth
                closePopup={this.togglePopup}
                twitterAuth={twitterAuth}
                logout={logout}
                currentUser={currentUser}
                authUser={authUser}
                // {...props}
              />
            : null
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, {  logout, authUser, twitterAuth, removeError })(Navbar));