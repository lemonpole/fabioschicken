import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Sample = () => (
  <Grid>
    <Row>
      <Col xs={6} md={3}>
        <RaisedButton label="Default" />
      </Col>
    </Row>
  </Grid>
);

const App = () => (
  <MuiThemeProvider>
    <Sample />
  </MuiThemeProvider>
);

render( <App />, document.getElementById( 'app' ) );
