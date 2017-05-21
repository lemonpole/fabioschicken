// @flow
export type Action =
  { type: 'REQUEST_BLOGINFO' }
| { type: 'RECEIVE_BLOGINFO', bloginfo: Object };

type Dispatch = ( action: Action ) => any;

export const getBloginfo = (): ThunkAction => async ( dispatch: Dispatch ) => {
  dispatch({ type: 'REQUEST_BLOGINFO' });

  try {
    const req = await fetch( `${API_HOST}=bloginfo` );
    const res = await req.json();

    dispatch({
      type: 'RECEIVE_BLOGINFO',
      bloginfo: res.data
    });
  } catch( e ) {
    console.log( e.message ); // eslint-disable-line
  }
};
