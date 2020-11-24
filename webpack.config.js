const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000/',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'onelogin-demo-lab.min.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader','css-loader','sass-loader'],
      },
      {
        test: /\.html$/,
        use: [ { loader: "html-loader" } ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new Dotenv(),
    new MinifyPlugin( {} ),
    new HtmlWebpackPlugin( {
      title: 'OneLogin Demo Lab',
      template: './public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    } )
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: true
  }
}
