import React from 'react'
import PropTypes from 'prop-types'
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

//TODO: look at the repo for these social logins

const AuthSocialForm = (props) => {
  const { onFailure, twitterResponse, facebookResponse, googleResponse, toggleAuthPopup} = props;

  return (
    <div className="popup">
      <div className="popup_inner">
        <TwitterLogin loginUrl="http://localhost:8081/api/auth/twitter"
          onFailure={onFailure}
          onSuccess={twitterResponse}
          requestTokenUrl="http://localhost:8081/api/auth/twitter/reverse"
        />
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={facebookResponse}
        />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={googleResponse}
          onFailure={onFailure}
        />
        <button onClick={toggleAuthPopup}>Close</button>
      </div>
    </div>
  )
}

AuthSocialForm.propTypes = {
  facebookResponse: PropTypes.func,
  googleResponse: PropTypes.func,
  onFailure: PropTypes.func,
  toggleAuthPopup: PropTypes.func,
  twitterResponse: PropTypes.func,
}

export default AuthSocialForm
