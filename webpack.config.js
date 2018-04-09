let path = require('path');

module.exports = {
  entry: ['babel-polyfill', './app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  target: 'electron-renderer',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      // Parse only app files.
      exclude: 'node_modules'
    },{
      test: /\.(scss|css)$/,
      loader: 'style!css!autoprefixer!sass'
    }],
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './app/styles')]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
  },
  externals: [
    (function () {
      var IGNORES = [
        'child_process',
        'fs',
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, `require('${request}')`);
        }
        return callback();
      };
    })(),
    function(context, request, callback) {
      if(/^nodegit/.test(request)) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ]
};
