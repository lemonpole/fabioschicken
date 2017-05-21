// @flow
import type { Action } from './actions';

const initialState: FoodsState = {
  isLoading: false,
  data: {}
};

const foods = ( state: FoodsState = initialState, action: Action ) => {
  switch( action.type ) {
    case 'REQUEST_FOODS':
      return {
        ...state,
        isLoading: true
      };
    case 'RECEIVE_FOODS':
      return {
        ...state,
        isLoading: false,
        data: action.foods
      };
    default:
      return state;
  }
};

export default foods;
