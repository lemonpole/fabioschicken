var path = require( 'path' );
var webpack = require( 'webpack' );
var webpackConfig = require( './webpack-shared.js' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

var vendors = [
  'material-ui',
  'material-ui-scrollable-tabs',
  'react',
  'react-dom',
  'react-flexbox-grid',
  'react-redux',
  'react-router',
  'react-tap-event-plugin',
  'redux',
  'redux-thunk',
  'history'
];

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'whatwg-fetch',
      path.join( __dirname, '../app' )
    ],
    vendors: vendors
  },
  output: {
    path: path.join( __dirname, '../dist/assets' ),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  resolve: webpackConfig.resolve,
  module: {
    loaders: [
      webpackConfig.loaders.js,
      webpackConfig.loaders.styles.flexboxgrid,
      webpackConfig.loaders.styles.app,
      webpackConfig.loaders.statics.other
    ]
  },
  plugins: [
    new webpack.DefinePlugin( Object.assign(
      {},
      {
        API_HOST: JSON.stringify( process.env.API_HOST || ( process.env.PRODUCTION ?
          '$API_HOST' : 'http://api.fabioschicken.com/wp-admin/admin-ajax.php?action'
        )),
        'process.env': {
          NODE_ENV: JSON.stringify( 'production' )
        }
      }
    )),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      template: path.join( __dirname, '../server/index.template.html' ),
      filename: path.join( __dirname, '../dist/index.html' ),
      hash: true,
      inject: 'body'
    })
  ]
};
