import React from 'react'
import PropTypes from 'prop-types'

const AuthPromoForm = (props) => {
  const {
    name,
    email,
    currentUserID,
    hasPromo,
    promoCode,
    logout,
    toggleAuthPopup,
    handlePromoSubmit,
    handleChange,
  } = props;

  return (
    <div className='popup'>
      <div className='popup_inner'>
        <h1> AuthPromoForm </h1>

        <div> NAME: {name} </div>
        <div> EMAIL: {email} </div>
        <div> ID: {currentUserID} </div>
        <div> HasPromo: {hasPromo.toString()} </div>

        <div>
          <button onClick={logout} className="button"> Log out </button>

          <button onClick={toggleAuthPopup}> Close </button>

          <br/>

          <form onSubmit={handlePromoSubmit}>
            <input
              type="text"
              name="promoCode"
              id="promoCode"
              value={promoCode}
              onChange={handleChange}
            />
            <button type="submit">Enter Promo</button>
          </form>
        </div>
      </div>
    </div>
  )
}

AuthPromoForm.propTypes = {
  currentUserID: PropTypes.string,
  email: PropTypes.string,
  handleChange: PropTypes.func,
  handlePromoSubmit: PropTypes.func,
  hasPromo: PropTypes.bool,
  logout: PropTypes.func,
  name: PropTypes.string,
  promoCode: PropTypes.string,
  toggleAuthPopup: PropTypes.func,
}

export default AuthPromoForm
