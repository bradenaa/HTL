import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneDiscussion } from '../../../store/actions/discussions'
import PostDisplay from '../../../components/discussion/ShowDiscussion/PostDisplay'
import CommentListContainer from './CommentListContainer'

// TODO: populate (from backend) the oneDiscussion userCreated key
// TODO: See if there is a way to make component render wait until it was the right props before rendering. Currently rendering prior to receiving new state change due to the API call for data.
// TODO: write up propTypes

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
    // console.log("ShowDiscussionContainer PROPS:");
    // console.log(this.props);
    const { title, post, date, userCreated } = this.props.oneDiscussion;

    return (
      <div>
        <PostDisplay
          title={title}
          post={post}
          date={date}
          userCreated={userCreated}
        />
        <CommentListContainer

        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
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
