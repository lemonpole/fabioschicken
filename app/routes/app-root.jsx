import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimatedBurgerIcon from '../components/animated-burger-icon';
import FullScreenNav from '../components/fullscreen-nav';

export default class AppRoot extends Component {
  state = {
    navToggled: false
  }

  handleBurgerClick = () => {
    this.setState({ navToggled: !this.state.navToggled });
  }

  handleLinkClick = () => {
    this.setState({ navToggled: false });
  }

  render() {
    return (
      <div>
        <FullScreenNav isOpen={this.state.navToggled}>
          <Link to="/" onClick={this.handleLinkClick}>Home</Link>
          <Link to="/menu" onClick={this.handleLinkClick}>Menu</Link>
        </FullScreenNav>
        <AnimatedBurgerIcon
          type="abi-1"
          isToggled={this.state.navToggled}
          onClick={this.handleBurgerClick}
          containerStyle={{
            position: 'absolute', top: 20, right: 20,
            zIndex: 10
          }}
          barStyle={{
            background: '#e7e7e7',
            height: '3px'
          }}
        />
        {this.props.children}
      </div>
    );
  }
}