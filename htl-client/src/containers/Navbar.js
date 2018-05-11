import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './Auth';
// import { logout } from '../store/actions/auth';



class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div className="nav_and_popup">
        <nav className="navbar">
          <div className="nav_container">
            <p>Hashtag Language</p>
            <button id="loginButton" onClick={this.togglePopup}>Login</button>
          </div>
        </nav>
        <div className="popup_container">
          {
            this.state.showPopup ?
              <Auth
                closePopup={this.togglePopup}
              />
            : null
          }
        </div>
      </div>
    )
  }
}

export default Navbar;
