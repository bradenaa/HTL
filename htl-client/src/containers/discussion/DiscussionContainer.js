import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchDiscussions, removeDiscussion } from '../../store/actions/discussions';
import CreateDiscussionFormContainer from './CreateDiscussionFormContainer'
import DiscussionListContainer from './DiscussionListContainer'

class DiscussionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateDiscussionForm: false
    }
  };

  toggleCreateForm = e => {
    e.preventDefault();
    this.setState({
      showCreateDiscussionForm: !this.state.showCreateDiscussionForm
    });
  }

  render() {
    // console.log("DiscussionsComponent - PROPS");
    // console.log(this.props);

    const { showCreateDiscussionForm } = this.state;
    const { discussions, fetchDiscussions, removeDiscussion, currentUser, } = this.props;

    console.log("Discussions Rendered", discussions);

    return (
      <div>
        <h1>Discussion List Component</h1>
        <div>
          <button id="loginButton" onClick={this.toggleCreateForm}>Create New Discussion</button>
        </div>
        <div className="popup_container">
          {
            showCreateDiscussionForm ?
              <CreateDiscussionFormContainer
                closePopup={this.toggleCreateForm}
              />
            : null
          }
        </div>
        <DiscussionListContainer
          discussions={discussions}
          fetchDiscussions={fetchDiscussions}
          removeDiscussion={removeDiscussion}
          currentUser={currentUser}
        />
      </div>
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

export default connect(
  mapStateToProps,
  { fetchDiscussions, removeDiscussion }
)(DiscussionContainer)
