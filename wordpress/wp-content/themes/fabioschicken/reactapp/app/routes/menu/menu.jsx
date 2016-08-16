import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
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

const Menu = ( props ) => (
  <section className={styles.container}>
    <div className={styles.contentbox}>
      <Tabs
        tabItemContainerStyle={tabStyles.tabItemContainer}
        inkBarStyle={tabStyles.inkBar}
        contentContainerStyle={tabStyles.contentContainer}
      >
        <Tab label="Food Platters">
          <div />
        </Tab>
        <Tab label="Popular Platters">
          <div />
        </Tab>
        <Tab label="Appetizers and Drinks">
          <div />
        </Tab>
        <Tab label="Daily Specials">
          <div />
        </Tab>
      </Tabs>
    </div>
  </section>
);

export default Menu;