const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(process.env.PORT);
console.log(path.resolve(__dirname, 'public/img/'));

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
      {
        test: /\.(png|jpg|svg)$/,
        include: path.join(__dirname, 'public'),
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 15000,
              name: "[name].[ext]",
            },
          }
        ],
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
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      img: path.resolve(__dirname, 'public/img/'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk-[hash].js',
  },
  devServer: {
    hot: true,
    host: "0.0.0.0", // it's necessary to tell container using 0.0.0.0 instead of default localhost
    port: process.env.PORT,
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      // use 'node-dev' instead of 'localhost', which is defined by docker-compose file
      // detailed explaination here https://stackoverflow.com/a/52010893
      '/api/**': `http://node-dev:${process.env.API_PORT}`,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template:  path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  // this is necessary for the hot reload work inside docker container
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};