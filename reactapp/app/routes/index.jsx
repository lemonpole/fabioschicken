import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppRoot from './app-root';
import Home from './home';
import Menu from './menu';

const App = ( props ) => (
  <MuiThemeProvider>
    <AppRoot children={props.children} />
  </MuiThemeProvider>
);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="menu" component={Menu} />
  </Route>
);