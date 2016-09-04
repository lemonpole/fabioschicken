import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

let index = 0;

class MenuList extends Component {
  renderCols = ( numcols ) => {
    const content = [];

    for( let i = 0; i < numcols; i++, index++ ) {
      // if we're past the num of children we have let's reset the counter
      if( index >= this.props.children.length ) {
        index = 0;
        break;
      }

      // otherwise render the column
      content.push(
        <Col xs={12} md={4} key={i}>{this.props.children[ index ]}</Col>
      );
    }

    return content;
  }

  render() {
    const numrows = Math.ceil( this.props.children.length / 3 );
    const numcols = 3;
    const content = [];

    for( let i = 0; i < numrows; i++ ) {
      content.push( <Row key={i}>{this.renderCols( numcols )}</Row> );
    }

    return (
      <div>{content}</div>
    );
  }
}

export default MenuList;