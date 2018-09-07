import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDiscussions, removeDiscussion } from '../../store/actions/discussions';
import DiscussionList from '../../components/discussion/DiscussionList'

//TODO: Find the best way to pass helper functions down as props - COMPLETED
//TODO: Look into the best way to handle TODOS in the future
//TODO: Write PropTypes for explicitness. Maybe start to setup TypeScript

class DiscussionListContainer extends Component {

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
  // console.log("DiscussionContainer - STATE");
  // console.log(state);
  return {
    ...state,
    discussions: state.discussions,
    currentUser: state.currentUser.user,
  }
}

export default connect(mapStateToProps, { fetchDiscussions, removeDiscussion })(DiscussionListContainer)
