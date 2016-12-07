const webpack = require('webpack');

// Plugins
const HtmlPlugin = require("html-webpack-plugin");
const FaviconsPlugin = require("favicons-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.devServer = (options) => {
  return {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: options.host,
    port: options.port
  };
};

exports.plugins = () => {
  return [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),
    new HtmlPlugin({
      title: 'Șerban Cârjan - Front End Developer from Bucharest'
    }),
    new ExtractTextPlugin('styles-[hash].css'),
  ];
};
