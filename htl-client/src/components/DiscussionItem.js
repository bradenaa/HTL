import React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom"

const DiscussionItem = (
  {
    removeDiscussion,
    date,
    title,
    post,
    userCreated,
    isCorrectUser
  }
) => (

  <div>
    <li className="discussion-list-item">
      <h1>{title}</h1>
      <h3>By: {userCreated.displayName}</h3>
      <h4>Post: {post}</h4>
      {isCorrectUser && (
        <div>
          <button onClick={removeDiscussion}>DELETE</button>
        </div>
      )}
    </li>
  </div>
)

export default DiscussionItem;
