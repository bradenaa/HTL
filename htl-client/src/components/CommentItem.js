import React, { Component } from 'react';
import ReplyList from '../containers/ReplyList';
import ReplyForm from '../containers/ReplyForm';
import { removeReplyAndDispatch } from '../store/actions/discussions';
// import { Link } from "react-router-dom";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplies: false,
      showReplyForm: false
    }
  }

  toggleReplies = e => {
    e.preventDefault();
    this.setState({
      showReplies: !this.state.showReplies
    });
  }

  toggleReplyForm = e => {
    e.preventDefault();
    this.setState({
      showReplyForm: !this.state.showReplyForm
    });
  }

  render() {
    const {
      removeComment,
      userCreated,
      comment,
      replies,
      isCorrectUser,
      commentID
    } = this.props;

    return(
      <div>
        <li className="discussion-list-item">
          <h3>By: {userCreated.displayName}</h3>
          <h4>Comment: {comment}</h4>
          {isCorrectUser && (
            <div>
              <button onClick={removeComment}>DELETE</button>
            </div>
          )}
          <div>
            <button onClick={this.toggleReplies}>Show Replies</button>
          </div>
          <div>
            <button onClick={this.toggleReplyForm}>Leave a Reply</button>
          </div>
          { this.state.showReplyForm &&
            <ReplyForm
              commentID={commentID}
            />
          }
          { this.state.showReplies &&
            <ReplyList
              replies={replies}
              commentID={commentID}
            />
          }

        </li>
      </div>
    )
  }
}


export default CommentItem;
