import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// TODO: get a fetch profile function set up and begin to initialize a profile state (action/reducer)

class MainContainer extends Component {
  render () {
    return (
      <div className="profile_main_container">

        <div className="profile_main_heading_container">
          <h3>Name: Braden</h3>
          <h3>Display Name: bradenaa</h3>
          <h4>Location: Los Angeles, CA</h4>
        </div>

        <div className="profile_main_stats_container">
          <div className="psoc_item">
            <h1>20</h1>
            <h3>Exchanges</h3>
          </div>
          <div className="pmsc_item">
            <h1>20</h1>
            <h3>Reviews</h3>
          </div>
          <div className="pmsc_item">
            <h1>20</h1>
            <h3>Posts</h3>
          </div>
          <div className="pmsc_item">
            <h1>20</h1>
            <h3>Upvotes</h3>
          </div>
        </div>

        <div className="profile_main_languages_container">
          <h2>List of languages</h2>
          <button>Add more languages</button>
        </div>

        <div className="profile_main_exchanges_container">
          <div className="pfec_item">
            <h1>Item 1</h1>
          </div>
          <div className="pfec_item">
            <h1>Item 2</h1>
          </div>
          <button> See More </button>
        </div>

        <div className="profile_main_reviews_container">
          <div className="pfec_item">
            <h1>Item 1</h1>
          </div>
          <div className="pfec_item">
            <h1>Item 2</h1>
          </div>
          <button> See More </button>
        </div>

        <div className="profile_main_posts_container">
          <div className="pfec_item">
            <h1>Item 1</h1>
          </div>
          <button> See More </button>
        </div>

        <div className="profile_main_upvotes_container">
          <div className="pfec_item">
            <h1>Item 1</h1>
          </div>
          <button> See More </button>
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
)(MainContainer)
