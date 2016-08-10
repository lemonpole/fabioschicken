var webpackConfig = require( './webpack-shared.js' );

module.exports = {
  entry: [
    'babel-polyfill',
    './app'
  ],
  output: {
    path: '../',
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
      webpackConfig.loaders.js,
      webpackConfig.loaders.styles.flexboxgrid
    ]
  },
  eslint: {
    emitWarning: true
  }
};
