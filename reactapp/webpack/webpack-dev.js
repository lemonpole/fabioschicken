var path = require( 'path' );
var webpack = require( 'webpack' );
var webpackConfig = require( path.join( __dirname, './webpack-shared.js' ) );

module.exports = {
  entry: [
    path.join( __dirname, '../app' )
  ],
  output: {
    path: path.join( __dirname, '../' ),
    publicPath: '/assets/',
    filename: 'bundle.js',
    chunkFilename: '[name]-[chunkhash].bundle.js'
  },
  resolve: webpackConfig.resolve,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      webpackConfig.loaders.js,
      webpackConfig.loaders.styles.flexboxgrid,
      webpackConfig.loaders.styles.app,
      webpackConfig.loaders.statics.other
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify( process.env.API_HOST || ( process.env.PRODUCTION ?
        '$API_HOST' : 'http://api.fabioschicken.com/wp-admin/admin-ajax.php?action'
      ))
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
