"use strict";
const path = require( 'path' );
const express = require( 'express' );
const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );
const config = require( path.join( __dirname, 'webpack-dev.js' ) );

const app = express();
const compiler = webpack( config );

const PORT = 8080;

app.use( webpackDevMiddleware( compiler, {
  noInfo    : true,
  publicPath: config.output.publicPath
}));

app.use( webpackHotMiddleware( compiler ) );

app.get( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'index.html' ) );
});

app.listen( PORT, ( err ) => {
  if( err ) {
    console.log( err );
    return;
  }

  console.log( 'Listening at http://localhost:' + PORT );
});