import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleDiscussionForm } from '../../store/actions/discussions';
import CreateDiscussionFormContainer from './CreateDiscussionFormContainer'
import DiscussionListContainer from './DiscussionListContainer'

const DiscussionContainer = (props) => {

  const { showDiscussionForm, toggleDiscussionForm} = props;

  return (
    <div>
      <h1>Discussion List Component</h1>
      <div>
        <button id="loginButton" onClick={toggleDiscussionForm}>Create New Discussion</button>
      </div>
      <div className="popup_container">
        {
          showDiscussionForm ?
            <CreateDiscussionFormContainer /> : null
        }
      </div>

      <DiscussionListContainer />

    </div>
  )
}

DiscussionContainer.propTypes = {
  showDiscussionForm: PropTypes.bool,
  toggleDiscussionForm: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    showDiscussionForm: state.discussions.showDiscussionForm
  }
}

const mapDispatchToProps = (dispatch) => ({
    toggleDiscussionForm: () => dispatch(toggleDiscussionForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscussionContainer)
