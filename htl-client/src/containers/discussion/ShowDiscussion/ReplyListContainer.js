import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import ReplyList from '../../../components/discussion/ShowDiscussion/ReplyList'
import ReplyFormContainer from './ReplyFormContainer'
import { toggleReplyList, toggleReplyForm, removeReplyAndDispatch } from '../../../store/actions/discussions'

class ReplyListContainer extends Component {
  static propTypes = {
    showReplyList: PropTypes.bool,
    toggleReplyList: PropTypes.func,
    commentID: PropTypes.string,
    replies: PropTypes.array,
    currentUserID: PropTypes.string,
    removeID: PropTypes.func,
  }

  render() {
    const {
      showReplyList,
      showReplyForm,
      commentID,
      toggleReplyList,
      toggleReplyForm,
      replies,
      currentUserID,
      removeReply,
     } = this.props;

    return(
      <div>
        <button onClick={toggleReplyList.bind(this, commentID)}> Show Replies </button>

        <button onClick={toggleReplyForm.bind(this, commentID)}> Show Reply Form </button>

        { showReplyForm ? <ReplyFormContainer commentID={commentID} /> : null }

        { showReplyList ?
          <ReplyList
            removeReply={removeReply}
            currentUserID={currentUserID}
            replies={replies}
            commentID={commentID}
          /> : null }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    replies: state.showDiscussion.comments.find(c => c._id === ownProps.commentID).replies,
    currentUserID: state.currentUser.userInfo._id,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleReplyList: (commentID) => dispatch(toggleReplyList(commentID)),
    toggleReplyForm: (commentID) => dispatch(toggleReplyForm(commentID)),
    removeReply: (commentID, replyID) => dispatch(removeReplyAndDispatch(commentID, replyID))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyListContainer)
