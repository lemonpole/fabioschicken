import React from 'react';
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

const MenuListContainer = () => (
  <Row>
    <Col xs={12} md={4}>
      <Row>
        <Col xs={9} md={10}>
          <h2>Carne Asada</h2>
          <p>Deliciosa carne de res con nuestro sazon casero. Asada a su gusto</p>
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
      <Row>
        <Col xs={9} md={10}>
          <h2>Pechuga a la plancha</h2>
          <p />
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
      <Row>
        <Col xs={9} md={10}>
          <h2>Chuleta Colombiana</h2>
          <p>Chuleta de cerdo empanisada. No tiene hueso.</p>
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
      <Row>
        <Col xs={9} md={10}>
          <h2>Pechuga a la milanesa</h2>
          <p />
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
    </Col>
    <Col xs={12} md={4}>
      <Row>
        <Col xs={9} md={10}>
          <h2>Pollo Asado</h2>
          <p />
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
      <Row>
        <Col xs={9} md={10}>
          <h2>Bandeja paisa</h2>
          <p />
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
      <Row>
        <Col xs={9} md={10}>
          <h2>Lomo de cerdo</h2>
          <p>Lomo a la parilla. Bien asado con nuestro sazon</p>
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
      <Row>
        <Col xs={9} md={10}>
          <h2>Arepa con queso</h2>
          <p />
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
    </Col>
    <Col xs={12} md={4}>
      <Row>
        <Col xs={9} md={10}>
          <h2>Ceviche de camarones</h2>
          <p />
        </Col>
        <Col xs={3} md={2}>
          <code>$13.37</code>
        </Col>
      </Row>
    </Col>
  </Row>
);

const Menu = ( props ) => (
  <section className={styles.container}>
    <div className={styles.contentbox}>
      <Tabs
        tabItemContainerStyle={tabStyles.tabItemContainer}
        inkBarStyle={tabStyles.inkBar}
        contentContainerStyle={tabStyles.contentContainer}
      >
        <Tab label="Food Platters">
          <MenuListContainer />
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