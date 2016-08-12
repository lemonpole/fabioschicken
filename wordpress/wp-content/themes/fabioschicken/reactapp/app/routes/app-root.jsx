import React, { Component } from 'react';
import AnimatedBurgerIcon from '../components/animated-burger-icon';

export default class AppRoot extends Component {
  handleBurgerClick = ( isToggled ) => {
  }

  render() {
    return (
      <div>
        <AnimatedBurgerIcon
          type="abi-1"
          onClick={this.handleBurgerClick}
          containerStyle={{
            position: 'absolute', top: 20, right: 20
          }}
          barStyle={{
            background: '#e7e7e7',
            height: '9px'
          }}
        />
        {this.props.childen}
      </div>
    );
  }
}