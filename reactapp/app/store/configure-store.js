import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './create-reducer';

const finalCreateStore = compose(
  applyMiddleware( thunk ),
  ( window.devToolsExtension ? window.devToolsExtension() : ( f => f ) )
)( createStore );

export default function configureStore( initialState ) {
  const store = finalCreateStore( createReducer(), initialState );
  if( module.hot ) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept( './create-reducer', () => {
      const nextRootReducer = require( './create-reducer' ).default;
      store.replaceReducer( nextRootReducer );
    });
  }

  return store;
}