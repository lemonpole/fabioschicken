var path = require( 'path' );

exports.loaders = {
  js: {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      plugins: [ 'transform-runtime' ],
      presets: [ 'es2015', 'react' ]
    }
  },
  styles: {
    flexboxgrid: {
      test: /\.css$/,
      loader: 'style!css?modules',
      include: /flexboxgrid/
    },
    app: {
      test: /\.scss$/,
      include: path.join( __dirname, 'app' ),
      loaders: [
        'style',
        'css?modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss',
        'sass'
      ]
    }
  }
};

exports.resolve = {
  extensions: [ '', '.js', '.jsx' ]
};