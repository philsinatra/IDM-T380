const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true
          },
          safari10: true,
          ie11: true
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
