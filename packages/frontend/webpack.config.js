/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './index.tsx',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve('../../dist/client'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@ui-kit': path.resolve(__dirname, '../ui-kit/src'),
      '@types': path.resolve(__dirname, '../types'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:5000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('template.html'),
    }),
  ],
};
