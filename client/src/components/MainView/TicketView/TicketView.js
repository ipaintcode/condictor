import React, { Component } from 'react';
import './TicketView.css';
import HorizontalTab from '../../resuable/HorizontalTab';
import Form from './Form/Form';

class TicketView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'new',
    };
    this.newClick = this.newClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  newClick() {
    this.setState({ activeTab: 'new' });
  }

  searchClick() {
    this.setState({ activeTab: 'search' });
  }


  render() {
    return (
      <div className="TicketView">
        <HorizontalTab title="New" onClick={this.newClick} />
        <HorizontalTab title="Search" onClick={this.searchClick} />
        <Form activeTab={this.state.activeTab} />
      </div>
    );
  }
}

export default TicketView;
