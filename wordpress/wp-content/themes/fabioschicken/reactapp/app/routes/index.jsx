import React from 'react';
import { Route } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AnimatedBurgerIcon from '../components/animated-burger-icon';

const AppRoot = ( props ) => (
  <div>
    <AnimatedBurgerIcon />
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