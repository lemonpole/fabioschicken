/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui-scrollable-tabs/Tabs';

import FoodMenuContainer from 'components/food-menu';
import styles from './menu.scss';

// NOTE: material-ui-scrollable-tabs/Tabs is going to be merged into the material-ui
// NOTE: library soon. maybe for v1.0 so keep a lookout for that

const tabStyles = {
  tabItemContainer: {
    backgroundColor: '#5e412f'
  },
  inkBar: {
    backgroundColor: 'orange',
    height: 2
  },
  contentContainer: {
    marginTop: 10
  }
};

class Menu extends Component {
  renderTab = ( category, key ) => {
    const { data } = this.props.foods;
    let description;
    let content;

    // if we have a description, render it.
    if( data[ category ].description.length > 0 ) {
      description = ( <h3>{data[ category ].description}</h3> );
    }

    switch( category ) {
      case 'Daily Specials':
        content = ( <FoodMenuContainer
          renderCategoriesAsCols
          data={data[ category ].children}
        /> );
        break;
      default:
        content = <FoodMenuContainer data={data[ category ].children} />;
    }

    return (
      <Tab label={category} key={key}>
        {description}
        {content}
      </Tab>
    );
  }

  render() {
    const { foods } = this.props;
    const categories = Object.keys( foods.data );
    const w = screen.width;

    return (
      <section className={styles.container}>
        <div className={styles.contentbox}>
          <Tabs
            tabItemContainerStyle={tabStyles.tabItemContainer}
            inkBarStyle={tabStyles.inkBar}
            contentContainerStyle={tabStyles.contentContainer}
            tabType={w > 768 ? 'fixed' : 'scrollable'}
          >
            {categories.map( ( category, key ) => this.renderTab( category, key ) )}
          </Tabs>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  foods: state.foods
});

export default connect( mapStateToProps )( Menu );
