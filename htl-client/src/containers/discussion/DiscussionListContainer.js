import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeDiscussion, fetchDiscussions } from '../../store/actions/discussions';
import DiscussionList from '../../components/discussion/DiscussionList'

class DiscussionListContainer extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    discussionsArr: PropTypes.array,
    fetchDiscussions: PropTypes.func,
    removeDiscussion: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchDiscussions();
  }

  render() {
    return(
      <DiscussionList
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    discussionsArr: state.discussions.discussionsArr,
    currentUser: state.currentUser.user,
  }
}

export default connect(mapStateToProps, { removeDiscussion, fetchDiscussions })(DiscussionListContainer)
