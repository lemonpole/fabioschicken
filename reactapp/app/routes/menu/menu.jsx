import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppetizersDrinksContainer from '../../components/appetizersdrinks-container';
import DailyMenuContainer from '../../components/daily-menu-container';
import GeneralMenuContainer from '../../components/general-menu-container';
import styles from './menu.scss';

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
    let content;

    switch( category ) {
      case 'Daily Specials':
        content = ( <DailyMenuContainer children={data[ category ].children} /> );
        break;
      case 'Appetizers/Drinks':
        content = ( <AppetizersDrinksContainer children={data[ category ].children} /> );
        break;
      default:
        content = ( <GeneralMenuContainer children={data[ category ]} /> );
    }

    return (
      <Tab label={category} key={key}>
        {content}
      </Tab>
    );
  }

  render() {
    const { foods } = this.props;
    const categories = Object.keys( foods.data );

    return (
      <section className={styles.container}>
        <div className={styles.contentbox}>
          <Tabs
            tabItemContainerStyle={tabStyles.tabItemContainer}
            inkBarStyle={tabStyles.inkBar}
            contentContainerStyle={tabStyles.contentContainer}
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