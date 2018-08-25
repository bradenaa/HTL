import React, { Component } from 'react';
import { fetchOneDiscussion, postNewCommentToDiscussion,  } from '../store/actions/discussions';
import { removeError } from '../store/actions/errors';
import { connect } from 'react-redux';
import CommentList from '../containers/CommentList'
import CommentForm from '../containers/CommentForm'


class ShowDiscussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentForm: false,
    }
  }

  togglePopup = e => {
    e.preventDefault();
    this.setState({
      showCommentForm: !this.state.showCommentForm
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.props.fetchOneDiscussion(this.props.currentUser.user.id, this.props.match.params.discussionID);
  }

  render() {

  const { match, foundDiscussion, currentUser } = this.props;


  // console.log("foundDiscussion", foundDiscussion);
  // console.log("foundDiscussionC", foundDiscussion.comments)

    return (
      <div>
        <h1>{foundDiscussion.title}</h1>
        <h2>{foundDiscussion.post}</h2>
        <div>
          <button onClick={this.togglePopup}>Leave a Comment</button>
        </div>

        <div className="popup_container">
          {
            this.state.showCommentForm ?
              <CommentForm
                closePopup={this.togglePopup}
                postNewComment={postNewCommentToDiscussion}
                currentUser={currentUser}
                handleChange={this.handleChange}
                discussionID={foundDiscussion._id}
                removeError={removeError}
              />
            : null
          }
        </div>

        <CommentList
          foundDiscussion={foundDiscussion}
          currentUser={currentUser}
          removeError={removeError}
        />

      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    foundDiscussion: state.oneDiscussion,
    errors: state.errors
  };
}

export default connect(mapStateToProps, { fetchOneDiscussion })(ShowDiscussion);
