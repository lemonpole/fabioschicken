// @flow
import type { Action } from './actions';

const initialState: BloginfoState = {
  isLoading: false,
  data: {}
};

const bloginfo = ( state: BloginfoState = initialState, action: Action ) => {
  switch( action.type ) {
    case 'REQUEST_BLOGINFO':
      return {
        ...state,
        isLoading: true
      };
    case 'RECEIVE_BLOGINFO':
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
