import React from 'react';
import { Route } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AnimatedBurgerIcon from '../components/animated-burger-icon';

const AppRoot = ( props ) => (
  <div>
    <AnimatedBurgerIcon
      type="abi-1"
      containerStyle={{
        position: 'absolute', top: 20, right: 20
      }}
      barStyle={{
        background: '#e7e7e7',
        height: '5px'
      }}
    />
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