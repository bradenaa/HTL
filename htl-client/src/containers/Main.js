import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from "../components/Landing";
import FAQ from "../components/FAQ";
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import Events from '../components/Events';
import Discussion from '../components/Discussion';
import ShowDiscussion from '../containers/ShowDiscussion';
import EventForm from '../containers/EventForm';

const Main = props => {

  const { removeError, currentUser } = props;

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
        <Route
          exact path="/events"
          component={withAuth(Events)}
        />
        <Route
          path="/users/:userID/events/new"
          component={withAuth(EventForm, removeError)}
        />
        <Route
          exact path="/discussion"
          component={withAuth(Discussion)}
        />
        <Route
          path="/discussion/:discussionID"
          component={withAuth(ShowDiscussion)}
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

export default withRouter(connect(mapStateToProps, { removeError })(Main));
