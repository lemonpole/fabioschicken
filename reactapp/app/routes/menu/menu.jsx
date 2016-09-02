import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
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

const MenuList = ( props ) => (
  <Row>
    <Col xs={12} md={4}>
      {props.items.map( ( item, id ) => (
        <Row key={id}>
          <Col xs={9} md={10}>
            <span className={styles.lead}>{item.post_title}</span>
            <p>{item.post_content}</p>
          </Col>
          <Col xs={3} md={2}>
            <code>$13.37</code>
          </Col>
        </Row>
      ) )}
    </Col>
  </Row>
);

class Menu extends Component {
  renderTabs = () => {
    const { foods } = this.props;
    const categories = Object.keys( foods.data );
    const tabList = [];

    categories.map( ( category, id ) => tabList.push(
      <Tab label={category} key={id}>
        <MenuList items={foods.data[ category ]} />
      </Tab>
    ) );

    return tabList;
  }

  render() {
    return (
      <section className={styles.container}>
        <div className={styles.contentbox}>
          <Tabs
            tabItemContainerStyle={tabStyles.tabItemContainer}
            inkBarStyle={tabStyles.inkBar}
            contentContainerStyle={tabStyles.contentContainer}
          >
            {this.renderTabs()}
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