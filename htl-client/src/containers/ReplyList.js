import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeReplyAndDispatch } from '../store/actions/discussions';
import ReplyItem from '../components/ReplyItem';

class ReplyList extends Component {


  render() {
    const { foundDiscussion, currentUser, removeReplyAndDispatch, removeError, replies, commentID } = this.props;

    console.log("replies", replies);

    let repliesList = replies.map(r => {
      return (
        <ReplyItem
          removeReply={removeReplyAndDispatch.bind(this, commentID, r._id)}
          key={r._id}
          userCreated={r.author}
          reply={r.text}
          isCorrectUser={currentUser.user.id === r.author._id}
        />
      )
    });

    return (
      <div>
        <ul>
          <h1>Reply List </h1>
          {repliesList.length ? repliesList : <div>Waiting for the first reply...</div>}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { removeReplyAndDispatch })(ReplyList);
