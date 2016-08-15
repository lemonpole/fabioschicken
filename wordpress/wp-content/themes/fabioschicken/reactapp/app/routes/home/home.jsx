import React from 'react';
import styles from './home.scss';

const Home = ( props ) => (
  <section className={styles.container}>
    <div className={styles.splash} />
    <h1>Fabio's Chicken</h1>
  </section>
);

export default Home;