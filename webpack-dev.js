var path = require( 'path' );
var webpack = require( 'webpack' );
var webpackConfig = require( path.join( __dirname, './webpack-shared.js' ) );

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join( __dirname, 'app' )
  ],
  output: {
    path: path.join( __dirname, '/dist/' ),
    publicPath: '/assets/',
    filename: 'bundle.js',
    chunkFilename: '[name]-[chunkhash].bundle.js'
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
      webpackConfig.loaders.styles.flexboxgrid,
      webpackConfig.loaders.styles.app,
      webpackConfig.loaders.statics.other
    ]
  },
  eslint: {
    emitWarning: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
