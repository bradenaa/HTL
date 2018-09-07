import React from 'react';

const CreateDiscussionForm = (props) => {
  
  const { title, post, closePopup, handleChange, handleNewDiscussion } = props;

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
          <button onClick={closePopup}>Close</button>
        </form>

      </div>
    </div>
  );
};



export default CreateDiscussionForm;
