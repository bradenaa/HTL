import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { authUser } from '../store/actions/auth';
// import { removeError } from '../store/actions/errors';



class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = e => {
      e.preventDefault();
      this.props.logout();
    };

    twitterResponse = (response) => {
      this.props.twitterAuth(response);
      // response.json().then(user => {
      //   console.log(user);
      //   if (user.token) {
      //     this.setState({isAuthenticated: true, user: user, token: user.token})
      //   }
      // })
    };

    facebookResponse = (response) => {
      console.log("response", response);
      this.props.authUser('facebook', response);
      // const tokenBlob = new Blob(
      //   [JSON.stringify({access_token: response.accessToken}, null, 2)],
      //   {type: 'application/json'}
      // );
      // const options = {
      //   method: 'POST',
      //   body: tokenBlob,
      //   mode: 'cors',
      //   cache: 'default'
      // };
      // fetch('http://localhost:8081/api/auth/facebook', options)
      //   .then(r => {
      //     const token = r.headers.get('x-auth-token');
      //     r.json().then(user => {
      //       if (token) {
      //         this.setState({isAuthenticated: true, user, token})
      //       }
      //     });
      //   })
    };

    googleResponse = (response) => {
      console.log("response", response);
      this.props.authUser('google', response);
    };

    onFailure = (error) => {
      alert(error);
      console.log(error);
    };

    render() {
        let content = !!this.props.currentUser.isAuthenticated ?
            (
              <div className='popup'>
                <div className='popup_inner'>
                  <p>Authenticated</p>
                  <div>
                    {this.props.currentUser.user.name}
                  </div>
                  <div>
                    {this.props.currentUser.user.email}
                  </div>
                  <div>
                    {this.props.currentUser.user.id}
                  </div>
                  <div>
                    {this.props.currentUser.user.token}
                  </div>
                  <div>
                    <button onClick={this.logout} className="button">
                      Log out
                    </button>
                    <button onClick={this.props.closePopup}>Close</button>
                  </div>
                </div>
              </div>
            ) :
            (
              <div className="popup">
                <div className="popup_inner">
                  <TwitterLogin loginUrl="http://localhost:8081/api/auth/twitter"
                    onFailure={this.onFailure}
                    onSuccess={this.twitterResponse}
                    requestTokenUrl="http://localhost:8081/api/auth/twitter/reverse"
                  />
                  <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.facebookResponse}
                  />
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                  />
                  <button onClick={this.props.closePopup}>Close</button>
                </div>
              </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors

  }
}


export default Auth;
