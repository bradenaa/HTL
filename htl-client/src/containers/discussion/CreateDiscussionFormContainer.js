import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewDiscussion, toggleDiscussionForm } from '../../store/actions/discussions'
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
    // debugger;
    e.preventDefault();
    this.props.postNewDiscussion(this.state);
    // debugger;
    this.setState({
      title: '',
      post: '',
      tags: []
    });
    // debugger;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { title, post } = this.state;
    const { toggleDiscussionForm } = this.props;

    return (
      <CreateDiscussionForm
        handleNewDiscussion={this.handleNewDiscussion}
        toggleDiscussionForm={toggleDiscussionForm}
        handleChange={this.handleChange}
        title={title}
        post={post}
      />
    );
  };
}


export default connect(null, { postNewDiscussion, toggleDiscussionForm })(CreateDiscussionFormContainer);
