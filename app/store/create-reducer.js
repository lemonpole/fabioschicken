import { combineReducers } from 'redux';
import bloginfo from '../modules/bloginfo/reducers';
import quoteofday from '../modules/quoteofday/reducers';

export default function createReducer() {
  return combineReducers({
    bloginfo,
    quoteofday
  });
}