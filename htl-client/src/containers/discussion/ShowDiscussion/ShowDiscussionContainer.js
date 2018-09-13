import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneDiscussion } from '../../../store/actions/discussions'
import PostDisplay from '../../../components/discussion/ShowDiscussion/PostDisplay'
import CommentListContainer from './CommentListContainer'

// TODO: populate (from backend) the oneDiscussion userCreated key
// TODO: See if there is a way to make component render wait until it has the right props before rendering. Currently rendering prior to receiving new state change due to the API call for data.
// TODO: write tests for components to see if they are rendering once before getting the props you want via redux state after the backend request

class ShowDiscussionContainer extends Component {
  static propTypes = {
    currentUserID: PropTypes.string,
    params: PropTypes.object,
    oneDiscussion: PropTypes.object,
    fetchDiscussions: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchOneDiscussion(this.props.currentUserID, this.props.params.discussionID);
  }

  render() {
    const { title, post, date, userCreated } = this.props.oneDiscussion;

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
    currentUserID: state.currentUser.userInfo.id,
    oneDiscussion: {...state.oneDiscussion}
  }
}

const mapDispatchToProps = (dispatch) => ({
    fetchOneDiscussion: (currenUserID, discussionID) => dispatch(fetchOneDiscussion(currenUserID, discussionID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDiscussionContainer)
