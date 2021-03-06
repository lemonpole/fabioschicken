import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getBloginfo } from 'modules/bloginfo/actions';
import { getFoods } from 'modules/foods/actions';
import AnimatedBurgerIcon from 'components/animated-burger-icon';
import FullScreenNav from 'components/fullscreen-nav';

import { Home, Menu } from 'routes';

class App extends Component {
  state = {
    navToggled: false
  }

  componentDidMount() {
    this.props.dispatch( getBloginfo() );
    this.props.dispatch( getFoods() );
  }

  handleBurgerClick = () => {
    this.setState({ navToggled: !this.state.navToggled });
  }

  handleLinkClick = () => {
    this.setState({ navToggled: false });
  }

  render() {
    return (
      <BrowserRouter>
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
              position: 'absolute', top: 20, right: 20, // eslint-disable-line
              zIndex: 10
            }}
            barStyle={{
              background: '#e7e7e7',
              height: '3px'
            }}
          />
          <Route exact path="/" component={Home} />
          <Route path="/menu" component={Menu} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()( App );
