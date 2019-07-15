const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const packageJSON = require('./package.json');

module.exports = merge(common, {
  // entry: {
  //   app: './src/index.tsx',
  // },
  // entry: {
  //   app: './src/index.tsx',
  // },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: `${packageJSON.name}-${packageJSON.version}.dev.js`,
  },
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    host: '0.0.0.0',
    port: 8080,
  },
});
