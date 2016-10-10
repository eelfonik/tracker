var webpack = require('webpack');
var path = require('path');
//this one is for using css modules, which will output a specified css file in output destination
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
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
                test:   /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader?sourceMap=inline')
            }
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
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('style.css', { allChunks: true })
    ]
};