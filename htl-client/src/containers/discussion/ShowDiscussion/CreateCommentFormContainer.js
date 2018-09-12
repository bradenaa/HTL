import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleCommentForm, postNewCommentToDiscussion } from '../../../store/actions/discussions'
import CreateCommentForm from '../../../components/discussion/ShowDiscussion/CreateCommentForm'

class CreateCommentFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { commentText: '' }
  };

  static propTypes = {
    discussionID: PropTypes.string,
    postNewCommentToDiscussion: PropTypes.func,
    toggleCommentForm: PropTypes.func
  }

  handleNewComment = e => {
    e.preventDefault();
    this.props.postNewCommentToDiscussion(this.props.discussionID, this.state);
    this.setState({ commentText: '' });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render(){
    const { commentText } = this.state;
    const { toggleCommentForm } = this.props;

    return(
        <CreateCommentForm
          commentText={commentText}
          handleChange={this.handleChange}
          toggleCommentForm={toggleCommentForm}
          handleNewComment={this.handleNewComment}
        />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    discussionID: state.oneDiscussion._id
  }
}

export default connect(
  mapStateToProps,
  {
    toggleCommentForm,
    postNewCommentToDiscussion
  }
)(CreateCommentFormContainer)
