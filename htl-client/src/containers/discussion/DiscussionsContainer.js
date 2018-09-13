import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleDiscussionForm } from '../../store/actions/discussions';
import DiscussionsFormContainer from './DiscussionsFormContainer'
import DiscussionsListContainer from './DiscussionsListContainer'

const DiscussionsContainer = (props) => {
  const { showDiscussionForm, toggleDiscussionForm} = props;

  return (
    <div>
      <h1> DiscussionsListContainer </h1>

      <button id="loginButton" onClick={toggleDiscussionForm}> Create New Discussion </button>

      <div className="popup_container">
        {
          showDiscussionForm ?
            <DiscussionsFormContainer /> : null
        }
      </div>

      <DiscussionsListContainer />
    </div>
  )
}

DiscussionsContainer.propTypes = {
  showDiscussionForm: PropTypes.bool,
  toggleDiscussionForm: PropTypes.func,
  params: PropTypes.object,
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
)(DiscussionsContainer)
