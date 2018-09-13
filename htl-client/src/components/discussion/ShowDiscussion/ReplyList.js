import React from 'react'
import PropTypes from 'prop-types'
import ReplyItem from './ReplyItem'

const ReplyList = (props) => {
  const { replies, currentUserID, removeReply, commentID } = props;

  let replyList = replies.map( r => {
    return (
      <ReplyItem
        key={r._id}
        replyID={r._id}
        date={r.createdAt}
        replyText={r.replyText}
        authorName={r.author.displayName}
        isCorrectUser={r.author._id === currentUserID}
        removeReply={removeReply.bind(this, commentID, r._id)}
      />
    )
  })

  return(
    <div>
      { replyList.length ? replyList : <div> Waiting on a reply! Leave one? </div>}
    </div>
  )
}

ReplyList.propTypes ={
  replies: PropTypes.array,
  currenUserID: PropTypes.string,
  removeReply: PropTypes.func,
  commentID: PropTypes.string,
}

export default ReplyList
