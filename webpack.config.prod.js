const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.config.common');
const packageJSON = require('./package.json');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: `${packageJSON.name}-${packageJSON.version}.min.js`,
  },
  module: {
    rules: [
      {
        test: /\.(pc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style.css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        terserOptions: {
          cache: false,
          parallel: true,
          sourceMap: false,
          keep_classnames: true,
          drop_console: true,
        },
      }),
    ],
  },
});
