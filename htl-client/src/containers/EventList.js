import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents, removeEvent } from '../store/actions/events';
import EventItem from '../components/EventItem';

class EventList extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events, removeEvent, currentUser } = this.props;
    let eventList = events.map(e => (

      <EventItem
        removeEvent={removeEvent.bind(this, e.user._id, e._id)}
        key={e._id}
        date={e.date}
        title={e.title}
        neighborhood={e.neighborhood}
        userID={e.user._id}
        isCorrectUser={currentUser === e.user._id}
      />
    ))

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

export default connect(mapStateToProps, { fetchEvents, removeEvent })(EventList);
