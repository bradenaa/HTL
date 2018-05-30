import React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom"

const EventItem = (
  {
    date,
    title,
    neighborhood,
    removeEvent,
    userID,
    isCorrectUser
  }
) => (
  <div>
    <li className="event-list-item">
      <h2>{title}</h2>
      <h3>{neighborhood}</h3>
      <h4>
        <Moment format="Do MMM YYYY">
          {date}
        </Moment>
      </h4>
      {isCorrectUser && (
        <a onClick={removeEvent}>Delete</a>
      )}
    </li>
  </div>
)

export default EventItem;