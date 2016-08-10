import React from 'react';
import { render } from 'react-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

const App = () => (
  <Grid>
    <Row>
      <Col xs={6} md={3}>Hello, World!</Col>
    </Row>
  </Grid>
);

render( <App />, document.getElementById( 'app' ) );
