import { RECEIVE_FOODS, REQUEST_FOODS } from '../constants';

const requestFoods = () => ({
  type: REQUEST_FOODS
});

const receiveFoods = ( foods ) => ({
  type: RECEIVE_FOODS,
  foods
});

export const getFoods = () => async dispatch => {
  dispatch( requestFoods() );

  try {
    const req = await fetch( `${API_HOST}=foods` );
    const res = await req.json();

    dispatch( receiveFoods( res.data ) );
  } catch( e ) {
    console.log( e.message );
  }
};
