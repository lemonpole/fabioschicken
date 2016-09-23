import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

class MenuList extends Component {
  index = 0;

  renderCols = ( numcols ) => {
    const content = [];

    for( let i = 0; i < numcols; i++, this.index++ ) {
      // if we're past the num of children we have let's reset the counter
      if( this.index >= this.props.children.length ) {
        this.index = 0;
        break;
      }

      // otherwise render the column
      content.push(
        <Col xs={12} md={4} key={i}>{this.props.children[ this.index ]}</Col>
      );
    }

    return content;
  }

  render() {
    // TODO: should numcols be a prop?
    const numcols = 3;
    const numrows = Math.ceil( this.props.children.length / numcols );
    const content = [];

    // render each row and its title
    // title should only be rendered on the first iteration
    for( let i = 0; i < numrows; i++ ) {
      content.push(
        <div key={i} style={{ marginBottom: '20px' }}>
          {this.props.title && i === 0 && ( <h2 style={{ marginBottom: '10px' }}>{this.props.title}</h2> )}
          <Row>{this.renderCols( numcols )}</Row>
        </div>
      );
    }

    return (
      <div>{content}</div>
    );
  }
}

export default MenuList;