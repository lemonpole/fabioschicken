import React, { Component } from 'react';
import './animated-burger-icon.scss';

// https://codepen.io/designcouch/pen/Atyop
// TODO: provide props to specify which animation to use
export default class AnimatedBurgerIcon extends Component {
  state = {
    toggled: false
  }

  handleOnClick = () => {
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    return (
      <div
        id="animated-burger-icon"
        className={this.state.toggled && 'open'}
        onClick={this.handleOnClick}
      >
        <span />
        <span />
        <span />
      </div>
    );
  }
}