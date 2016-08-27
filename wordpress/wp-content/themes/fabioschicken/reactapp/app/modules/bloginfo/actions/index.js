import { RECEIVE_BLOGINFO, REQUEST_BLOGINFO } from '../constants';
import { API_HOST } from '../../../config';

const requestBloginfo = () => ({
  type: REQUEST_BLOGINFO
});

const receiveBloginfo = ( bloginfo ) => ({
  type: RECEIVE_BLOGINFO,
  bloginfo
});

export const getBloginfo = () => async dispatch => {
  dispatch( requestBloginfo() );

  try {
    const req = await fetch( `${API_HOST}=bloginfo` );
    const res = await req.json();

    dispatch( receiveBloginfo( res.data ) );
  } catch( e ) {
    console.log( e.message );
  }
};