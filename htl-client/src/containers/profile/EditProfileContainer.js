import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class EditProfileContainer extends Component {


  render() {
    return(
      <div className="profile_edit_container">

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(
  mapStateToProps,
)(EditProfileContainer)
