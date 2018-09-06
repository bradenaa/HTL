import React, { Component } from 'react';

class CreateDiscussionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      post: '',
      tags: []
    }
  };

  handleNewDiscussion = e => {
    e.preventDefault();
    this.props.postNewDiscussion(this.state);
    this.setState({
      title: '',
      post: '',
      tags: []
    });
    this.props.closePopup(e);

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { closePopup } = this.props;
    const { title, post } = this.state;

    return (

      <div className='popup'>
        <div className="popup_inner">

          <h1>DISCUSSION POST FORM!</h1>

          <form onSubmit={this.handleNewDiscussion}>
            {/* {this.props.errors.message && (
              <div>
                {this.props.errors.message}
              </div>
            )} */}
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={this.handleChange}
            />
            <label htmlFor="post">Post</label>
            <input
              type="text"
              name="post"
              value={post}
              onChange={this.handleChange}
            />
            <button type="submit">
              Add New Post!
            </button>
            <button onClick={closePopup}>Close</button>
          </form>

        </div>
      </div>
    );
  };
}



export default CreateDiscussionForm;
