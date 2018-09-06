import React, { Component } from 'react'
import CreateDiscussionForm from './CreateDiscussionForm'
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

    const { showCreateDiscussionForm } = this.state;
    const { discussions, fetchDiscussions, postNewDiscussion, removeDiscussion, currentUser, } = this.props;


    return (
      <div>
        <h1>Discussion List Component</h1>
        <div>
          <button id="loginButton" onClick={this.toggleCreateForm}>Create New Discussion</button>
        </div>
        <div className="popup_container">
          {
            showCreateDiscussionForm ?
              <CreateDiscussionForm
                closePopup={this.toggleCreateForm}
                postNewDiscussion={postNewDiscussion}
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
