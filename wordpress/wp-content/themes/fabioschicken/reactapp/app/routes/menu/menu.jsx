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
  <div>
    <h2>General</h2>
    <Row>
      <Col xs={12} md={4}>
        <Row>
          <Col xs={9} md={10}>
            <span className="lead">Carne Asada</span>
            <p>Deliciosa carne de res con nuestro sazon casero. Asada a su gusto</p>
          </Col>
          <Col xs={3} md={2}>
            <code>$13.37</code>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={10}>
            <span className="lead">Pechuga a la plancha</span>
            <p />
          </Col>
          <Col xs={3} md={2}>
            <code>$13.37</code>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={10}>
            <span className="lead">Chuleta Colombiana</span>
            <p>Chuleta de cerdo empanisada. No tiene hueso.</p>
          </Col>
          <Col xs={3} md={2}>
            <code>$13.37</code>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={10}>
            <span className="lead">Pechuga a la milanesa</span>
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
            <span className="lead">Pollo Asado</span>
            <p />
          </Col>
          <Col xs={3} md={2}>
            <code>$13.37</code>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={10}>
            <span className="lead">Bandeja paisa</span>
            <p />
          </Col>
          <Col xs={3} md={2}>
            <code>$13.37</code>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={10}>
            <span className="lead">Lomo de cerdo</span>
            <p>Lomo a la parilla. Bien asado con nuestro sazon</p>
          </Col>
          <Col xs={3} md={2}>
            <code>$13.37</code>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={10}>
            <span className="lead">Arepa con queso</span>
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
            <span className="lead">Ceviche de camarones</span>
            <p />
          </Col>
          <Col xs={3} md={2}>
            <code>$13.37</code>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
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