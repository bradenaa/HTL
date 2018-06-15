import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth (ComponentToBeRendered) {
  class Authenticate extends Component {
    // When everything renders, we want to make sure that the user is logged in
    componentWillMount() {
      if (!this.props.isAuthenticated || !this.props.hasPromo) {
        this.props.history.push("/");
      };
    };
    // If anything changes in terms of state or props,
    // then we want to make sure to check if the user is still authenticated.
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated || !this.props.hasPromo) {
        this.props.history.push("/");
      };
    };

    render() {
      // console.log("authenticated!")
      // console.log("props", this.props);
      return <ComponentToBeRendered {...this.props} />;
    };
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated,
      hasPromo: state.currentUser.hasPromo
    };
  };

  return connect(mapStateToProps)(Authenticate);
}
