import React from 'react';
import PropTypes from 'prop-types'
import DiscussionItem from './DiscussionItem'

const DiscussionList = (props) => {

  const { discussionsArr, removeDiscussion, currentUser } = props;

  console.log("The discussionList rendered", discussionsArr);
  console.log("----------------------------------------")

  let discussionList = discussionsArr.map( d => {
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
  currentUser: PropTypes.object,
  discussionsArr: PropTypes.array,
  fetchDiscussions: PropTypes.func,
  removeDiscussion: PropTypes.func,
}

export default DiscussionList;
