import React from 'react';
// import { Link } from "react-router-dom";

const CommentItem = (
  {
    removeComment,
    userCreated,
    comment,
    isCorrectUser,
  }
) => (

  <div>
    <li className="discussion-list-item">
      <h3>By: {userCreated.displayName}</h3>
      <h4>Comment: {comment}</h4>
      {isCorrectUser && (
        <div>
          <button onClick={removeComment}>DELETE</button>
        </div>
      )}
    </li>
  </div>
)

export default CommentItem;
