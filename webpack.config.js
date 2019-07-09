const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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

const webpackConfig = (env, argv) => {
  const isProd = argv.mode === 'production';
  const devtool = isProd ? false : 'inline-source-map';
  const suffix = isProd ? 'min' : 'dev';

  const config = {
    devtool,
    entry: {
      app: './src/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${packageJSON.name}-${packageJSON.version}.${suffix}.js`,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(pc|c)ss$/,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: !isProd,
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
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
              }
            }
          ]
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
              }
            }
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, '/dist'),
      host: '0.0.0.0',
      port: 8080,
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: createBanner(),
      }),
      new HtmlWebpackPlugin({
        title: 'hello',
        inject: 'body',
        hash: true,
        template: path.resolve(__dirname, 'src/index.html'),
        filename: path.resolve(__dirname, 'dist/index.html'),
      }),
      new WebpackBuildNotifierPlugin(),
      new MiniCssExtractPlugin({
        filename: './style.css',
        chunkFilename: '[id].css',
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: argv.mode || 'development',
        DEBUG: !isProd,
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', 'html'],
    },
    stats: {
      all: false,
      assets: true,
      assetsSort: 'chunks',
      builtAt: true,
      cachedAssets: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: true,
    },
  };

  if (isProd) {
    config.plugins.push(
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        cache: false,
        parallel: true,
        sourceMap: false,
      }),
    );
  }

  if (argv.analyze) {
    config.plugins.push(
      new BundleAnalyzer(),
    );
  }

  return config;
};

module.exports = webpackConfig;
