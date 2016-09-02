import React from 'react';
import { connect } from 'react-redux';
import styles from './home.scss';

const Home = ( props ) => (
  <section className={styles.container}>
    <div className={styles.splash} />
    <h1>{props.bloginfo.data.name}</h1>
  </section>
);

const mapStateToProps = state => ({
  bloginfo: state.bloginfo
});

export default connect( mapStateToProps )( Home );