import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimatedBurgerIcon from '../components/animated-burger-icon';
import FullScreenNav from '../components/fullscreen-nav';

export default class AppRoot extends Component {
  state = {
    navToggled: false
  }

  handleBurgerClick = ( navToggled ) => {
    this.setState({ navToggled });
  }

  render() {
    return (
      <div>
        <FullScreenNav isOpen={this.state.navToggled}>
          <Link to="/">Home</Link>
        </FullScreenNav>
        <AnimatedBurgerIcon
          type="abi-1"
          onClick={this.handleBurgerClick}
          containerStyle={{
            position: 'absolute', top: 20, right: 20,
            zIndex: 10
          }}
          barStyle={{
            background: '#e7e7e7',
            height: '9px'
          }}
        />
        {this.props.children}
      </div>
    );
  }
}