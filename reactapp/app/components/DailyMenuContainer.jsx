import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import MenuItem from './MenuItem';

class DailyMenuContainer extends Component {
  renderMenuItems = ( items ) => (
    items.map( ( item, i ) => <MenuItem key={i} {...item} /> )
  )

  renderDays = ( day, i ) => (
    <Col xs={12} md={4} key={i}>
      <h2 style={{ marginBottom: '10px' }}>{day}</h2>
      {this.renderMenuItems( this.props.children[ day ] )}
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