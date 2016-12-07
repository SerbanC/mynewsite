const path = require('path');
const webpack = require('webpack');

// Plugins
const HtmlPlugin = require("html-webpack-plugin");
const FaviconsPlugin = require("favicons-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public'),
  scripts: path.join(__dirname, 'scripts'),
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

module.exports = {
  entry: {
    app: PATHS.app
    // 'main': './index.js',
    // 'vendor': 'vendor.js',
  },

  output: {
    path: PATHS.build,
    filename: '[name]-[chunkHash].js',
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
    new CleanPlugin(['public']),
    new HtmlPlugin({
      title: 'Șerban Cârjan - Front End Developer from Bucharest'
    }),
    // new FaviconsPlugin('ADDFAVICONHERE'),
    new ExtractTextPlugin('styles-[chunkHash].css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ],

  resolve: {
    root: [
      PATHS.scripts,
    ],
  }
};
