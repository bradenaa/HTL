import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
* Higher Order Component that accepts a component to be rendered
* Renders that component only if authenticated and only if user has submitted a promoCode
* If props change at anypoint, componentWillUpdate will check against previous props
* @param {Component} ComponentToBeRendered any component
**/

export default function withAuth (ComponentToBeRendered) {
  class Authenticate extends Component {

    componentWillMount() {
      if (!this.props.isAuthenticated || !this.props.hasPromo) {
        this.props.history.push("/");
      };
    };
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated || !this.props.hasPromo) {
        this.props.history.push("/");
      };
    };

    render() {
      // console.log(this.props);
      return (
       <ComponentToBeRendered
         params={this.props.match.params}
       />
      )
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
