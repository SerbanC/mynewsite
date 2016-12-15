// Local
const pkg = require('./package.json');

// Node & Webpack
const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');

// Plugins
const HtmlPlugin = require("html-webpack-plugin");

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
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },

  loaders: [
    {
      test: /\.js$/,
      loader: 'babel',
      include: PATHS.scripts
    },
    {
      test: /\.css$/,
      loaders: [
        'style',
        'css',
        'postcss'
      ],
      include: PATHS.styles
    }
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),
    new HtmlPlugin({
      title: 'Șerban Cârjan - Front End Developer from Bucharest',
      template: path.join(PATHS.app, 'index.ejs')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
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

module.exports = validate({
  entry: {
    app: PATHS.app,
    vendor: Object.keys(pkg.dependencies)
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
    chunkFilename: '[hash].js'
  },

  module: {
    loaders: config.loaders
  },

  devtool: "#eval-source-map",

  postcss: config.postCSS,

  plugins: config.plugins,

  resolve: {
    root: [
      PATHS.scripts,
    ],
  },

  devServer: config.devServer
});
