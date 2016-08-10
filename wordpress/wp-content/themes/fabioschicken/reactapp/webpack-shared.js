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
    }
  }
};

exports.resolve = {
  extensions: [ '', '.js', '.jsx' ]
};