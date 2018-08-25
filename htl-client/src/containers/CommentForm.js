import React, { Component } from 'react';
import { postNewCommentToDiscussion } from '../store/actions/discussions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  };

  handlNewComment = e => {
    e.preventDefault();
    this.props.postNewCommentToDiscussion(this.props.discussionID, this.state);
    this.setState({
      text: '',
    });
    // this.props.history.push(`/discussion/${this.props.discussionID}`);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { text } = this.state;
    const { history, removeError, closePopup } = this.props;




    // if there is any change to route then we will call removeError
    // This will happen before anything is returned
    // TODO: getting a type error related to the 'listen', not sure what it is yet
    history.listen(() => {
      // debugger;
      removeError();
    })

    return (

      <div className='popup'>
        <div className="popup_inner">

          <h1>Comment Form</h1>

          <form onSubmit={this.handlNewComment}>
            {this.props.errors.message && (
              <div>
                {this.props.errors.message}
              </div>
            )}
            <label htmlFor="text">Text</label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
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

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, { postNewCommentToDiscussion })(CommentForm));
