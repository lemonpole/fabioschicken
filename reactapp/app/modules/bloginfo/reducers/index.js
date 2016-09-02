import * as actions from '../constants';

const initialState = {
  isLoading: false,
  data: {}
};

const bloginfo = ( state = initialState, action ) => {
  switch( action.type ) {
    case actions.REQUEST_BLOGINFO:
      return {
        ...state,
        isLoading: true
      };
    case actions.RECEIVE_BLOGINFO:
      return {
        ...state,
        isLoading: false,
        data: action.bloginfo
      };
    default:
      return state;
  }
};

export default bloginfo;