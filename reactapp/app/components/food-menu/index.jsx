// @flow
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { MenuList, MenuItem } from 'components/menu';

type Food = {
  post_title: string,
  post_content: string
};

type Category = {
  children: Array<Food>,
  description?: string
};

type DataRoot = {
  [string]: Category
};

type Props = {
  renderCategoriesAsCols?: boolean,
  renderItemsAsColumns?: boolean,
  data: DataRoot | Array<Food>
};

const styles = {
  description: {
    margin: 0,
    marginBottom: '15px',
    fontStyle: 'italic'
  }
};

class FoodMenuContainer extends Component<Props> {
  static defaultProps = {
    renderCategoriesAsCols: false,
    renderItemsAsColumns: true,
    data: {}
  }

  renderCategory = ( name: string, i: number ) => {
    const category = this.props.data[ name ];

    if( this.props.renderCategoriesAsCols ) {
      return (
        <Col xs={12} md={4} key={i}>
          <h2>{name}</h2>
          {category.description && <p style={styles.description}>{category.description}</p>}
          {category.children.map( ( item: Food, j: number ) => <MenuItem key={j} {...item} /> )}
        </Col>
      );
    }

    return (
      <MenuList title={name} key={i}>
        {category.children.map(
          ( item: Food, j: number ) => <MenuItem key={j} {...item} />
        )}
      </MenuList>
    );
  }

  render() {
    if( this.props.data.constructor === Array ) {
      return (
        <MenuList>
          {this.props.data.map(
            ( item: Food, i: number ) => <MenuItem key={i} {...item} />
          )}
        </MenuList>
      );
    }

    if( this.props.renderCategoriesAsCols ) {
      return (
        <Row>
          {Object.keys( this.props.data ).map( ( name: string, i: number ) =>
            this.renderCategory( name, i )
          )}
        </Row>
      );
    }

    return (
      <div>
        {Object.keys( this.props.data ).map( ( name: string, i: number ) =>
          this.renderCategory( name, i )
        )}
      </div>
    );
  }
}

export default FoodMenuContainer;