// @flow
export type Action =
  { type: 'REQUEST_FOODS' }
| { type: 'RECEIVE_FOODS', foods: Object };

export const getFoods = (): ThunkAction => async ( dispatch: Dispatch ) => {
  dispatch({ type: 'REQUEST_FOODS' });

  try {
    const req = await fetch( `${API_HOST}=foods` );
    const res = await req.json();

    dispatch({
      type: 'RECEIVE_FOODS',
      foods: res.data
    });
  } catch( e ) {
    console.log( e.message ); // eslint-disable-line
  }
};
