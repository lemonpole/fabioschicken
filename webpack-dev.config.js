var commonConfig = require( './webpack-common.config.js' );
var devLoaders = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    plugins: [ 'transform-runtime' ],
    presets: [ 'es2015', 'react' ]
  }
}];

module.exports = {
  entry: [
    'babel-polyfill',
    './app'
  ],
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: commonConfig.module.loaders.concat( devLoaders )
  },
  resolve: {
    extensions: commonConfig.resolve.extensions
  }
};
