// Local
const pkg = require('./package.json');

// Node & Webpack
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
  scripts: path.join(__dirname, 'src', 'scripts'),
  styles: path.join(__dirname, 'src', 'styles'),
};

// PostCSS modules
const cssnext = require('postcss-cssnext');
const containerQueries = require('cq-prolyfill/postcss-plugin');
const browserReporter = require('postcss-browser-reporter');
const reporter = require('postcss-reporter');

const config = {
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel',
      include: PATHS.scripts
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', [
        'css',
        'postcss'
      ]),
      include: PATHS.styles
    }
  ],

  plugins: [
    new CleanPlugin([PATHS.build], { root: process.cwd() }),
    new HtmlPlugin({
      title: 'Șerban Cârjan - Front End Developer from Bucharest'
    }),
    // new FaviconsPlugin('ADDFAVICONHERE'),
    new ExtractTextPlugin('styles.[chunkHash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ],

  postCSS: [
    // CSSNext contains autoprefixer
    cssnext(),
    containerQueries({
      postcss: true,
    }),
    browserReporter,
    reporter({
      clearMessages: true,
    })
  ]
};

module.exports = {
  entry: {
    app: PATHS.app,
    vendor: Object.keys(pkg.dependencies)
  },

  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },

  module: {
    loaders: config.loaders
  },

  devtool: "#source-map",

  postcss: config.postCSS,

  plugins: config.plugins,

  resolve: {
    root: [
      PATHS.scripts,
    ],
  }
};
