import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postNewDiscussion, toggleDiscussionForm } from '../../store/actions/discussions'
import CreateDiscussionForm from '../../components/discussion/CreateDiscussionForm'

class DiscussionsFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      post: '',
    }
  };

  static propTypes = {
    postNewDiscussion: PropTypes.func,
    toggleDiscussionForm: PropTypes.func,
  }

  handleNewDiscussion = e => {
    e.preventDefault();
    this.props.postNewDiscussion(this.state);
    this.setState({
      title: '',
      post: '',
    });
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


export default connect(
  null,
  { postNewDiscussion, toggleDiscussionForm }
)(DiscussionsFormContainer);
