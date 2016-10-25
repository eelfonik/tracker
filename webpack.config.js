var webpack = require('webpack');
var path = require('path');
//this one is for using css modules, which will output a specified css file in output destination
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';
var styles = 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader?sourceMap=inline';

module.exports = {
    entry: isProd?['react-hot-loader/patch', './src/app']:[
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/app'
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/,
                loaders: ['babel?presets[]=es2015,presets[]=react'],
                include: path.join(__dirname, 'src')
            },
            {
                // as ExtractTextPlugin will prevent HMR working, we only use it on production, not development
                // see https://github.com/webpack/extract-text-webpack-plugin/issues/30#issuecomment-125757853
                test:   /\.css$/,
                loader: isProd?ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader?sourceMap=inline'):styles
            }
        ]
    },
    postcss: function (webpack) {
        return [
            require("postcss-import")({ addDependencyTo: webpack }),
            require("postcss-url")(),
            require("postcss-cssnext")(),
            // and if you want to compress,
            // just use css-loader option that already use cssnano under the hood
            require("postcss-browser-reporter")(),
            require("postcss-reporter")(),
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx','.css']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true })
    ]
};