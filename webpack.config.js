const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');

// Plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Libs
const libs = require('./webpack/libs.config.js');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public'),
  scripts: path.join(__dirname, 'src', 'scripts'),
  styles: path.join(__dirname, 'src', 'styles'),
};

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

module.exports = validate({
  entry: {
    app: PATHS.app
    // 'main': './index.js',
    // 'vendor': 'vendor.js',
  },

  output: {
    path: PATHS.build,
    filename: '[name]-[hash].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|public)/,
        loader: 'babel',
        include: PATHS.scripts
      },
      {
        test: /\.css$/,
        exclude: /public/,
        loader: ExtractTextPlugin.extract([
          'css',
          'postcss'
        ]),
        include: PATHS.styles
      }
    ]
  },

  // devtool: "#source-map",
  devtool: "#eval",

  postcss: postCSSConfig,

  plugins: libs.plugins(),

  resolve: {
    root: [
      PATHS.scripts,
    ],
  },

  devServer: libs.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  })
});
