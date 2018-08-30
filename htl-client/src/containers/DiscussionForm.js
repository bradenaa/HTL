import React, { Component } from 'react';
import { postNewDiscussion } from '../store/actions/discussions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



class DiscussionForm extends Component {
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
    this.props.history.push('/discussion');

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { title, post } = this.state;
    const { history, removeError } = this.props;

    // if there is any change to route then we will call removeError
    // This will happen before anything is returned
    // TODO: getting a type error related to the 'listen', not sure what it is yet
    // history.listen(() => {
    //   removeError();
    // })

    return (

      <div className='popup'>
        <div className="popup_inner">

          <h1>DISCUSSION POST FORM!</h1>

          <form onSubmit={this.handleNewDiscussion}>
            {this.props.errors.message && (
              <div>
                {this.props.errors.message}
              </div>
            )}
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
            <button onClick={this.props.closePopup}>Close</button>
          </form>

        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, { postNewDiscussion })(DiscussionForm));
