import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeDiscussion, fetchDiscussions } from '../../store/actions/discussions';
import DiscussionList from '../../components/discussion/DiscussionList'

class DiscussionsListContainer extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    discussions: PropTypes.array,
    fetchDiscussions: PropTypes.func,
    removeDiscussion: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchDiscussions();
  }

  render() {
    const { currentUser, discussions, fetchDiscussions, removeDiscussion } = this.props;
    return(
      <DiscussionList
        currentUser={currentUser}
        discussions={discussions}
        removeDiscussion={removeDiscussion}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    discussions: state.discussions.discussions,
    currentUser: state.currentUser.userInfo,
  }
}

export default connect(mapStateToProps, { removeDiscussion, fetchDiscussions })(DiscussionsListContainer)
