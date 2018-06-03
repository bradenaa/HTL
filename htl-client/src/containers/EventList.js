import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents, removeEvent, joinEvent } from '../store/actions/events';
import EventItem from '../components/EventItem';

class EventList extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events, removeEvent, joinEvent, currentUser } = this.props;
    // console.log(currentUser);
    // console.log(typeof currentUser);
    let eventList = events.map(e => (

      <EventItem
        removeEvent={removeEvent.bind(this, e.userCreated, e._id)}
        joinEvent={joinEvent.bind(this, e._id, currentUser)}
        key={e._id}
        date={e.date}
        title={e.title}
        neighborhood={e.neighborhood}
        attending={e.usersAttending}
        userID={e.userCreated}
        isCorrectUser={currentUser === e.userCreated}
      />
    ));

    return (
      <div>
        <ul>
          {eventList}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user.id,
    events: state.events
  };
}

export default connect(mapStateToProps, { fetchEvents, removeEvent, joinEvent })(EventList);
