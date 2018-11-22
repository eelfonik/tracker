const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './src/index',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
      },
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
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       loader:
      //       'css-loader',
      //       options: {
      //         modules: true,
      //         importLoaders: 1,
      //         localIdentName: '[name]__[local]___[hash:base64:5]'
      //       }
      //     },
      //     { loader: 'postcss-loader' }
      //   ]
      // }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk-[hash].js',
  },
  devServer: {
    hot: true,
    port: 3000,
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/api/**': 'http://localhost:5000'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template:  path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ]
};