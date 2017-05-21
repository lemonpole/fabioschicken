import { combineReducers } from 'redux';
import bloginfo from '../modules/bloginfo/reducer';
import foods from '../modules/foods/reducer';

export default function createReducer() {
  return combineReducers({
    bloginfo,
    foods
  });
}
