import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { logout } from '../../actions';
import './Logout.css';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.doLogout = this.doLogout.bind(this);
  }

  doLogout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <button className="Logout btn btn-outline-colorize" onClick={this.doLogout}>Logout</button>
    );
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func,
};

Logout.defaultProps = {
  dispatch: () => {},
};
