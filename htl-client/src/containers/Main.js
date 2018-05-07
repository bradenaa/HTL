import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';



class Main extends Component {

  handleClick = e => {
      e.preventDefault();
      this.props.authUser()
        .then(() => {
          console.log("LOGGED IN SUCCESFULLY");
        })
        .catch( () => {
          return;
        });
    }

  render() {
    const { authUser, errors, removeError, currentUser } = this.props;

    return (
      <div>
        <div>
          Hello world
        </div>
        <button onClick={this.handleClick}>
          Twitter
        </button>
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

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
