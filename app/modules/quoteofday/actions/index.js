/* eslint-disable no-console */
import { RECEIVE_QUOTES, REQUEST_QUOTES } from '../constants';

const API_HOST = 'http://quotes.rest/qod.json';

const requestQOD = () => ({
  type: REQUEST_QUOTES
});

const receiveQOD = ( quotes ) => ({
  type: RECEIVE_QUOTES,
  quotes
});

export const getQOD = () => async ( dispatch ) => {
  dispatch( requestQOD );

  try {
    const req = await fetch( API_HOST );
    const res = await req.json();

    dispatch( receiveQOD( res.contents.quote ) );
  } catch( err ) {
    console.log( err );
  }
};
