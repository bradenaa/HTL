import React, { Component } from 'react'
import CreateDiscussionFormContainer from '../../containers/discussion/CreateDiscussionFormContainer'
import DiscussionList from './DiscussionList'

class Discussions extends Component {
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
    console.log("Discussions Rendered");

    const { showCreateDiscussionForm } = this.state;
    const { discussions, fetchDiscussions, removeDiscussion, currentUser, } = this.props;

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
        <DiscussionList
          discussions={discussions}
          fetchDiscussions={fetchDiscussions}
          removeDiscussion={removeDiscussion}
          currentUser={currentUser}
        />
      </div>
    )
  }
}

export default Discussions;
