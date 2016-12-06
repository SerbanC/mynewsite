const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// PostCSS modules
const cssnext = require('postcss-cssnext');
const containerQueries = require('cq-prolyfill/postcss-plugin');
const browserReporter = require('postcss-browser-reporter');
const reporter = require('postcss-reporter');

const postCSSConfig = function (webpack) {
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
    filename: 'public/[name].min.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|public)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        exclude: /public/,
        loader: ExtractTextPlugin.extract([
          'css',
          'postcss'
        ])
      }
    ]
  },

  // devtool: "#source-map",
  devtool: "#eval",

  postcss: postCSSConfig,

  plugins: [
    new ExtractTextPlugin('public/styles.css'),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.DedupePlugin(),
    // new CleanWebpackPlugin(['public'])
  ],

  resolve: {
    root: [
      path.join(__dirname, 'src/scripts'),
    ],
  }
};
