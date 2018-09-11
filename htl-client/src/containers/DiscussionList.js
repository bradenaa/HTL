import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDiscussions, removeDiscussionAndDispatch } from '../store/actions/discussions';
import DiscussionItem from '../components/DiscussionItem';

//
class DiscussionList extends Component {

  componentDidMount() {
    this.props.fetchDiscussions();
  }

  render() {
    const { discussions, removeDiscussionAndDispatch, currentUser } = this.props;

    let discussionList = discussions.map( e => {

      return (
        <DiscussionItem
          removeDiscussion={removeDiscussionAndDispatch.bind(this, e.userCreated._id, e._id)}
          key={e._id}
          postID={e._id}
          date={e.date}
          title={e.title}
          post={e.post}
          userCreated={e.userCreated}
          isCorrectUser={currentUser === e.userCreated._id}
        />
      )
    });

    return (
      <div>
        <ul>
          <h1>The List: </h1>
          {discussionList.length ? discussionList : <div>Waiting for discussions...</div>}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.userInfo.id,
    discussions: state.discussions
  }
}

export default connect(mapStateToProps, { fetchDiscussions, removeDiscussionAndDispatch })(DiscussionList);
