import * as actions from '../constants';

const initialState = {
  isLoading: false,
  data: {}
};

const foods = ( state = initialState, action ) => {
  switch( action.type ) {
    case actions.REQUEST_FOODS:
      return {
        ...state,
        isLoading: true
      };
    case actions.RECEIVE_FOODS:
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