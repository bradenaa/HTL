import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneDiscussion } from '../../../store/actions/discussions'
import PostDisplay from '../../../components/discussion/ShowDiscussion/PostDisplay'
import CommentListContainer from './CommentListContainer'

// TODO: populate (from backend) the showDiscussion userCreated key
// TODO: See if there is a way to make component render wait until it has the right props before rendering. Currently rendering prior to receiving new state change due to the API call for data.
// TODO: write tests for components to see if they are rendering once before getting the props you want via redux state after the backend request
// TODO: make it so that only one ReplyForm can be showing at any given time in a comment list

class ShowDiscussionContainer extends Component {
  static propTypes = {
    currentUserID: PropTypes.string,
    params: PropTypes.object,
    showDiscussion: PropTypes.object,
    fetchDiscussions: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchOneDiscussion(this.props.currentUserID, this.props.params.discussionID);
  }

  render() {
    const { title, post, date, userCreated } = this.props.showDiscussion;

    return (
      <div>
        <PostDisplay
          title={title}
          post={post}
          date={date}
          userCreated={userCreated}
        />

        <CommentListContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state:", state)
  return {
    currentUserID: state.currentUser.userInfo._id,
    showDiscussion: {...state.showDiscussion}
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchOneDiscussion: (currenUserID, discussionID) => dispatch(fetchOneDiscussion(currenUserID, discussionID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDiscussionContainer)
