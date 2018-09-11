import React from 'react';
import PropTypes from 'prop-types'

const CreateDiscussionForm = (props) => {

  const { title, post, toggleDiscussionForm, handleChange, handleNewDiscussion } = props;

  // console.log("CreateDiscussionForm")

  return (

    <div className='popup'>
      <div className="popup_inner">

        <h1>DISCUSSION POST FORM!</h1>

        <form onSubmit={handleNewDiscussion}>
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
            onChange={handleChange}
          />
          <label htmlFor="post">Post</label>
          <input
            type="text"
            name="post"
            value={post}
            onChange={handleChange}
          />
          <button type="submit">
            Add New Post!
          </button>
          <button onClick={toggleDiscussionForm}>Close</button>
        </form>

      </div>
    </div>
  );
};

CreateDiscussionForm.propTypes = {
  toggleDiscussionForm: PropTypes.func,
  handleChange: PropTypes.func,
  handleNewDiscussion: PropTypes.func,
}



export default CreateDiscussionForm;
