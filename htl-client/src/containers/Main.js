import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { authUser } from '../store/actions/auth';
// import { removeError } from '../store/actions/errors';



class Main extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    twitterResponse = (response) => {
      const token = response.headers.get('x-auth-token');
      response.json().then(user => {
        if (token) {
          this.setState({isAuthenticated: true, user, token})
        }
      })
    };

    facebookResponse = (response) => {
      const tokenBlob = new Blob(
        [JSON.stringify({access_token: response.accessToken}, null, 2)],
        {type: 'application/json'}
      );
      const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
      };
      fetch('http://localhost:8081/api/auth/facebook', options)
        .then(r => {
          const token = r.headers.get('x-auth-token');
          r.json().then(user => {
            if (token) {
              this.setState({isAuthenticated: true, user, token})
            }
          });
        })
    };

    googleResponse = (response) => {
      const tokenBlob = new Blob(
        [JSON.stringify({access_token: response.accessToken}, null, 2)],
        {type: 'application/json'}
      );
      const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
      };
      fetch('http://localhost:8081/api/auth/google', options)
        .then(r => {
          const token = r.headers.get('x-auth-token');
          r.json().then(user => {
            if (token) {
              this.setState({isAuthenticated: true, user, token})
            }
          });
        })
    };

    onFailure = (error) => {
      alert(error);
      console.log(error);
    };

    render() {
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                  <p>Authenticated</p>
                  <div>
                    {this.state.user.email}
                  </div>
                  <div>
                    <button onClick={this.logout} className="button">
                      Log out
                    </button>
                  </div>
                </div>
            ) :
            (
                <div>
                  <TwitterLogin loginUrl="http://localhost:8081/api/auth/twitter"
                    onFailure={this.onFailure}
                    onSuccess={this.twitterResponse}
                    requestTokenUrl="http://localhost:8081/api/auth/twitter/callback"
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
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default Main;
