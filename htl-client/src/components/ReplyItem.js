import React, { Component } from 'react';
// import { Link } from "react-router-dom";

class ReplyItem extends Component {

  render() {
    const {
      removeReply,
      userCreated,
      reply,
      isCorrectUser
    } = this.props;


    return(
      <div>
        <li className="discussion-list-item">
          <h3>By: {userCreated.displayName}</h3>
          <h4>Reply: {reply}</h4>
          {isCorrectUser && (
            <div>
              <button onClick={removeReply}>DELETE</button>
            </div>
          )}
        </li>
      </div>
    )
  }
}


export default ReplyItem;
