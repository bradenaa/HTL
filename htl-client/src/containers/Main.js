import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from "../components/Landing";
import FAQ from "../components/FAQ";
import withAuth from '../hocs/withAuth';

// New Discussion Structures
import DiscussionsContainer from '../containers/discussion/DiscussionsContainer'
import ShowDiscussionContainer from '../containers/discussion/ShowDiscussion/ShowDiscussionContainer'

// Profile
import ProfileContainer from '../containers/profile/ProfileContainer'

//Events
import Events from '../components/Events';
import EventForm from '../containers/EventForm';

//TODO: Look into typescript for prop handling on the containers and components. Also for type strictness
//TODO: Think about routing different NavBars and different apps depending on authorization
//TODO: Implement a system to grab error message from state to display information to the user

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
          exact path="/profile/:userID"
          component={withAuth(ProfileContainer)}
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
          component={withAuth(DiscussionsContainer)}
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
  };
}

export default withRouter(connect(mapStateToProps)(Main));
