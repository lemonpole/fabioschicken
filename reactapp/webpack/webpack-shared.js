require('dotenv').config({ silent: true });
var path = require( 'path' );

process.traceDeprecation = true
exports.loaders = {
  js: {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  styles: {
    flexboxgrid: {
      test: /\.css$/,
      include: /flexboxgrid/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: { modules: true }
        }
      ]
    },
    app: {
      test: /\.scss$/,
      include: path.join( __dirname, '../app' ),
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader'
        }
      ]
    }
  },
  statics: {
    other: {
      test: /\.(png|jpg|gif)$/,
      include: path.join( __dirname, '../app' ),
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }]
    }
  }
};

exports.vars = {
  API_HOST: JSON.stringify( process.env.API_HOST || ( process.env.PRODUCTION ?
    '$API_HOST' : 'http://api.fabioschicken.com/wp-admin/admin-ajax.php?action'
  ))
};

exports.resolve = {
  modules: [ path.resolve( './app' ) ],
  extensions: [ '.js', '.jsx' ]
};
