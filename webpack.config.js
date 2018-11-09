const webpack = require('webpack');
const path = require('path');
//this one is for using css modules, which will output a specified css file in output destination
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: 'source-map',
  entry: isProd ? ['./src/index'] : [
    'react-hot-loader/patch',
    './src/index',
    'webpack-hot-middleware/client'
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        test: /\.jsx?$/,         // Match both .js and .jsx files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
        include: path.join(__dirname, 'src')
      },
      {
        // as ExtractTextPlugin will prevent HMR working, we only use it on production, not development
        // see https://github.com/webpack/extract-text-webpack-plugin/issues/30#issuecomment-125757853
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader:
            'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.css']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk-[hash].js',
  },
  devServer: {
    hot: true,
    port: 5000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isProd ? '[name].[hash].css': "[name].css",
      chunkFilename: isProd ? '[id].[hash].css' : "[id].css"
    })
  ]
};