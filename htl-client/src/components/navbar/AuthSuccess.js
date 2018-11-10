import React from 'react'
import PropTypes from 'prop-types'

const AuthSuccess = (props) => {
  const { name, email, currentUserID, hasPromo, logout, toggleAuthPopup} = props;

  return(
    <div className='popup'>
      <div className='popup_inner'>
        <h1> AuthSuccess </h1>

        <div> NAME: {name} </div>
        <div> EMAIL: {email} </div>
        <div> ID: {currentUserID} </div>
        <div> HasPromo: {hasPromo.toString()} </div>

        <div>
          <button onClick={logout} className="button"> Log out </button>
          <button onClick={toggleAuthPopup}> Close </button>
        </div>
      </div>
    </div>
  )
}

AuthSuccess.propTypes = {
  currentUserID: PropTypes.string,
  email: PropTypes.string,
  hasPromo: PropTypes.bool,
  logout: PropTypes.func,
  name: PropTypes.string,
  toggleAuthPopup: PropTypes.func,
}

export default AuthSuccess
