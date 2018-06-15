import React from 'react';
import { Link } from "react-router-dom";

const DiscussionItem = (
  {
    removeDiscussion,
    date,
    title,
    post,
    userCreated,
    isCorrectUser,
    postID
  }
) => (

  <div>
    <li className="discussion-list-item">
      <Link to={`/discussion/${postID}`} >{title}</Link>
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
