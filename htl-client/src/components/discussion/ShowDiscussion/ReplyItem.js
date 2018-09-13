import React from 'react'
import PropTypes from 'prop-types'

const ReplyItem = (props) => {
  const { replyID, date, replyText, authorName, isCorrectUser, removeReply } = props;

  return (
    <div className="reply_item">
      <h3>By: {authorName} </h3>
      <h4>On: {date} </h4>
      <h5> {replyText} </h5>
      <h6> id: {replyID} </h6>

      { isCorrectUser && (<button onClick={removeReply}> DELETE </button>) }
    </div>
  )
}

ReplyItem.propTypes = {
  replyID: PropTypes.string,
  date: PropTypes.string,
  replyText: PropTypes.string,
  authorName: PropTypes.string,
  isCorrectUser: PropTypes.bool,
  removeReply: PropTypes.func,
}

export default ReplyItem
