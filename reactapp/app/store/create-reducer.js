import { combineReducers } from 'redux';
import bloginfo from '../modules/bloginfo/reducers';

export default function createReducer() {
  return combineReducers({
    bloginfo
  });
}