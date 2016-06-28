module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [ 'transform-runtime' ],
          presets: [ 'es2015', 'react' ]
        }
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  }
};
