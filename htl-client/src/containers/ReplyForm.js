import React, { Component } from 'react';
import { postNewReplyToComment } from '../store/actions/discussions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



class ReplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  };

  handlNewReply = e => {
    e.preventDefault();
    this.props.postNewReplyToComment(this.props.commentID, this.state);
    this.setState({
      text: '',
    });
    this.props.handleReplySubmit(e);
    // this.props.history.push(`/discussion/${this.props.discussionID}`);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { text } = this.state;
    const { history, removeError, commentID, handleReplySubmit } = this.props;




    // if there is any change to route then we will call removeError
    // This will happen before anything is returned
    // TODO: getting a type error related to the 'listen', not sure what it is yet
    history.listen(() => {
      // debugger;
      removeError();
    })

    return (

      <div>
        <h1>Reply Form</h1>

        <form onSubmit={this.handlNewReply}>
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
            Leave Reply
          </button>
        </form>
      </div>



    );
  };
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, { postNewReplyToComment })(ReplyForm));
