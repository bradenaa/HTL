import React from 'react';
import PropTypes from 'prop-types'

const PostDisplay = (props) => {
  const {title, post, date, userCreated } = props;

  return (
    <div>
      <h1>{title}</h1>
      <h2>{post}</h2>
      <h3>By: {userCreated}</h3>
      <h3>On: {date}</h3>
    </div>
  )
}

PostDisplay.propTypes = {
  title: PropTypes.string,
  post: PropTypes.string,
  date: PropTypes.string,
  userCreated: PropTypes.string,
}

export default PostDisplay;
