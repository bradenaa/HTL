import React, { Component } from 'react';
import DiscussionItem from './DiscussionItem'

class DiscussionList extends Component {


  //TODO: Find the best way to pass helper functions down as props
  //TODO: Look into the best way to handle TODOS in the future
  //TODO: Write PropTypes for explicitness. Maybe start to setup TypeScript

  componentDidMount() {
    this.props.fetchDiscussions();
  }

  render() {
    // console.log("DiscussionList - PROPS");
    // console.log(this.props);

    const { discussions, removeDiscussion, currentUser } = this.props;

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
}

export default DiscussionList;
