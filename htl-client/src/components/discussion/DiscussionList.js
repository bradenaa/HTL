import React from 'react';
import PropTypes from 'prop-types'
import DiscussionItem from './DiscussionItem'

const DiscussionList = (props) => {
  const { discussions, removeDiscussion, currentUser } = props;
  console.log("PROPS - ", props);

  let discussionList = discussions.map( d => {
    return (
      <DiscussionItem
        key={d._id}
        postID={d._id}
        date={d.date}
        title={d.title}
        post={d.post}
        userCreated={d.userCreated.displayName}
        isCorrectUser={currentUser.id === d.userCreated._id}
        removeDiscussion={removeDiscussion.bind(this, d.userCreated._id, d._id)}
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
  currentUser: PropTypes.object,
  removeDiscussion: PropTypes.func,
}

export default DiscussionList;
