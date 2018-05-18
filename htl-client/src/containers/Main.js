import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from "../components/Landing";
import FAQ from "../components/FAQ";
import { twitterAuth, authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';

const Main = props => {
  const { authUser, twitterAuth ,errors, removeError, currentUser } = props;

  return (
    <div className="container">
      <Switch>
        <Route
          exact path="/"
          render={props => <Landing currentUser={currentUser} {...props} />}
        />
        <Route
          exact path="/FAQ"
          render={props => <FAQ currentUser={currentUser} {...props} />}
        />
      </Switch>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser, twitterAuth, removeError })(Main));
