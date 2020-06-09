const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: 'Safari Technology Preview'
  },
  entry: {
    index: ['./src/index.js'],
    contact: ['./src/contact.js']
  },
  output: {
    filename: 'assets/js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['contact'],
      filename: 'screens/contact.html',
      template: path.join(__dirname, 'src/screens', 'contact.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'screens/index.html',
      template: path.join(__dirname, 'src/screens', 'index.html')
    })
  ]
};
