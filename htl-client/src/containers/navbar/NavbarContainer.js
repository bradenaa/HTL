import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import AuthFormContainer from './AuthFormContainer';
import Navbar from '../../components/navbar/Navbar'
import { logout, toggleAuthPopup } from '../../store/actions/auth';

//TODO: read an article about the benefits of using withRouter

class NavbarContainer extends Component {
  static propType = {
    logout: PropTypes.func,
    currentUserID: PropTypes.string,
    showAuthPopup: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    toggleAuthPopup: PropTypes.func,
    hasPromo: PropTypes.bool,
  }

  render() {
    const {
      logout,
      currentUserID,
      showAuthPopup,
      isAuthenticated,
      toggleAuthPopup,
      hasPromo,
    } = this.props;

    return (
      <div className="nav_and_popup">

        <Navbar
          isAuthenticated={isAuthenticated}
          currentUserID={currentUserID}
          logout={logout}
          toggleAuthPopup={toggleAuthPopup}
          hasPromo={hasPromo}
        />

        { showAuthPopup ? <AuthFormContainer /> : null }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserID: state.currentUser.userInfo.id,
    isAuthenticated: state.currentUser.isAuthenticated,
    showAuthPopup: state.currentUser.showAuthPopup,
    hasPromo: state.currentUser.hasPromo,
  };
}

export default connect(
  mapStateToProps,
  { logout, toggleAuthPopup }
)(NavbarContainer);
