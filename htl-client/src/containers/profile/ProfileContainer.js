import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ProfileContainer extends Component {
  render() {
    return(
      <div>Profile Container</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect()(ProfileContainer)
