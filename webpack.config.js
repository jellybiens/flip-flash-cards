/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientConfig = {
  name: 'clientConfig',
  entry: './packages/frontend/index.tsx',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve('./dist/client'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx', 'json'],
    alias: {
      '@ui-kit': path.resolve(__dirname, './packages/ui-kit/src'),
      '@types': path.resolve(__dirname, './packages/types'),
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        type: 'asset/resource',
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
      template: path.resolve('/packages/frontend/template.html'),
    }),
  ],
};

const serverConfig = {
  name: 'serverConfig',
  entry: './packages/server/index.ts',
  target: 'node',
  mode: 'development',
  output: {
    path: path.resolve('./dist/server'),
    filename: 'index.js',
    publicPath: '/',
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, './node_modules'),
    }),
    'pg',
    'sqlite3',
    'tedious',
    'pg-hstore',
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx', 'json'],
    alias: {
      '@types': path.resolve(__dirname, './packages/types'),
      '@database': path.resolve(__dirname, './packages/psql-database'),
      '@gql-schema': path.resolve(__dirname, './packages/gql-schema'),
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
    ],
  },
};

module.exports = [serverConfig, clientConfig];
