import React from 'react';
import { Route } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AnimatedBurgerIcon from '../components/animated-burger-icon';

const AppRoot = ( props ) => (
  <div>
    <AnimatedBurgerIcon barStyles={{ background: '#ff0000', height: '3px' }} /><br />
    <AnimatedBurgerIcon type="abi-2" /><br />
    <AnimatedBurgerIcon type="abi-3" /><br />
    <AnimatedBurgerIcon type="abi-4" />
    {props.childen}
  </div>
);

const App = () => (
  <MuiThemeProvider>
    <AppRoot />
  </MuiThemeProvider>
);

export default (
  <Route path="/" component={App} />
);