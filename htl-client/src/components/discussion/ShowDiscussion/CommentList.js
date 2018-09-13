import React from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

const CommentList = (props) => {
  const { currentUserID, discussionID, comments, removeComment } = props;

  let commentList = comments.map(c => {
    return (
      <CommentItem
        key={c._id}
        commentID={c._id}
        authorName={c.author.displayName}
        text={c.text}
        date={c.createdAt}
        isCorrectUser={c.author._id === currentUserID}
        removeComment={removeComment.bind(this, currentUserID, discussionID, c._id)}
        showReplyList={c.showReplyList}
        showReplyForm={c.showReplyForm}
      />
    )
  })

  return (
    <div>
      {commentList.length ? commentList : <div> No Comments Yet! Try leaving one...</div>}
    </div>
  )
}

CommentList.propTypes = {
  currentUserID: PropTypes.string,
  discussionID: PropTypes.string,
  comments: PropTypes.array,
  removeComment: PropTypes.func
}

export default CommentList;
