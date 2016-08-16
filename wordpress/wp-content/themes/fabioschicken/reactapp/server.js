"use strict";
const PORT = 8080;
const path = require( 'path' );
const express = require( 'express' );
const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );
const Dashboard = require( 'webpack-dashboard' );
const DashboardPlugin = require( 'webpack-dashboard/plugin' );

const config = require( path.join( __dirname, 'webpack-dev.js' ) );
const app = express();
const compiler = webpack( config );
const dashboard = new Dashboard();

compiler.apply( new DashboardPlugin( dashboard.setData ) );

app.use( webpackDevMiddleware( compiler, {
  quiet     : true,
  noInfo    : true,
  publicPath: config.output.publicPath
}));

app.use( webpackHotMiddleware( compiler, {
  log: () => {}
}));

app.get( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'index.html' ) );
});

app.listen( PORT, '0.0.0.0', ( err ) => {
  if( err ) {
    console.log( err );
    return;
  }

  console.log( 'Listening at http://localhost:' + PORT );
});