import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const DiscussionItem = (props) => {
  const {
      removeDiscussion,
      date,
      title,
      post,
      userCreated,
      isCorrectUser,
      postID,
      upVotes,
      upVoteDiscussion,
      hasUserUpVoted,
      numberComments,
    } = props;

  return (
    <div>
      <li className="discussion-list-item">
        <Link to={`/discussion/${postID}`} >{title}</Link>
        <h3>By: {userCreated.displayName}</h3>
        <h4>Post: {post}</h4>
        <h4>PostID: {postID}</h4>
        <h4>Date: {date}</h4>

        { isCorrectUser && (<button onClick={removeDiscussion}> DELETE </button>) }
        <button onClick={upVoteDiscussion}> UpVote </button>

        <h4>
          UpVotes:
          <span style={hasUserUpVoted ? {color: "red"} : {color: "black"}}>
            { upVotes > 0 ? upVotes : 0 }
          </span>
        </h4>
        <h4>Comments: {numberComments}</h4>
      </li>
    </div>
  )
}

DiscussionItem.propTypes = {
  removeDiscussion: PropTypes.func,
  date: PropTypes.string,
  isCorrectUser: PropTypes.bool,
  post: PropTypes.string,
  postID: PropTypes.string,
  userCreated: PropTypes.string,
  upVotes: PropTypes.number,
  upVoteDiscussion: PropTypes.func,
  hasUserUpVoted: PropTypes.bool,
  numberComments: PropTypes.number,
}

export default DiscussionItem;
