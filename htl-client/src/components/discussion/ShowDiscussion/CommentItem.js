import React from 'react'
import PropTypes from 'prop-types'

const CommentItem = (props) => {
  const { authorName, date, id, text, isCorrectUser, removeComment } = props;

  return(
    <div className='comment_item'>
      <h2>By: {authorName} </h2>
      <h3>On: { date } </h3>
      <h4> { text } </h4>
      <h6>id:  { id } </h6>

      { isCorrectUser && (<button onClick={removeComment}> DELETE </button>) }

    </div>
  )
}

CommentItem.propTypes = {
  authorName: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
  isCorrectUser: PropTypes.bool,
  removeComment: PropTypes.func,
}

export default CommentItem
