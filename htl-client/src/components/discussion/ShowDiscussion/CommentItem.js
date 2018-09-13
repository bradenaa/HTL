import React from 'react'
import PropTypes from 'prop-types'
import ReplyListContainer from '../../../containers/discussion/ShowDiscussion/ReplyListContainer'

const CommentItem = (props) => {
  const {
    authorName,
    date,
    commentID,
    text,
    isCorrectUser,
    removeComment,
    showReplyList,
    showReplyForm,
   } = props;

  return(
    <div className='comment_item'>
      <h2>By: {authorName} </h2>
      <h3>On: { date } </h3>
      <h4> { text } </h4>
      <h6>id:  { commentID } </h6>

      { isCorrectUser && (<button onClick={removeComment}> DELETE </button>) }

      <ReplyListContainer
        showReplyList={showReplyList}
        showReplyForm={showReplyForm}
        commentID={commentID}
      />

    </div>
  )
}

CommentItem.propTypes = {
  authorName: PropTypes.string,
  date: PropTypes.string,
  commentID: PropTypes.string,
  text: PropTypes.string,
  isCorrectUser: PropTypes.bool,
  removeComment: PropTypes.func,
  showReplyList: PropTypes.bool,
  showReplyForm: PropTypes.bool,
}

export default CommentItem
