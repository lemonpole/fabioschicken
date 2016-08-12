import React from 'react';
import { Route } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppRoot from './app-root';

const App = () => (
  <MuiThemeProvider>
    <AppRoot />
  </MuiThemeProvider>
);

export default (
  <Route path="/" component={App} />
);