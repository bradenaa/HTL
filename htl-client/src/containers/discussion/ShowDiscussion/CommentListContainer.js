import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentList from '../../../components/discussion/ShowDiscussion/CommentList'
import CreateCommentFormContainer from './CreateCommentFormContainer'
import { toggleCommentForm } from '../../../store/actions/discussions'

class CommentListContainer extends Component {


  render() {

    // console.log("CommentListContainer PROPS:")
    // console.log(this.props);
    // console.log("---------------------------");

    const { showCommentForm, toggleCommentForm } = this.props;

    return(
      <div>
        <button id="loginButton" onClick={this.props.toggleCommentForm}>Leave a Comment</button>

        <div className="popup_container">
          { showCommentForm ? <CreateCommentFormContainer /> : null}
        </div>

        <CommentList
          
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("state in CommentListContainer:", state)
  return {
    showCommentForm: state.oneDiscussion.showCommentForm,
    // comments: state.oneDiscussion.comments
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleCommentForm: () => dispatch(toggleCommentForm())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)
