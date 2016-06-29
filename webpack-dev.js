var webpackConfig = require( './webpack-shared.js' );

module.exports = {
  entry: [
    'babel-polyfill',
    './app'
  ],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: webpackConfig.resolve,
  module: {
    loaders: [
      webpackConfig.loaders.js
    ]
  }
};
