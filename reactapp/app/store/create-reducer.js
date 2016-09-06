import { combineReducers } from 'redux';
import bloginfo from '../modules/bloginfo/reducers';
import foods from '../modules/foods/reducers';

export default function createReducer() {
  return combineReducers({
    bloginfo,
    foods
  });
}