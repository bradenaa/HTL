import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import AuthSocialForm from '../../components/navbar/AuthSocialForm'
import AuthPromoForm from '../../components/navbar/AuthPromoForm'
import AuthSuccess from '../../components/navbar/AuthSuccess'
import { logout, twitterAuth, authUser, toggleAuthPopup, submitPromo } from '../../store/actions/auth';

// TODO: Look into cleaning up the auth response. Take a look at

class AuthFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { promoCode: '' }
      }

    static propTypes = {
      authUser: PropTypes.func,
      currentUserID: PropTypes.string,
      email: PropTypes.string,
      hasPromo: PropTypes.bool,
      isAuthenticated: PropTypes.bool,
      logout: PropTypes.func,
      name: PropTypes.string,
      submitPromo: PropTypes.func,
      toggleAuthPopup: PropTypes.func,
      token: PropTypes.string,
      twitterAuth: PropTypes.func,
    }

    twitterResponse = (response) => { this.props.twitterAuth(response) };
    facebookResponse = (response) => { this.props.authUser('facebook', response) };
    googleResponse = (response) => { this.props.authUser('google', response) };

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value })
    }

    handlePromoSubmit = (e) => {
      e.preventDefault();
      this.props.submitPromo(this.state.promoCode, this.props.currentUserID);
      this.setState({promoCode: ''});
    }

    logout = e => {
      e.preventDefault();
      this.props.logout();
    };

    onFailure = (error) => {
      alert(error);
      console.log(error);
    };

    render() {
      const { promoCode } = this.state;
      const {
        isAuthenticated,
        hasPromo,
        name,
        email,
        currentUserID,
        token,
        toggleAuthPopup,
      } = this.props;

        return (
            <div className="popup_container">

              {
                (!!isAuthenticated && !hasPromo) ?

                  <AuthPromoForm
                    name={name}
                    email={email}
                    currentUserID={currentUserID}
                    hasPromo={hasPromo}
                    token={token}
                    logout={this.logout}
                    toggleAuthPopup={toggleAuthPopup}
                    promoCode={promoCode}
                    handlePromoSubmit={this.handlePromoSubmit}
                    handleChange={this.handleChange}
                  /> :

                (!!isAuthenticated && hasPromo) ?

                  <AuthSuccess
                    name={name}
                    email={email}
                    currentUserID={currentUserID}
                    hasPromo={hasPromo}
                    token={token}
                    logout={this.logout}
                    toggleAuthPopup={toggleAuthPopup}
                  /> :

                <AuthSocialForm
                  facebookResponse={this.facebookResponse}
                  googleResponse={this.googleResponse}
                  twitterResponse={this.twitterResponse}
                  onFailure={this.onFailure}
                  toggleAuthPopup={toggleAuthPopup}
                />

              }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.currentUser.isAuthenticated,
    hasPromo: state.currentUser.hasPromo,
    name: state.currentUser.userInfo.displayName,
    email: state.currentUser.userInfo.email,
    currentUserID: state.currentUser.userInfo._id,
    token: state.currentUser.userInfo.token,
  }
}

export default connect(
  mapStateToProps,
  { logout, authUser, twitterAuth, submitPromo, toggleAuthPopup }
)(AuthFormContainer);
