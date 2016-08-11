import React, { Component } from 'react';
import './animated-burger-icon.scss';

const numSpans = {
  'abi-1': 3,
  'abi-2': 6,
  'abi-3': 4,
  'abi-4': 3
};

// https://codepen.io/designcouch/pen/Atyop
export default class AnimatedBurgerIcon extends Component {
  state = {
    toggled: false
  }

  static defaultProps = {
    type: 'abi-1',
    containerStyle: {},
    barStyle: {}
  }

  handleOnClick = () => {
    this.setState({ toggled: !this.state.toggled });
  }

  renderBars = () => {
    const num = numSpans[this.props.type];
    const output = [];

    for( let i = 0; i < num; i++ ) {
      output.push( <span key={i} style={this.props.barStyle} /> );
    }

    return output;
  }

  render() {
    return (
      <div
        id={this.props.type}
        className={this.state.toggled && 'open'}
        style={this.props.containerStyle}
        onClick={this.handleOnClick}
      >
        {this.renderBars()}
      </div>
    );
  }
}