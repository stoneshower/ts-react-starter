const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const packageJSON = require('./package.json');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: `${packageJSON.name}-${packageJSON.version}.dev.js`,
  },
  devServer: {
    contentBase: __dirname + '/dist',
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 8080,
    open: true,
  },
});
