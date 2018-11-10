import React from 'react';
import PropTypes from 'prop-types'
import DiscussionItem from './DiscussionItem'

const DiscussionList = (props) => {
  const { discussions, removeDiscussion, currentUserID, upVoteDiscussion } = props;
  console.log(props);

  let discussionList = discussions.map( d => {
    return (
      <DiscussionItem
        key={d._id}
        postID={d._id}
        date={d.date}
        title={d.title}
        post={d.post}
        upVotes={d.upVotes.length}
        userCreated={d.userCreated.displayName}
        numberComments={d.comments.length}
        isCorrectUser={currentUserID === d.userCreated._id}
        upVoteDiscussion={upVoteDiscussion.bind(this, currentUserID, d._id)}
        removeDiscussion={removeDiscussion.bind(this, d.userCreated._id, d._id)}
        hasUserUpVoted={ d.upVotes.indexOf(currentUserID) !== -1 ? true : false }
      />
    )
  })

  return (
    <div>
      {discussionList.length ? discussionList : <div>Waiting for discussions...</div>}
    </div>
  )
}

DiscussionList.propTypes = {
  discussions: PropTypes.array,
  currentUserID: PropTypes.string,
  removeDiscussion: PropTypes.func,
  upVoteDiscussion: PropTypes.func,
}

export default DiscussionList;
