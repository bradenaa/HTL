import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SidebarContainer from './SidebarContainer'
import MainContainer from './MainContainer'
import { fetchProfile } from '../../store/actions/profile'

class ProfileContainer extends Component {
  static propTypes = {
    isCorrectUser: PropTypes.bool,
  }

  componentDidMount() {
    this.props.fetchProfile(this.props.params.userID);
  }

  render() {
    const { isCorrectUser } = this.props;
    return(
      <div className="profile_background">
        <div className="profile_container">

          <SidebarContainer
            isCorrectUser={isCorrectUser}
          />

          <MainContainer />


        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("ProfileContainer state:", state);
  return {
    isCorrectUser: state.currentUser.userInfo._id === ownProps.params.userID
  }
}

export default connect(
  mapStateToProps,
  { fetchProfile }
)(ProfileContainer)
