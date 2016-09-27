import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { MenuItem } from './menu';

const styles = {
  description: {
    margin: 0,
    marginBottom: '15px',
    fontStyle: 'italic'
  }
};

class DailyMenuContainer extends Component {
  renderMenuItems = ( items ) => (
    items.map( ( item, i ) => <MenuItem key={i} {...item} /> )
  )

  renderDays = ( day, i ) => (
    <Col xs={12} md={4} key={i}>
      <h2>{day}</h2>
      <p style={styles.description}>{this.props.children[ day ].description}</p>
      {this.renderMenuItems( this.props.children[ day ].children )}
    </Col>
  )

  render() {
    const daysofweek = Object.keys( this.props.children );

    return (
      <Row>
        {daysofweek.map( ( day, i ) => this.renderDays( day, i ) )}
      </Row>
    );
  }
}

export default DailyMenuContainer;