import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

const styles = {
  lead: {
    display: 'block',
    fontSize: '1.1em',
    fontWeight: 'bold'
  }
};

const MenuItem = props => (
  <Row>
    <Col xs={9} md={10}>
      <span style={styles.lead}>{props.post_title}</span>
      <p style={{ marginTop: '5px' }}>{props.post_content}</p>
    </Col>
    <Col xs={3} md={2}>
      <code>{props.price}</code>
    </Col>
  </Row>
);

export default MenuItem;
