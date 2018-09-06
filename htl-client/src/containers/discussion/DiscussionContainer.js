import { connect } from 'react-redux';
import Discussions from '../../components/discussion/Discussions'
import { postNewDiscussion, fetchDiscussions, removeDiscussion } from '../../store/actions/discussions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  console.log("DiscussionContainer - STATE");
  console.log(state);

  return {
    ...state,
    discussions: state.discussions,
    currentUser: state.currentUser.user,
  }
}

export default withRouter(connect(
  mapStateToProps,
  { fetchDiscussions, postNewDiscussion, removeDiscussion }
)(Discussions))
