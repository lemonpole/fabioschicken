require('dotenv').config();
var path = require( 'path' );

exports.loaders = {
  js: {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  styles: {
    flexboxgrid: {
      test: /\.css$/,
      loader: 'style!css?modules',
      include: /flexboxgrid/
    },
    app: {
      test: /\.scss$/,
      include: path.join( __dirname, '../app' ),
      loaders: [
        'style',
        'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
        'sass'
      ]
    }
  },
  statics: {
    other: {
      test: /\.(png|jpg|gif)$/,
      include: path.join( __dirname, '../app' ),
      loader: 'url-loader?limit=100000'
    }
  }
};

exports.vars = {
  API_HOST: JSON.stringify( process.env.API_HOST || 'http://api.fabioschicken.com/wp-admin/admin-ajax.php?action' )
};

exports.resolve = {
  extensions: [ '', '.js', '.jsx' ]
};
