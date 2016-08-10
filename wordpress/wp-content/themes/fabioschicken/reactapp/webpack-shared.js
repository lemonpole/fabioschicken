exports.loaders = {
  js: {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      plugins: [ 'transform-runtime' ],
      presets: [ 'es2015', 'react' ]
    }
  }
};

exports.resolve = {
  extensions: [ '', '.js', '.jsx' ]
};