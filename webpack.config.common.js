const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const moment = require('moment');
const packageJSON = require('./package.json');

const createBanner = () => {
  const createdTime = moment().format('YYYY-MM-DD HH:mm:ss')
  const banner = `
    ${packageJSON.name}-${packageJSON.version}.js
    Date: ${createdTime}
  `;
  return banner;
};

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
              fix: false,
              emitErrors: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './dist/img',
              publicPath: './',
            },
          },
        ],
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './dist/fonts',
              publicPath: './',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: createBanner(),
    }),
    new HtmlWebpackPlugin({
      title: 'hello',
      inject: 'body',
      hash: true,
      template: path.resolve(__dirname, 'src/template/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html'),
    }),
    new WebpackBuildNotifierPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', 'css'],
  },
};
