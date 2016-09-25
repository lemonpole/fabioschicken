"use strict";
const os = require( 'os' );
const chalk = require( 'chalk' );
const detect = require( 'detect-port' );
const args = require( 'minimist' )( process.argv.slice( 2 ) );
const path = require( 'path' );
const express = require( 'express' );

const app = express();
const oneDay = 24 * 60 * 60 * 1000;

// figure out what port we should run on. user could have provided an argument
// TODO: proper validation like checking if in use or that it's actually numeric :)
let { DEFAULT_PORT } = process.env;
if(args.p) {
  DEFAULT_PORT = args.p;
}

// cache static assets for a day
app.use( express.static(
  path.join( __dirname, '../dist' ),
  { maxAge: oneDay }
));

app.use( express.static(
  path.join( __dirname, '../dist/assets' ),
  { maxAge: oneDay }
));

// serve the index.html on route requests
app.get( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname, '../dist/index.html' ) );
});

// before running it let's make sure the port we're trying to use is available
// if not we'll attach to another one
detect( DEFAULT_PORT ).then( port => {
  console.log( chalk.bold.yellow.underline( 'Fabio\'s Chicken Production Environment\n' ) );

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
    console.log( chalk.yellow( `http://${os.hostname()}:${port}` ) );
  });
});