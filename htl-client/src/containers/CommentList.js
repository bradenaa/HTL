import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeCommentAndDispatch } from '../store/actions/discussions';
import CommentItem from '../components/CommentItem';

class CommentList extends Component {


  render() {
    const { foundDiscussion, currentUser, removeCommentAndDispatch, removeError } = this.props;

    let commentList = foundDiscussion.comments.map(c => {
      return (
        <CommentItem
          removeComment={removeCommentAndDispatch.bind(this, c.author._id, foundDiscussion._id, c._id)}
          key={c._id}
          commentID={c._id}
          userCreated={c.author}
          comment={c.text}
          replies={c.replies}
          isCorrectUser={currentUser.user.id === c.author._id}
        />
      )
    });

    return (
      <div>
        <ul>
          <h1>The Comment List: </h1>
          {commentList.length ? commentList : <div>Waiting for the first comment...</div>}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps, { removeCommentAndDispatch })(CommentList);
