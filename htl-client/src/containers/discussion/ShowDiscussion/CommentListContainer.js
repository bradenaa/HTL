import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../../../components/discussion/ShowDiscussion/CommentList'
import CommentFormContainer from './CommentFormContainer'
import { toggleCommentForm, removeCommentAndDispatch } from '../../../store/actions/discussions'

class CommentListContainer extends Component {
  static propTypes = {
    currenUserID: PropTypes.string,
    discussionID: PropTypes.string,
    showCommentForm: PropTypes.bool,
    comments: PropTypes.array,
    toggleCommentForm: PropTypes.func,
    removeComment: PropTypes.func
  }

  render() {
    const { currentUserID, showCommentForm, comments, toggleCommentForm, removeComment, discussionID } = this.props;

    return(
      <div>
        <button id="loginButton" onClick={toggleCommentForm}>Leave a Comment</button>
        
        <div className="popup_container">
          { showCommentForm ? <CommentFormContainer /> : null }
        </div>

        <CommentList
          currentUserID={currentUserID}
          discussionID={discussionID}
          comments={comments}
          removeComment={removeComment}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserID: state.currentUser.userInfo._id,
    discussionID: state.showDiscussion._id,
    showCommentForm: state.showDiscussion.showCommentForm,
    comments: state.showDiscussion.comments
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleCommentForm: () => dispatch(toggleCommentForm()),
    removeComment: (userID, discussionID, commentID) => dispatch(removeCommentAndDispatch(userID, discussionID, commentID)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)
