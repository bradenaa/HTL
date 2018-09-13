import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReplyForm from '../../../components/discussion/ShowDiscussion/ReplyForm'
import { postNewReplyToComment } from '../../../store/actions/discussions'

class ReplyFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = { replyText: ''}
  }

  static propTypes = {
    postNewReplyToComment: PropTypes.func,
    commentID: PropTypes.string,
  }

  handleNewReply = e => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.props.commentID);
    this.props.postNewReplyToComment(this.props.commentID, this.state);
    this.setState({ replyText: ''})
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { replyText } = this.state;

    return (
      <ReplyForm
        replyText={replyText}
        handleChange={this.handleChange}
        handleNewReply={this.handleNewReply}
      />
    )
  }
}

export default connect(null, { postNewReplyToComment })(ReplyFormContainer)
