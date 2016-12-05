var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// PostCSS modules
var cssnext = require('postcss-cssnext');
var containerQueries = require('cq-prolyfill/postcss-plugin');
var browserReporter = require('postcss-browser-reporter');
var reporter = require('postcss-reporter');

var postCSSConfig = function(webpack) {
  return [
    // CSSNext contains autoprefixer
    cssnext(),
    containerQueries({
      postcss: true,
    }),
    browserReporter,
    reporter({
      clearMessages: true,
    })
  ];
};

module.exports = {
  entry: {
    'main': './index.js',
    // 'vendor': 'vendor.js',
  },

  output: {
    path: __dirname,
    filename: 'public/[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!postcss'),
      },
    ],
  },

  devtool: "#source-map",

  postcss: postCSSConfig,

  plugins: [
    new ExtractTextPlugin('public/styles.css'),
  ],

  resolve: {
    root: [
      path.join(__dirname, 'src/scripts'),
    ],
  }
};
