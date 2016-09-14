"use strict";
const os                    = require( 'os' );
const chalk                 = require( 'chalk' );
const detect                = require( 'detect-port' );
const args                  = require( 'minimist' )( process.argv.slice( 2 ) );
const path                  = require( 'path' );
const express               = require( 'express' );
const webpack               = require( 'webpack' );
const webpackDevMiddleware  = require( 'webpack-dev-middleware' );
const webpackHotMiddleware  = require( 'webpack-hot-middleware' );

const config    = require( path.join( __dirname, '../webpack/webpack-dev.js' ) );
const app       = express();
const compiler  = webpack( config );

// figure out what port we should run on. user could have provided an argument
// TODO: proper validation like checking if in use or that it's actually numeric :)
let { DEFAULT_PORT } = process.env;
if(args.p) {
  DEFAULT_PORT = args.p;
}

app.use( webpackDevMiddleware( compiler, {
  noInfo    : true,
  publicPath: config.output.publicPath
}));

app.use( webpackHotMiddleware( compiler ) );

// serve the index.html on route requests
app.get( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'index.html' ) );
});

// before running it let's make sure the port we're trying to use is available
// if not we'll attach to another one
detect( DEFAULT_PORT ).then( port => {
  console.log( chalk.bold.yellow.underline( 'Fabio\'s Chicken Development Environment\n' ) );

  if( port !== DEFAULT_PORT ) {
    console.log( chalk.bold.red( `The intended port (${DEFAULT_PORT}) was unavailable.` ) );
    console.log( chalk.bold.red( `The next available port (${port}) is being used.\n` ) );
  }

  app.listen( port, '0.0.0.0', err => {
    if( err ) {
      console.log( err );
      return;
    }

    console.log( chalk.yellow( `Available at:\n` ) );
    console.log( chalk.yellow( `http://localhost:${port}` ) );
    console.log( chalk.yellow( `http://${os.hostname()}:${port}\n` ) );
  });
});