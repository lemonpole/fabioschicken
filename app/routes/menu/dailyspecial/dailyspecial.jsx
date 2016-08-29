import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQOD } from '../../../modules/quoteofday/actions';
import styles from './dailyspecial.scss';

class DailySpecial extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Today is {this.props.params.day}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quotes: state.quotes
});

export default connect( mapStateToProps )( DailySpecial );