var path = require('path');
var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/);
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './scripts/main.js',
    vendor: [
      'lodash',
      'normalizr',
      'react',
      'redux',
    ],
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: './public/js/[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?' + JSON.stringify({presets: ['es2015', 'react']}), exclude: [nodeModulesDir] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
    ],
  },
  plugins: [
    ignore,
    new ExtractTextPlugin('./server/public/css/main.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', './public/js/vendor.js'),
  ],
};
