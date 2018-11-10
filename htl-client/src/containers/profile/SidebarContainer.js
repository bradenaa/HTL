import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditProfileContainer from './EditProfileContainer'

class SidebarContainer extends Component {
  static propTypes = {
    isCorrectUser: PropTypes.bool,
  }

  render () {
    console.log("SidebarContainer PROPS - ", this.props);
    return (
      <div className="profile_sidebar_container">
        <div className="profile_sidebar_top">
          <img src="https://source.unsplash.com/eYwn81sPkJ8" alt=""/>

          <button>Edit Profile</button>

          <h2>User's tag line</h2>
        </div>

        <div className="profile_social_links_container">
          <h4>FB</h4>
          <h4>IG</h4>
          <h4>LI</h4>
          <h4>TT</h4>
        </div>

        <div className="profile_interests_container">
          <div>
            <h2>My Interests: </h2>
          </div>
          <div>
            <span>Tacos, </span>
            <span>Tacos, </span>
            <span>Tacos, </span>
            <span>Tacos, </span>
          </div>
        </div>
        
        <div className="profile_connections_container">
          <div>
            <h2>Connections:</h2>
          </div>
          <div>
            <div>
              <span>- Person1 -</span>
              <span>- Person2 -</span>
              <span>- Person3 -</span>
            </div>
            <div>
              <span>- Person4 -</span>
              <span>- Person5 -</span>
              <span>- Person6 -</span>
            </div>
          </div>
          <div>
            <button>See All</button>
          </div>

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(
  mapStateToProps
)(SidebarContainer)
