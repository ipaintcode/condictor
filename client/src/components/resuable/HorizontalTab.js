import React, { Component } from 'react';
import './HorizontalTab.css';

class HorizontalTab extends Component {
  render() {
    return (
      <div className="HorizontalTab">
        <button onClick={this.props.onClick}>{this.props.title}</button>
      </div>
    );
  }
}

HorizontalTab.defaultProps = {
  title: 'Tab',
};

HorizontalTab.propTypes = {
  title: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired,
};

export default HorizontalTab;
