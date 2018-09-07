import React from 'react';
import DiscussionItem from './DiscussionItem'

const DiscussionList = (props) => {

  // console.log("DiscussionList - PROPS");
  // console.log(this.props);

  const { discussions, removeDiscussion, currentUser } = props;

  console.log("The discussionList rendered", discussions);
  console.log("----------------------------------------")

  //TODO: Find out why removeDiscussion is running twice when button is clicked on DiscussionItem
  let discussionList = discussions.map( d => {
    return (
        <DiscussionItem
          key={d._id}
          postID={d._id}
          date={d.date}
          title={d.title}
          post={d.post}
          userCreated={d.userCreated}
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

export default DiscussionList;
