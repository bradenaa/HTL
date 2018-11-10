import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeDiscussion, fetchDiscussions, upVoteDiscussion } from '../../store/actions/discussions';
import DiscussionList from '../../components/discussion/DiscussionList'

// TODO: implement pagination or a continuous scroll loading for new discussions.
// TODO: implement a search filter

class DiscussionsListContainer extends Component {

  static propTypes = {
    currentUserID: PropTypes.string,
    discussions: PropTypes.array,
    fetchDiscussions: PropTypes.func,
    removeDiscussion: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchDiscussions();
  }

  render() {
    const { currentUserID, discussions, removeDiscussion, upVoteDiscussion } = this.props;

    return(
      <DiscussionList
        currentUserID={currentUserID}
        discussions={discussions}
        removeDiscussion={removeDiscussion}
        upVoteDiscussion={upVoteDiscussion}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    discussions: state.discussions.discussions,
    currentUserID: state.currentUser.userInfo._id,
  }
}

export default connect(mapStateToProps, { removeDiscussion, fetchDiscussions, upVoteDiscussion })(DiscussionsListContainer)
