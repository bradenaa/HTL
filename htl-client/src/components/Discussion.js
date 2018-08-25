import React, { Component } from 'react';
import DiscussionList from '../containers/DiscussionList'
import DiscussionForm from '../containers/DiscussionForm'
import { postNewDiscussion, fetchDiscussions, removeDiscussion } from '../store/actions/discussions';


// The main discussion component that returns a list of discussions and a way to toggle a form to make a new discussion
class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupForm: false
    }
  };

  togglePopup = e => {
    e.preventDefault();
    this.setState({
      showPopupForm: !this.state.showPopupForm
    });
  }

  render() {
    
    return (
      <div>
        <h1>Discussion Page</h1>
        <div>
          <button id="loginButton" onClick={this.togglePopup}>NEW POST!</button>
        </div>
        <div className="popup_container">
          {
            this.state.showPopupForm ?
              <DiscussionForm
                closePopup={this.togglePopup}
                postNewDiscussion={postNewDiscussion}
              />
            : null
          }
        </div>
        <DiscussionList
          fetchDiscussions={fetchDiscussions}
          removeDiscussion={removeDiscussion}
        />
      </div>
    )
  }
}

export default Discussion;