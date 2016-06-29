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
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "eslint"
    }],
    loaders: [
      webpackConfig.loaders.js
    ]
  },
  eslint: {
    emitWarning: true
  }
};
