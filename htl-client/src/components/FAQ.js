import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const FAQ = ({ currentUser }) => {
  return (
    <div className="container">
      <h1>FAQ PAGE!</h1>
      <Link to="/">
        Go back
      </Link>
    </div>
  )
}

export default FAQ;
