import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth (ComponentToBeRendered, ...props) {
  class Authenticate extends Component {
    // When everything renders, we want to make sure that the user is logged in
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/");
      };
    };
    // If anything changes in terms of state or props,
    // then we want to make sure to check if the user is still authenticated.
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push("/");
      };
    };

    render() {
      console.log("authenticated!")
      // console.log(...props);
      return <ComponentToBeRendered {...props} />;
    };
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    };
  };

  return connect(mapStateToProps)(Authenticate);
}
