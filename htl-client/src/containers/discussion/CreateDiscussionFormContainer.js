import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewDiscussion } from '../../store/actions/discussions'
import CreateDiscussionForm from '../../components/discussion/CreateDiscussionForm'

class CreateDiscussionFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      post: '',
      tags: []
    }
  };

  handleNewDiscussion = e => {
    debugger;
    e.preventDefault();
    this.props.postNewDiscussion(this.state);
    debugger;
    this.setState({
      title: '',
      post: '',
      tags: []
    });
    debugger;
    this.props.closePopup(e);
    debugger;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { closePopup } = this.props;
    const { title, post } = this.state;

    console.log('CreateDiscussionFormContainer Rendered');

    return (
      <CreateDiscussionForm
        handleNewDiscussion={this.handleNewDiscussion}
        handleChange={this.handleChange}
        closePopup={closePopup}
        title={title}
        post={post}
      />
    );
  };
}


export default connect(null, { postNewDiscussion })(CreateDiscussionFormContainer);
