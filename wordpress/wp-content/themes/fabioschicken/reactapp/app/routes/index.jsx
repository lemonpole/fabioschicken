import React from 'react';
import { Route } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const AppRoot = ( props ) => (
  <div>
    <AppBar title="Fabio's Chicken" />
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