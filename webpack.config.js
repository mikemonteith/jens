let path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      // Parse only app files.
      exclude: '/node_modules'
    },{
      test: /\.(scss|css)$/,
      loader: "style!css!autoprefixer!sass"
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
  }
};
