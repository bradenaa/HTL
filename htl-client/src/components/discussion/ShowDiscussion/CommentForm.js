import React from 'react'
import PropTypes from 'prop-types'

const CommentForm = (props) => {
  const { commentText, handleChange, toggleCommentForm, handleNewComment } = props;

  return (
    <div className='popup'>
      <div className="popup_inner">
        <h1>Comment Form</h1>

        <form onSubmit={handleNewComment}>
          {/* {this.props.errors.message && (
            <div>
              {this.props.errors.message}
            </div>
          )} */}

          <label htmlFor="commentText"> Text </label>

          <input
            type="text"
            name="commentText"
            id="commentText"
            value={commentText}
            onChange={handleChange}
          />

          <button type="submit"> Add New Post! </button>

          <button onClick={toggleCommentForm}> Close </button>
        </form>
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  commentText: PropTypes.string,
  handleChange: PropTypes.func,
  toggleCommentForm: PropTypes.func,
  handleNewComment: PropTypes.func,
}

export default CommentForm;
