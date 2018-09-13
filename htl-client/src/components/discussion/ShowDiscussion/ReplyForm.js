import React from 'react'
import PropTypes from 'prop-types'

const ReplyForm = (props) => {
  const { handleNewReply, replyText, handleChange } = props;

  return (
    <div>
      <h1> Reply Form </h1>

      <form onSubmit={handleNewReply}>
        {/* {this.props.errors.message && (
            <div>
          {this.props.errors.message}
            </div>
        )} */}

        <label htmlFor="replyText"> Text </label>

        <input
          type="text"
          name="replyText"
          id="replyText"
          value={replyText}
          onChange={handleChange}
        />

        <button type="submit"> Add New Post! </button>
      </form>
    </div>
  )
}

ReplyForm.propTypes = {
  handleNewReply: PropTypes.func,
  replyText: PropTypes.string,
  handleChange: PropTypes.func,
}

export default ReplyForm
