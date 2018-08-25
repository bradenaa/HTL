import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isAuthenticated: false,
          user: null,
          token: '',
          promoCode: ''
        };
    }

    logout = e => {
      e.preventDefault();
      this.props.logout();
    };

    twitterResponse = (response) => {
      this.props.twitterAuth(response);
    };

    facebookResponse = (response) => {
      console.log("response", response);
      this.props.authUser('facebook', response);
    };

    googleResponse = (response) => {
      console.log("response", response);
      this.props.authUser('google', response);
    };

    handlePromoSubmit = (e) => {
      e.preventDefault();
      this.props.submitPromo(this.state.promoCode, this.props.currentUser.user.id);
      this.setState({promoCode: ''});
    }

    onFailure = (error) => {
      alert(error);
      console.log(error);
    };

    render() {
        let content = (!!this.props.currentUser.isAuthenticated && !this.props.currentUser.hasPromo) ?
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
                    HasPromo:
                    {this.props.currentUser.user.hasPromo.toString()}
                  </div>
                  <div>
                    {this.props.currentUser.user.token}
                  </div>
                  <div>
                    <button onClick={this.logout} className="button">
                      Log out
                    </button>
                    <button onClick={this.props.closePopup}>Close</button>
                    <br/>
                    <form onSubmit={this.handlePromoSubmit}>
                      <input
                        type="text"
                        value={this.state.promoCode}
                        onChange={e => this.setState({ promoCode: e.target.value })}
                      />
                      <button type="submit">Enter Promo</button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (!!this.props.currentUser.isAuthenticated && this.props.currentUser.hasPromo) ?
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
                        HasPromo:
                        {this.props.currentUser.user.hasPromo.toString()}
                      </div>
                      <div>
                        {this.props.currentUser.user.token}
                      </div>
                      <div>
                        <button onClick={this.logout} className="button">
                          Log out
                        </button>
                        <button onClick={this.props.closePopup}>Close</button>
                        <br/>
                        {/* <form onSubmit={this.handlePromoSubmit}>
                          <input
                            type="text"
                            value={this.state.promoCode}
                            onChange={e => this.setState({ promoCode: e.target.value })}
                          />
                          <button type="submit">Enter Promo</button>
                        </form> */}
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

export default Auth;
