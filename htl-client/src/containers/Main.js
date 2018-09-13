import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from "../components/Landing";
import FAQ from "../components/FAQ";
// import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';

// New Discussion Structures
import DiscussionContainer from '../containers/discussion/DiscussionContainer'
import ShowDiscussionContainer from '../containers/discussion/ShowDiscussion/ShowDiscussionContainer'

//Events
import Events from '../components/Events';
import EventForm from '../containers/EventForm';

//TODO: Look into typescript for prop handling on the containers and components. Also for type strictness

const Main = (props) => {
  const { currentUser } = props;

  return (
    <div className="container">
      <Switch>
        <Route
          exact path="/"
          render={props => <Landing currentUser={currentUser}/>}
        />
        <Route
          exact path="/FAQ"
          render={props => <FAQ currentUser={currentUser}/>}
        />
        <Route
          exact path="/events"
          component={withAuth(Events)}
        />
        <Route
          path="/users/:userID/events/new"
          component={withAuth(EventForm)}
        />
        <Route
          exact path="/discussion"
          component={withAuth(DiscussionContainer)}
        />
        <Route
          path="/discussion/:discussionID"
          component={withAuth(ShowDiscussionContainer)}
        />
      </Switch>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    // errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps)(Main));
