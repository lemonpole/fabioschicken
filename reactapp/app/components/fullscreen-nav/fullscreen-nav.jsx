import React, { Component } from 'react';
import './fullscreen-nav.scss';

export default class FullScreenNav extends Component {
  static defaultProps = {
    isOpen: false
  }

  renderNavItems = () => (
    React.Children.map( this.props.children, child => <li>{child}</li> )
  )

  render() {
    return (
      <nav className={this.props.isOpen && 'open'}>
        <ul>{this.renderNavItems()}</ul>
      </nav>
    );
  }
}
